import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { InstagramIcon, LinkedinIcon, GitHubIcon } from '../components/SocialIcons';
import { ArrowUpRight, Clock, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';

// Spam Protection Utilities (Preserved)
const SPAM_PROTECTION = {
  MAX_ATTEMPTS: 3,
  TIME_WINDOW: 60 * 60 * 1000,
  COOLDOWN_PERIOD: 5 * 60 * 1000,
  MIN_MESSAGE_LENGTH: 1,
  STORAGE_KEY: 'email_submissions',
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
    (timestamp) => now - timestamp < SPAM_PROTECTION.TIME_WINDOW
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
        reason: `Too many submissions. Please wait ${remainingTime} minute(s).`,
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
    (timestamp) => Date.now() - timestamp < SPAM_PROTECTION.TIME_WINDOW
  );
  saveSubmissionHistory(recentHistory);
};

// Enhanced Notification Toast
const Notification = ({ type, message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const isSuccess = type === 'success';
  const isWarning = type === 'warning';

  return (
    <motion.div
      initial={{ opacity: 0, y: -50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -50, scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className={`fixed top-8 left-1/2 -translate-x-1/2 z-[9999] px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 font-mono text-sm max-w-md w-[90%] border ${
        isSuccess
          ? 'bg-[#0a0f0d] text-[#ccff00] border-[#ccff00]/40'
          : isWarning
          ? 'bg-[#151009] text-amber-300 border-amber-400/40'
          : 'bg-[#180a0a] text-red-300 border-red-500/40'
      }`}
    >
      {isSuccess ? (
        <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-[#ccff00]" />
      ) : (
        <AlertCircle className="w-5 h-5 flex-shrink-0" />
      )}
      <span className="flex-1 font-sans font-medium text-white">{message}</span>
      <button
        onClick={onClose}
        className="p-1 rounded-full hover:bg-white/10 text-gray-400 hover:text-white"
      >
        ✕
      </button>
    </motion.div>
  );
};

// GitHub Contribution Visual
const GitHubContributionChart = ({ username, isDarkMode }) => {
  return (
    <div className="rounded-2xl p-4 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 overflow-hidden">
      <div className="flex items-center justify-between mb-3 font-mono text-xs text-gray-500 dark:text-gray-400">
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#ccff00]" />
          GITHUB COMMIT HEATMAP
        </span>
        <span>@{username}</span>
      </div>
      <div className="overflow-x-auto pb-1">
        <img
          src={`https://ghchart.rshah.org/${isDarkMode ? 'ccff00' : '0a0a0a'}/${username}`}
          alt="GitHub Activity"
          className="w-full min-w-[600px] h-auto invert dark:invert-0 opacity-90 hover:opacity-100 transition-opacity"
          loading="lazy"
        />
      </div>
      <div className="mt-2 text-right">
        <a
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-[11px] text-[#ccff00] hover:underline"
        >
          View Full GitHub Repositories →
        </a>
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

  const GITHUB_USERNAME = process.env.REACT_APP_GITHUB_USERNAME || 'rczrgz';

  useEffect(() => {
    const checkDark = () => setIsDarkMode(document.documentElement.classList.contains('dark'));
    checkDark();
    const observer = new MutationObserver(checkDark);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      timeZone: 'Asia/Manila',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      timeZone: 'Asia/Manila',
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
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

    if (formData.message.trim().length < SPAM_PROTECTION.MIN_MESSAGE_LENGTH) {
      showNotification('warning', 'Please provide a message before sending.');
      return;
    }

    const check = canSubmit();
    if (!check.allowed) {
      showNotification('error', check.reason);
      return;
    }

    setIsSending(true);

    const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID;
    const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      // Graceful fallback simulation
      setTimeout(() => {
        recordSubmission();
        setIsSending(false);
        showNotification(
          'success',
          'Message registered! (Email credentials not configured in preview environment).'
        );
        setFormData({ name: '', email: '', message: '' });
      }, 900);
      return;
    }

    try {
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
      showNotification('success', 'Transmission received. I will reach back to you shortly.');
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      setIsSending(false);
      console.error('EmailJS Error:', err);
      showNotification('error', 'Transmission failed. Please connect directly via email or LinkedIn.');
    }
  };

  return (
    <section
      id="contact"
      className="py-24 md:py-36 bg-white dark:bg-[#07080c] text-gray-950 dark:text-white transition-colors duration-500 relative overflow-hidden"
    >
      <AnimatePresence>
        {notification && (
          <Notification
            type={notification.type}
            message={notification.message}
            onClose={() => setNotification(null)}
          />
        )}
      </AnimatePresence>

      <div className="container mx-auto px-6 sm:px-8 lg:px-10 max-w-7xl xl:max-w-screen-2xl relative z-10">
        {/* Eyebrow */}
        <div className="flex items-center gap-3 font-mono text-xs text-[#ccff00] tracking-[0.25em] uppercase mb-6">
          <span className="w-2 h-2 rounded-full bg-[#ccff00] shadow-[0_0_8px_#ccff00]" />
          <span>[ 05 // TRANSMISSION &amp; DISCOVERY ]</span>
          <span className="text-gray-400">/</span>
          <span className="text-gray-400">GET IN TOUCH</span>
        </div>

        {/* Monumental Headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20 md:mb-28"
        >
          <h2 className="text-6xl sm:text-7xl md:text-8xl lg:text-[9.5vw] font-black font-display uppercase tracking-tighter leading-[0.80] select-none">
            LET'S MAKE
            <br />
            SOMETHING
            <br />
            <span className="text-stroke dark:text-stroke text-black/85 dark:text-white/25 hover:text-black dark:hover:text-white transition-all duration-500 inline-block mt-1">
              /&nbsp;WORTH REMEMBERING.
            </span>
          </h2>
        </motion.div>

        {/* 2-Column Contact Suite */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Direct Inquiries & Telemetry */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <span className="font-mono text-xs text-gray-500 dark:text-gray-400 uppercase tracking-widest block">
                [ DIRECT CHANNELS ]
              </span>

              {/* Direct Email Card */}
              <a
                href="mailto:eric.zaragoza27@gmail.com"
                className="group block p-8 rounded-3xl bg-black/5 dark:bg-white/[0.04] border border-black/15 dark:border-white/10 hover:border-[#ccff00] transition-all duration-500 shadow-xl"
                data-cursor-text="EMAIL"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="font-mono text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold">
                    PRIMARY INBOX
                  </span>
                  <ArrowUpRight className="w-5 h-5 text-gray-400 group-hover:text-[#ccff00] group-hover:scale-125 transition-all" />
                </div>
                <span className="font-display font-black text-xl sm:text-2xl md:text-3xl text-black dark:text-white group-hover:text-[#ccff00] transition-colors break-all">
                  eric.zaragoza27@gmail.com
                </span>
              </a>
            </div>

            {/* Social Links Bar */}
            <div>
              <span className="font-mono text-xs text-gray-500 dark:text-gray-400 uppercase tracking-widest block mb-4">
                [ EXTERNAL NETWORKS ]
              </span>
              <div className="grid grid-cols-3 gap-3">
                <a
                  href="https://www.linkedin.com/in/eric-zaragoza-7408a6252/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-5 rounded-2xl bg-black/5 dark:bg-white/[0.04] border border-black/15 dark:border-white/10 flex flex-col items-center justify-center gap-3 hover:border-[#ccff00] hover:text-[#ccff00] hover:scale-105 transition-all text-gray-700 dark:text-gray-300 shadow"
                  data-cursor-text="LINKEDIN"
                >
                  <LinkedinIcon className="w-6 h-6" />
                  <span className="font-mono text-xs uppercase font-bold">LinkedIn</span>
                </a>

                <a
                  href="https://github.com/rczrgz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-5 rounded-2xl bg-black/5 dark:bg-white/[0.04] border border-black/15 dark:border-white/10 flex flex-col items-center justify-center gap-3 hover:border-[#ccff00] hover:text-[#ccff00] hover:scale-105 transition-all text-gray-700 dark:text-gray-300 shadow"
                  data-cursor-text="GITHUB"
                >
                  <GitHubIcon className="w-6 h-6" />
                  <span className="font-mono text-xs uppercase font-bold">GitHub</span>
                </a>

                <a
                  href="https://www.instagram.com/rc.zrgz/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-5 rounded-2xl bg-black/5 dark:bg-white/[0.04] border border-black/15 dark:border-white/10 flex flex-col items-center justify-center gap-3 hover:border-[#ccff00] hover:text-[#ccff00] hover:scale-105 transition-all text-gray-700 dark:text-gray-300 shadow"
                  data-cursor-text="INSTA"
                >
                  <InstagramIcon className="w-6 h-6" />
                  <span className="font-mono text-xs uppercase font-bold">Instagram</span>
                </a>
              </div>
            </div>

            {/* Live Manila Time Widget */}
            <div className="p-6 rounded-2xl bg-black/5 dark:bg-white/[0.04] border border-black/15 dark:border-white/10 flex items-center justify-between shadow">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-gray-500 dark:text-gray-400 uppercase mb-1">
                  <Clock className="w-3.5 h-3.5 text-[#ccff00]" />
                  <span>MANILA, PHILIPPINES (HQ)</span>
                </div>
                <div className="font-display font-black text-3xl text-black dark:text-white">
                  {formatTime(currentTime)}
                </div>
                <div className="text-xs font-mono text-gray-400">
                  {formatDate(currentTime)}
                </div>
              </div>
              <div className="text-right">
                <span className="inline-block px-3 py-1 rounded-full font-mono text-[10px] bg-[#ccff00]/10 text-[#ccff00] border border-[#ccff00]/30 font-black uppercase">
                  UTC +08:00
                </span>
              </div>
            </div>

            {/* GitHub Heatmap */}
            <GitHubContributionChart username={GITHUB_USERNAME} isDarkMode={isDarkMode} />
          </div>

          {/* Right Column: Editorial Contact Form */}
          <div className="lg:col-span-7 p-8 sm:p-14 rounded-3xl bg-white dark:bg-[#0c0d14] border border-black/15 dark:border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
            <div className="flex items-center justify-between pb-6 mb-8 border-b border-black/10 dark:border-white/10">
              <div>
                <span className="font-mono text-xs text-[#ccff00] uppercase tracking-widest block mb-1">
                  [ INITIATE DIALOGUE ]
                </span>
                <h3 className="font-display font-extrabold text-2xl sm:text-3xl uppercase tracking-tight text-black dark:text-white">
                  PROJECT INQUIRY
                </h3>
              </div>
              <span className="w-3 h-3 rounded-full bg-[#ccff00] animate-pulse" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block font-mono text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2"
                >
                  [ 01 // IDENTITY / NAME ] *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  disabled={isSending}
                  placeholder="Juan Tamad"
                  className="w-full px-5 py-4 rounded-xl bg-black/5 dark:bg-white/5 border border-black/15 dark:border-white/10 text-black dark:text-white font-sans text-sm focus:border-[#ccff00] focus:ring-1 focus:ring-[#ccff00] outline-none transition-colors disabled:opacity-50"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block font-mono text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2"
                >
                  [ 02 // DIRECT EMAIL ] *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={isSending}
                  placeholder="JuanTamad@domain.com"
                  className="w-full px-5 py-4 rounded-xl bg-black/5 dark:bg-white/5 border border-black/15 dark:border-white/10 text-black dark:text-white font-sans text-sm focus:border-[#ccff00] focus:ring-1 focus:ring-[#ccff00] outline-none transition-colors disabled:opacity-50"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block font-mono text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2"
                >
                  [ 03 // SPECIFICATIONS / MESSAGE ] *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  required
                  disabled={isSending}
                  placeholder="Describe your vision, scope, technical parameters, or timeline..."
                  className="w-full px-5 py-4 rounded-xl bg-black/5 dark:bg-white/5 border border-black/15 dark:border-white/10 text-black dark:text-white font-sans text-sm focus:border-[#ccff00] focus:ring-1 focus:ring-[#ccff00] outline-none transition-colors disabled:opacity-50 resize-none"
                />
              </div>

              {/* Large Magnetic CTA as Requested */}
              <motion.button
                type="submit"
                disabled={isSending}
                whileHover={{ scale: isSending ? 1 : 1.02 }}
                whileTap={{ scale: isSending ? 1 : 0.98 }}
                className="w-full py-5 px-8 rounded-full bg-black dark:bg-[#ccff00] text-white dark:text-black font-display font-extrabold text-base tracking-wider uppercase flex items-center justify-center gap-3 hover:bg-[#ccff00] hover:text-black transition-all duration-300 shadow-2xl disabled:opacity-50"
                data-cursor-text="TRANSMIT"
              >
                {isSending ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    <span>TRANSMITTING MESSAGE...</span>
                  </>
                ) : (
                  <>
                    <span>START A PROJECT</span>
                    <ArrowUpRight className="w-5 h-5" />
                  </>
                )}
              </motion.button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
