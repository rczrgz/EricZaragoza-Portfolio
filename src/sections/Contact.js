import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { InstagramIcon, LinkedinIcon, GitHubIcon } from '../components/SocialIcons';

// Add custom scrollbar hiding styles
const scrollbarHideStyle = `
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  
  .scrollbar-custom::-webkit-scrollbar {
    height: 8px;
  }
  
  .scrollbar-custom::-webkit-scrollbar-track {
    background: #1f2937;
    border-radius: 4px;
  }
  
  .scrollbar-custom::-webkit-scrollbar-thumb {
    background: #4b5563;
    border-radius: 4px;
  }
  
  .scrollbar-custom::-webkit-scrollbar-thumb:hover {
    background: #6b7280;
  }
  
  .scrollbar-custom-light::-webkit-scrollbar {
    height: 8px;
  }
  
  .scrollbar-custom-light::-webkit-scrollbar-track {
    background: #e5e7eb;
    border-radius: 4px;
  }
  
  .scrollbar-custom-light::-webkit-scrollbar-thumb {
    background: #9ca3af;
    border-radius: 4px;
  }
  
  .scrollbar-custom-light::-webkit-scrollbar-thumb:hover {
    background: #6b7280;
  }
`;

// Custom GitHub Contribution Chart Component
const GitHubContributionChart = ({ apiUrl, githubToken, username }) => {
  const [contributions, setContributions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalContributions, setTotalContributions] = useState(0);

  useEffect(() => {
    if (!apiUrl) {
      setLoading(false);
      return;
    }

    const fetchContributions = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log('Fetching contributions for:', username);
        
        // Prepare headers
        const headers = {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        };
        
        // Add authorization if token is provided
        if (githubToken) {
          headers['Authorization'] = `Bearer ${githubToken}`;
        }
        
        let data;
        
        // Check if it's GitHub GraphQL API
        if (apiUrl.includes('graphql')) {
          // GraphQL Query for contributions
          const query = `
            query($username: String!) {
              user(login: $username) {
                contributionsCollection {
                  contributionCalendar {
                    totalContributions
                    weeks {
                      contributionDays {
                        contributionCount
                        date
                      }
                    }
                  }
                }
              }
            }
          `;
          
          const response = await fetch(apiUrl, {
            method: 'POST',
            headers,
            body: JSON.stringify({
              query,
              variables: { username }
            }),
          });
          
          if (!response.ok) {
            throw new Error(`GitHub API returned status ${response.status}: ${response.statusText}`);
          }
          
          const result = await response.json();
          
          if (result.errors) {
            throw new Error(result.errors[0].message);
          }
          
          data = result;
        } else {
          // Regular REST API
          const response = await fetch(apiUrl, {
            method: 'GET',
            headers,
          });
          
          if (!response.ok) {
            throw new Error(`API returned status ${response.status}: ${response.statusText}`);
          }
          
          // Check if response is JSON
          const contentType = response.headers.get('content-type');
          if (!contentType || !contentType.includes('application/json')) {
            throw new Error(`API returned non-JSON response: ${contentType}`);
          }
          
          data = await response.json();
        }
        
        console.log('Successfully fetched data');
        processContributionData(data);
        
      } catch (err) {
        setError(err.message);
        console.error('Error fetching contributions:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchContributions();
  }, [apiUrl, githubToken, username]);

  const processContributionData = (data) => {
    // Handle different API response formats
    let contributionArray = [];
    let total = 0;

    // Format 1: Direct array of contributions
    if (Array.isArray(data)) {
      contributionArray = data;
      total = data.reduce((sum, item) => sum + (item.count || item.contributionCount || 0), 0);
    }
    // Format 2: Object with contributions array
    else if (data.contributions && Array.isArray(data.contributions)) {
      contributionArray = data.contributions;
      total = data.total || contributionArray.reduce((sum, item) => sum + (item.count || item.contributionCount || 0), 0);
    }
    // Format 3: GitHub API format with weeks
    else if (data.weeks && Array.isArray(data.weeks)) {
      contributionArray = data.weeks.flatMap(week => 
        week.contributionDays || week.days || []
      );
      total = data.totalContributions || contributionArray.reduce((sum, item) => sum + (item.count || item.contributionCount || 0), 0);
    }
    // Format 4: Nested data structure
    else if (data.data && data.data.user && data.data.user.contributionsCollection) {
      const collection = data.data.user.contributionsCollection;
      if (collection.contributionCalendar && collection.contributionCalendar.weeks) {
        contributionArray = collection.contributionCalendar.weeks.flatMap(week => week.contributionDays || []);
        total = collection.contributionCalendar.totalContributions || 0;
      }
    }

    setContributions(contributionArray);
    setTotalContributions(total);
  };

  const getMonths = () => {
    const months = [];
    const today = new Date();
    
    // Generate months for the last 12 months
    for (let i = 11; i >= 0; i--) {
      const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
      months.push({
        name: date.toLocaleDateString('en-US', { month: 'short' }),
        date: date
      });
    }
    return months;
  };

  const getContributionColor = (count) => {
    if (count === -1) return 'bg-transparent'; // Empty cells for padding
    if (count === 0) return 'bg-gray-800 border border-gray-700';
    if (count < 3) return 'bg-green-900';
    if (count < 6) return 'bg-green-700';
    if (count < 9) return 'bg-green-600';
    return 'bg-green-500';
  };

  const renderContributionGrid = () => {
    // Calculate the date range for the last 365 days
    const today = new Date();
    today.setHours(23, 59, 59, 999); // Set to end of day to include today
    
    const oneYearAgo = new Date(today);
    oneYearAgo.setDate(today.getDate() - 364); // 365 days including today
    oneYearAgo.setHours(0, 0, 0, 0); // Start of that day
    
    // Start from the previous Sunday to align the grid properly
    const startDate = new Date(oneYearAgo);
    const dayOfWeek = startDate.getDay();
    startDate.setDate(startDate.getDate() - dayOfWeek);
    startDate.setHours(0, 0, 0, 0);
    
    // End on the next Saturday after today
    const endDate = new Date(today);
    const daysUntilSaturday = 6 - today.getDay();
    endDate.setDate(today.getDate() + daysUntilSaturday);
    endDate.setHours(23, 59, 59, 999);
    
    // Calculate number of weeks needed
    const daysDiff = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
    const weeksNeeded = Math.ceil(daysDiff / 7);
    
    const grid = [];
    let currentDate = new Date(startDate);

    for (let week = 0; week < weeksNeeded; week++) {
      const weekData = [];
      for (let day = 0; day < 7; day++) {
        const dateStr = currentDate.toISOString().split('T')[0];
        const checkDate = new Date(currentDate);
        checkDate.setHours(12, 0, 0, 0); // Set to noon for comparison
        
        const todayNoon = new Date(today);
        todayNoon.setHours(12, 0, 0, 0);
        
        // Check if date is before the year range or in the future
        if (checkDate < oneYearAgo || checkDate > todayNoon) {
          // Add invisible/empty cell
          weekData.push({ count: -1, date: dateStr });
        } else {
          // Find contribution data for this date
          const contribution = contributions.find(c => {
            if (!c.date) return false;
            const cDateStr = c.date.split('T')[0];
            return cDateStr === dateStr;
          });
          
          const count = contribution ? (contribution.count || contribution.contributionCount || 0) : 0;
          weekData.push({ count, date: dateStr });
        }
        
        currentDate.setDate(currentDate.getDate() + 1);
      }
      grid.push(weekData);
    }

    return grid;
  };

  if (!apiUrl) {
    return (
      <div className="overflow-x-auto pb-2 bg-[#0d1117] p-4 rounded-lg">
        <img 
          src="https://ghchart.rshah.org/2ea043/rczrgz" 
          alt="GitHub Contribution Chart"
          className="w-full h-auto"
          style={{ minWidth: '100%' }}
        />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8 bg-[#0d1117] rounded-lg">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-900/20 rounded-lg border border-red-500/30">
        <p className="text-red-400 text-sm font-semibold mb-2">⚠️ API Error</p>
        <p className="text-red-300 text-xs mb-3">{error}</p>
        <details className="text-xs text-gray-400">
          <summary className="cursor-pointer hover:text-gray-300 mb-2">Troubleshooting Tips</summary>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Check your API URL in .env file</li>
            <li>Ensure API returns JSON format</li>
            <li>Check browser console for detailed logs</li>
            <li>Verify API authentication if required</li>
            <li>Check for CORS issues</li>
          </ul>
        </details>
        <p className="text-gray-400 text-xs mt-3">Using fallback chart...</p>
        <div className="mt-4 overflow-x-auto pb-2 bg-[#0d1117] p-4 rounded-lg">
          <img 
            src="https://ghchart.rshah.org/2ea043/rczrgz" 
            alt="GitHub Contribution Chart"
            className="w-full h-auto"
            style={{ minWidth: '100%' }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#0d1117] p-3 rounded-lg border border-gray-700">
      {totalContributions > 0 && (
        <div className="mb-3 text-xs text-gray-400">
          {totalContributions} contributions in the last year
        </div>
      )}
      
      <div className="overflow-x-auto scrollbar-custom pb-3">
        {/* Month Labels */}
        <div className="flex mb-1 min-w-max">
          {getMonths().map((month, i) => (
            <div 
              key={i} 
              className="text-[10px] text-gray-400"
              style={{ width: '43px' }}
            >
              {month.name}
            </div>
          ))}
        </div>

        {/* Contribution Grid - No Day Labels */}
        <div className="flex gap-[2px] min-w-max mb-2">
          {renderContributionGrid().map((week, weekIndex) => (
            <div key={weekIndex} className="flex flex-col gap-[2px]">
              {week.map((day, dayIndex) => (
                day.count === -1 ? (
                  <div key={`${weekIndex}-${dayIndex}`} className="w-[8px] h-[8px]" />
                ) : (
                  <motion.div
                    key={`${weekIndex}-${dayIndex}`}
                    className={`w-[8px] h-[8px] rounded-[1px] ${getContributionColor(day.count)} cursor-pointer`}
                    whileHover={{ scale: 1.4 }}
                    title={`${day.count} contributions on ${day.date}`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: (weekIndex * 7 + dayIndex) * 0.0005 }}
                  />
                )
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-between mt-3 text-[10px] text-gray-400">
        <span className="text-gray-500">Learn how we count contributions</span>
        <div className="flex items-center gap-2">
          <span>Less</span>
          <div className="flex gap-1">
            <div className="w-[8px] h-[8px] rounded-[1px] bg-gray-800 border border-gray-700"></div>
            <div className="w-[8px] h-[8px] rounded-[1px] bg-green-900"></div>
            <div className="w-[8px] h-[8px] rounded-[1px] bg-green-700"></div>
            <div className="w-[8px] h-[8px] rounded-[1px] bg-green-600"></div>
            <div className="w-[8px] h-[8px] rounded-[1px] bg-green-500"></div>
          </div>
          <span>More</span>
        </div>
      </div>
    </div>
  );
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [showNotif, setShowNotif] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Read from environment variables
  const GITHUB_API_URL = process.env.REACT_APP_GITHUB_API_URL || '';
  const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN || '';
  const GITHUB_USERNAME = process.env.REACT_APP_GITHUB_USERNAME || 'rczrgz';

  // Update clock every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSending(true);

    emailjs
      .send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
        },
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY
      )
      .then(() => {
        setIsSending(false);
        setShowNotif(true);
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setShowNotif(false), 3000);
      })
      .catch((error) => {
        setIsSending(false);
        alert('Failed to send message. Please try again.');
        console.error('EmailJS Error:', error);
      });
  };

  return (
    <section id="contact" className="py-20 bg-gray-50 dark:bg-gray-900">
      <style>{scrollbarHideStyle}</style>
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-4xl font-extrabold text-center mb-12 text-gray-900 dark:text-white"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.4 }}
        >
          Get in <span className="text-blue-600 dark:text-blue-400">Touch</span>
        </motion.h2>

        {/* Success Notification */}
        {showNotif && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50"
          >
            Message sent successfully! ✓
          </motion.div>
        )}

        <div className="flex flex-col lg:flex-row items-start justify-center gap-8 max-w-6xl mx-auto">
          {/* Contact Form */}
          <motion.div
            className="w-full lg:w-2/3 p-8 rounded-lg shadow-md bg-white dark:bg-gray-800 hover:shadow-xl transition-shadow duration-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">Send Me a Message</h3>
            <div className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-lg font-medium mb-2 text-gray-900 dark:text-white">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  disabled={isSending}
                  className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600
                             focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 outline-none
                             transition-all duration-200 disabled:opacity-50 text-gray-900 dark:text-white"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-lg font-medium mb-2 text-gray-900 dark:text-white">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={isSending}
                  className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600
                             focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 outline-none
                             transition-all duration-200 disabled:opacity-50 text-gray-900 dark:text-white"
                  placeholder="your.email@example.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-lg font-medium mb-2 text-gray-900 dark:text-white">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  required
                  disabled={isSending}
                  className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600
                             focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 outline-none
                             transition-all duration-200 disabled:opacity-50 resize-none text-gray-900 dark:text-white"
                  placeholder="Your message..."
                ></textarea>
              </div>
              <motion.button
                type="button"
                onClick={handleSubmit}
                disabled={isSending}
                className="w-full py-3 px-6 rounded-lg bg-blue-600 dark:bg-blue-500 text-white font-semibold text-lg
                           hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-200 shadow-md
                           disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: isSending ? 1 : 1.02 }}
                whileTap={{ scale: isSending ? 1 : 0.98 }}
                transition={{ duration: 0.2 }}
              >
                {isSending ? 'Sending...' : 'Send Message'}
              </motion.button>
            </div>
          </motion.div>

          {/* Right Side - Social & Stats */}
          <div className="w-full lg:w-1/3 flex flex-col gap-6">
            {/* Clock Widget */}
            <motion.div
              className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2 font-mono">
                  {formatTime(currentTime)}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {formatDate(currentTime)}
                </div>
              </div>
            </motion.div>

            {/* Social Media Links */}
            <motion.div
              className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              <h3 className="text-xl font-bold mb-4 text-center text-gray-900 dark:text-white">Connect with Me</h3>
              <div className="flex justify-center space-x-6">
                <motion.a
                  href="https://www.instagram.com/rc.zrgz/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-pink-600 dark:hover:text-pink-400 transition-colors duration-200"
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <InstagramIcon className="h-10 w-10" />
                </motion.a>
                <motion.a
                  href="https://www.linkedin.com/in/eric-zaragoza-7408a6252/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                  whileHover={{ scale: 1.15, rotate: -5 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <LinkedinIcon className="h-10 w-10" />
                </motion.a>
                <motion.a
                  href="https://github.com/rczrgz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <GitHubIcon className="h-10 w-10" />
                </motion.a>
              </div>
            </motion.div>

            {/* GitHub Contribution Graph */}
            <motion.div
              className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">GitHub Activity</h3>
              <GitHubContributionChart 
                apiUrl={GITHUB_API_URL} 
                githubToken={GITHUB_TOKEN}
                username={GITHUB_USERNAME} 
              />
              <div className="mt-4 text-center">
                <a 
                  href={`https://github.com/${GITHUB_USERNAME}`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 dark:text-blue-400 hover:underline transition-colors"
                >
                  View Full Profile →
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;