import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

// Spam Protection Utilities
const SPAM_PROTECTION = {
  MAX_ATTEMPTS: 3,
  TIME_WINDOW: 60 * 60 * 1000,
  COOLDOWN_PERIOD: 5 * 60 * 1000,
  MIN_MESSAGE_LENGTH: 1, // Changed from 10 to 1
  STORAGE_KEY: 'email_submissions'
};

const getSubmissionHistory = () => {
  try {
    const history = localStorage.getItem(SPAM_PROTECTION.STORAGE_KEY);
    return history ? JSON.parse(history) : [];
  } catch {
    return [];
  }
};

const saveSubmissionHistory = (history) => {
  try {
    localStorage.setItem(SPAM_PROTECTION.STORAGE_KEY, JSON.stringify(history));
  } catch (error) {
    console.error('Failed to save submission history:', error);
  }
};

const canSubmit = () => {
  const now = Date.now();
  const history = getSubmissionHistory();
  
  const recentHistory = history.filter(
    timestamp => now - timestamp < SPAM_PROTECTION.TIME_WINDOW
  );
  
  if (recentHistory.length >= SPAM_PROTECTION.MAX_ATTEMPTS) {
    const oldestRecent = Math.min(...recentHistory);
    const timeSinceOldest = now - oldestRecent;
    
    if (timeSinceOldest < SPAM_PROTECTION.COOLDOWN_PERIOD) {
      const remainingTime = Math.ceil(
        (SPAM_PROTECTION.COOLDOWN_PERIOD - timeSinceOldest) / 1000 / 60
      );
      return {
        allowed: false,
        reason: `Too many submissions. Please wait ${remainingTime} minute(s).`
      };
    }
    
    saveSubmissionHistory([]);
    return { allowed: true };
  }
  
  return { allowed: true };
};

const recordSubmission = () => {
  const history = getSubmissionHistory();
  history.push(Date.now());
  
  const recentHistory = history.filter(
    timestamp => Date.now() - timestamp < SPAM_PROTECTION.TIME_WINDOW
  );
  
  saveSubmissionHistory(recentHistory);
};

// Enhanced Notification Component
const Notification = ({ type, message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const styles = {
    success: {
      bg: 'bg-green-500',
      icon: '✓',
      iconBg: 'bg-green-600'
    },
    error: {
      bg: 'bg-red-500',
      icon: '✕',
      iconBg: 'bg-red-600'
    },
    warning: {
      bg: 'bg-yellow-500',
      icon: '⚠',
      iconBg: 'bg-yellow-600'
    }
  };

  const style = styles[type] || styles.success;

  return (
    <motion.div
      initial={{ opacity: 0, y: -100, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -100, scale: 0.8 }}
      transition={{ 
        type: "spring",
        stiffness: 300,
        damping: 25
      }}
      className={`fixed top-6 left-1/2 transform -translate-x-1/2 ${style.bg} text-white px-6 py-4 rounded-xl shadow-2xl z-[9999] flex items-center gap-4 max-w-md min-w-[320px]`}
      style={{ zIndex: 9999 }}
    >
      <div className={`${style.iconBg} rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0`}>
        <span className="text-2xl font-bold">{style.icon}</span>
      </div>
      <span className="flex-1 font-medium text-base">{message}</span>
      <button 
        onClick={onClose}
        className="text-white hover:text-gray-200 font-bold text-2xl w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors flex-shrink-0"
        aria-label="Close notification"
      >
        ×
      </button>
    </motion.div>
  );
};

// Custom GitHub Contribution Chart Component
const GitHubContributionChart = ({ apiUrl, githubToken, username, isDarkMode }) => {
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
        
        const headers = {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        };
        
        if (githubToken) {
          headers['Authorization'] = `Bearer ${githubToken}`;
        }
        
        let data;
        
        if (apiUrl.includes('graphql')) {
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
            body: JSON.stringify({ query, variables: { username } }),
          });
          
          if (!response.ok) {
            throw new Error(`GitHub API returned status ${response.status}`);
          }
          
          const result = await response.json();
          
          if (result.errors) {
            throw new Error(result.errors[0].message);
          }
          
          data = result;
        } else {
          const response = await fetch(apiUrl, {
            method: 'GET',
            headers,
          });
          
          if (!response.ok) {
            throw new Error(`API returned status ${response.status}`);
          }
          
          const contentType = response.headers.get('content-type');
          if (!contentType || !contentType.includes('application/json')) {
            throw new Error(`API returned non-JSON response`);
          }
          
          data = await response.json();
        }
        
        processContributionData(data);
        
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchContributions();
  }, [apiUrl, githubToken, username]);

  const processContributionData = (data) => {
    let contributionArray = [];
    let total = 0;

    if (Array.isArray(data)) {
      contributionArray = data;
      total = data.reduce((sum, item) => sum + (item.count || item.contributionCount || 0), 0);
    } else if (data.contributions && Array.isArray(data.contributions)) {
      contributionArray = data.contributions;
      total = data.total || contributionArray.reduce((sum, item) => sum + (item.count || item.contributionCount || 0), 0);
    } else if (data.weeks && Array.isArray(data.weeks)) {
      contributionArray = data.weeks.flatMap(week => 
        week.contributionDays || week.days || []
      );
      total = data.totalContributions || contributionArray.reduce((sum, item) => sum + (item.count || item.contributionCount || 0), 0);
    } else if (data.data && data.data.user && data.data.user.contributionsCollection) {
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
    if (count === -1) return 'bg-transparent';
    
    if (isDarkMode) {
      if (count === 0) return 'bg-gray-800 border border-gray-700';
      if (count < 3) return 'bg-green-900';
      if (count < 6) return 'bg-green-700';
      if (count < 9) return 'bg-green-600';
      return 'bg-green-500';
    } else {
      if (count === 0) return 'bg-gray-200 border border-gray-300';
      if (count < 3) return 'bg-green-200';
      if (count < 6) return 'bg-green-400';
      if (count < 9) return 'bg-green-500';
      return 'bg-green-600';
    }
  };

  const renderContributionGrid = () => {
    const today = new Date();
    today.setHours(23, 59, 59, 999);
    
    const oneYearAgo = new Date(today);
    oneYearAgo.setDate(today.getDate() - 364);
    oneYearAgo.setHours(0, 0, 0, 0);
    
    const startDate = new Date(oneYearAgo);
    const dayOfWeek = startDate.getDay();
    startDate.setDate(startDate.getDate() - dayOfWeek);
    startDate.setHours(0, 0, 0, 0);
    
    const endDate = new Date(today);
    const daysUntilSaturday = 6 - today.getDay();
    endDate.setDate(today.getDate() + daysUntilSaturday);
    endDate.setHours(23, 59, 59, 999);
    
    const daysDiff = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
    const weeksNeeded = Math.ceil(daysDiff / 7);
    
    const grid = [];
    let currentDate = new Date(startDate);

    for (let week = 0; week < weeksNeeded; week++) {
      const weekData = [];
      for (let day = 0; day < 7; day++) {
        const dateStr = currentDate.toISOString().split('T')[0];
        const checkDate = new Date(currentDate);
        checkDate.setHours(12, 0, 0, 0);
        
        const todayNoon = new Date(today);
        todayNoon.setHours(12, 0, 0, 0);
        
        if (checkDate < oneYearAgo || checkDate > todayNoon) {
          weekData.push({ count: -1, date: dateStr });
        } else {
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
      <div className={`overflow-x-auto pb-2 p-4 rounded-lg ${isDarkMode ? 'bg-[#0d1117]' : 'bg-gray-100'}`}>
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
      <div className={`flex items-center justify-center p-8 rounded-lg ${isDarkMode ? 'bg-[#0d1117]' : 'bg-gray-100'}`}>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`p-4 rounded-lg border ${isDarkMode ? 'bg-red-900/20 border-red-500/30' : 'bg-red-100 border-red-300'}`}>
        <p className={`text-sm font-semibold mb-2 ${isDarkMode ? 'text-red-400' : 'text-red-700'}`}>⚠️ API Error</p>
        <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Using fallback chart...</p>
        <div className={`mt-4 overflow-x-auto pb-2 p-4 rounded-lg ${isDarkMode ? 'bg-[#0d1117]' : 'bg-gray-100'}`}>
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
    <div className={`p-3 rounded-lg border ${isDarkMode ? 'bg-[#0d1117] border-gray-700' : 'bg-gray-50 border-gray-300'}`}>
      {totalContributions > 0 && (
        <div className={`mb-3 text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          {totalContributions} contributions in the last year
        </div>
      )}
      
      <div className={`overflow-x-auto pb-3 ${isDarkMode ? 'scrollbar-custom' : 'scrollbar-custom-light'}`}>
        <div className="flex mb-1 min-w-max">
          {getMonths().map((month, i) => (
            <div 
              key={i} 
              className={`text-[10px] ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
              style={{ width: '43px' }}
            >
              {month.name}
            </div>
          ))}
        </div>

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

      <div className={`flex items-center justify-between mt-3 text-[10px] ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
        <span className={isDarkMode ? 'text-gray-500' : 'text-gray-500'}>Learn how we count contributions</span>
        <div className="flex items-center gap-2">
          <span>Less</span>
          <div className="flex gap-1">
            {isDarkMode ? (
              <>
                <div className="w-[8px] h-[8px] rounded-[1px] bg-gray-800 border border-gray-700"></div>
                <div className="w-[8px] h-[8px] rounded-[1px] bg-green-900"></div>
                <div className="w-[8px] h-[8px] rounded-[1px] bg-green-700"></div>
                <div className="w-[8px] h-[8px] rounded-[1px] bg-green-600"></div>
                <div className="w-[8px] h-[8px] rounded-[1px] bg-green-500"></div>
              </>
            ) : (
              <>
                <div className="w-[8px] h-[8px] rounded-[1px] bg-gray-200 border border-gray-300"></div>
                <div className="w-[8px] h-[8px] rounded-[1px] bg-green-200"></div>
                <div className="w-[8px] h-[8px] rounded-[1px] bg-green-400"></div>
                <div className="w-[8px] h-[8px] rounded-[1px] bg-green-500"></div>
                <div className="w-[8px] h-[8px] rounded-[1px] bg-green-600"></div>
              </>
            )}
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

  const [notification, setNotification] = useState(null);
  const [isSending, setIsSending] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isDarkMode, setIsDarkMode] = useState(false);

  const GITHUB_API_URL = process.env.REACT_APP_GITHUB_API_URL || '';
  const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN || '';
  const GITHUB_USERNAME = process.env.REACT_APP_GITHUB_USERNAME || 'rczrgz';

  useEffect(() => {
    const checkDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    };
    
    checkDarkMode();
    
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });
    
    return () => observer.disconnect();
  }, []);

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

  const showNotification = (type, message) => {
    setNotification({ type, message });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('Form submitted!'); // Debug log

    // Validation
    if (formData.message.length < SPAM_PROTECTION.MIN_MESSAGE_LENGTH) {
      console.log('Validation failed - message too short'); // Debug log
      showNotification('warning', `Message must be at least ${SPAM_PROTECTION.MIN_MESSAGE_LENGTH} characters long.`);
      return;
    }

    // Spam Protection Check
    const submitCheck = canSubmit();
    if (!submitCheck.allowed) {
      console.log('Spam check failed'); // Debug log
      showNotification('error', submitCheck.reason);
      return;
    }

    setIsSending(true);
    console.log('Sending started...'); // Debug log

    // Check if EmailJS is configured
    const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID;
    const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

    console.log('EmailJS Config:', { 
      hasServiceId: !!serviceId, 
      hasTemplateId: !!templateId, 
      hasPublicKey: !!publicKey 
    }); // Debug log

    if (!serviceId || !templateId || !publicKey) {
      // Test mode - simulate success
      console.log('Running in TEST MODE - EmailJS not configured');
      setTimeout(() => {
        recordSubmission();
        setIsSending(false);
        console.log('Showing success notification'); // Debug log
        showNotification('success', '✅ Message sent successfully! (Test Mode)');
        setFormData({ name: '', email: '', message: '' });
      }, 1000);
      return;
    }

    // Real EmailJS submission
    try {
      console.log('Attempting real EmailJS send...'); // Debug log
      await emailjs.send(
        serviceId,
        templateId,
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
        },
        publicKey
      );
      
      recordSubmission();
      setIsSending(false);
      console.log('Email sent successfully!'); // Debug log
      showNotification('success', '🎉 Yay! Your message reached me. I’ll reply shortly!');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setIsSending(false);
      console.error('EmailJS Error:', error); // Debug log
      showNotification('error', '❌ Failed to send message. Please try again or contact me directly.');
    }
  };

  return (
    <section id="contact" className="py-20 bg-gray-50 dark:bg-gray-900">
      <style>{scrollbarHideStyle}</style>
      
      {/* Notification Portal - Ensure it's above everything */}
      <AnimatePresence mode="wait">
        {notification && (
          <Notification
            key="notification"
            type={notification.type}
            message={notification.message}
            onClose={() => setNotification(null)}
          />
        )}
      </AnimatePresence>

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

            <form className="space-y-6" onSubmit={handleSubmit}>
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
                type="submit"
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
            </form>
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
              className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 h-[307px]"
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
                isDarkMode={isDarkMode}
              />
              <div className="mt-2 text-center">
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