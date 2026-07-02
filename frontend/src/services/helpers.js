// ===== DATE HELPERS =====
export const formatDate = (date) => {
  if (!date) return 'N/A';
  const d = new Date(date);
  if (isNaN(d.getTime())) return 'N/A';
  return d.toLocaleDateString('en-KE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const formatTime = (time) => {
  if (!time) return 'N/A';
  try {
    const d = new Date(`1970-01-01T${time}`);
    if (isNaN(d.getTime())) return time;
    return d.toLocaleTimeString('en-KE', {
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return time;
  }
};

export const formatDateTime = (dateTime) => {
  if (!dateTime) return 'N/A';
  const d = new Date(dateTime);
  if (isNaN(d.getTime())) return 'N/A';
  return d.toLocaleString('en-KE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const getTimeAgo = (date) => {
  if (!date) return 'N/A';
  const now = new Date();
  const past = new Date(date);
  if (isNaN(past.getTime())) return 'N/A';
  
  const diff = now - past;
  
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);
  
  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  if (weeks < 4) return `${weeks}w ago`;
  if (months < 12) return `${months}mo ago`;
  return `${years}y ago`;
};

// ===== PRICE HELPERS =====
export const formatPrice = (amount) => {
  if (!amount && amount !== 0) return 'KES 0';
  return `KES ${Number(amount).toLocaleString('en-KE')}`;
};

export const formatPriceShort = (amount) => {
  if (!amount && amount !== 0) return 'KES 0';
  const num = Number(amount);
  if (num >= 1000000) return `KES ${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `KES ${(num / 1000).toFixed(1)}K`;
  return `KES ${num}`;
};

export const calculateTotal = (items) => {
  return items.reduce((total, item) => total + (item.price * item.quantity || 0), 0);
};

// ===== STRING HELPERS =====
export const truncateText = (text, maxLength = 100) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

export const capitalizeFirst = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const capitalizeWords = (str) => {
  if (!str) return '';
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
};

export const slugify = (str) => {
  if (!str) return '';
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

export const generateRandomId = () => {
  return Math.random().toString(36).substring(2, 10);
};

// ===== VALIDATION HELPERS =====
export const validateEmail = (email) => {
  if (!email) return false;
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePhone = (phone) => {
  if (!phone) return false;
  const cleaned = phone.replace(/\s/g, '');
  const re = /^\+?[0-9]{10,15}$/;
  return re.test(cleaned);
};

export const validatePassword = (password) => {
  if (!password) return false;
  return password.length >= 6;
};

export const validateURL = (url) => {
  if (!url) return false;
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// ===== ARRAY HELPERS =====
export const groupBy = (array, key) => {
  if (!array || !Array.isArray(array)) return {};
  return array.reduce((result, item) => {
    const groupKey = item[key];
    if (!result[groupKey]) {
      result[groupKey] = [];
    }
    result[groupKey].push(item);
    return result;
  }, {});
};

export const sortBy = (array, key, order = 'asc') => {
  if (!array || !Array.isArray(array)) return [];
  return [...array].sort((a, b) => {
    const aVal = a[key];
    const bVal = b[key];
    if (typeof aVal === 'string' && typeof bVal === 'string') {
      return order === 'asc' 
        ? aVal.localeCompare(bVal) 
        : bVal.localeCompare(aVal);
    }
    return order === 'asc' ? aVal - bVal : bVal - aVal;
  });
};

export const unique = (array) => {
  if (!array || !Array.isArray(array)) return [];
  return [...new Set(array)];
};

export const chunk = (array, size) => {
  if (!array || !Array.isArray(array)) return [];
  const chunks = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
};

// ===== STORAGE HELPERS =====
export const storage = {
  get: (key) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch {
      return null;
    }
  },
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch {
      return false;
    }
  },
  remove: (key) => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch {
      return false;
    }
  },
  clear: () => {
    try {
      localStorage.clear();
      return true;
    } catch {
      return false;
    }
  },
};

// ===== URL HELPERS =====
export const getQueryParams = (search) => {
  if (!search) return {};
  const params = new URLSearchParams(search);
  const result = {};
  for (const [key, value] of params) {
    result[key] = value;
  }
  return result;
};

export const buildQueryString = (params) => {
  if (!params || typeof params !== 'object') return '';
  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null && value !== '') {
      query.append(key, value);
    }
  }
  return query.toString();
};

// ===== RATING HELPERS =====
export const getRatingColor = (rating) => {
  if (!rating) return 'text-gray-600';
  if (rating >= 4.5) return 'text-green-600';
  if (rating >= 3.5) return 'text-yellow-600';
  if (rating >= 2.5) return 'text-orange-600';
  return 'text-red-600';
};

export const getRatingLabel = (rating) => {
  if (!rating) return 'No Rating';
  if (rating >= 4.5) return 'Excellent';
  if (rating >= 3.5) return 'Good';
  if (rating >= 2.5) return 'Average';
  if (rating >= 1.5) return 'Poor';
  return 'Very Poor';
};

export const getRatingPercentage = (rating) => {
  if (!rating) return 0;
  return Math.round((rating / 5) * 100);
};

// ===== STATUS HELPERS =====
export const getStatusColor = (status) => {
  const colors = {
    pending: 'bg-yellow-100 text-yellow-700',
    approved: 'bg-green-100 text-green-700',
    rejected: 'bg-red-100 text-red-700',
    completed: 'bg-blue-100 text-blue-700',
    cancelled: 'bg-gray-100 text-gray-700',
    accepted: 'bg-purple-100 text-purple-700',
    active: 'bg-green-100 text-green-700',
    inactive: 'bg-gray-100 text-gray-700',
    suspended: 'bg-red-100 text-red-700',
    in_progress: 'bg-blue-100 text-blue-700',
  };
  return colors[status] || 'bg-gray-100 text-gray-700';
};

export const getStatusLabel = (status) => {
  const labels = {
    pending: 'Pending',
    approved: 'Approved',
    rejected: 'Rejected',
    completed: 'Completed',
    cancelled: 'Cancelled',
    accepted: 'Accepted',
    active: 'Active',
    inactive: 'Inactive',
    suspended: 'Suspended',
    in_progress: 'In Progress',
  };
  return labels[status] || status || 'Unknown';
};

// ===== FILE HELPERS =====
export const getFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const getFileType = (filename) => {
  if (!filename) return 'unknown';
  const ext = filename.split('.').pop().toLowerCase();
  const types = {
    jpg: 'image',
    jpeg: 'image',
    png: 'image',
    gif: 'image',
    webp: 'image',
    svg: 'image',
    pdf: 'document',
    doc: 'document',
    docx: 'document',
    xls: 'document',
    xlsx: 'document',
    ppt: 'document',
    pptx: 'document',
    txt: 'text',
    mp4: 'video',
    mp3: 'audio',
  };
  return types[ext] || 'unknown';
};

// ===== NUMBER HELPERS =====
export const formatNumber = (num) => {
  if (!num && num !== 0) return '0';
  return Number(num).toLocaleString('en-KE');
};

export const formatPercent = (num) => {
  if (!num && num !== 0) return '0%';
  return Number(num).toFixed(1) + '%';
};

export const randomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// ===== OBJECT HELPERS =====
export const pick = (obj, keys) => {
  if (!obj || typeof obj !== 'object') return {};
  return keys.reduce((result, key) => {
    if (obj[key] !== undefined) {
      result[key] = obj[key];
    }
    return result;
  }, {});
};

export const omit = (obj, keys) => {
  if (!obj || typeof obj !== 'object') return {};
  const result = { ...obj };
  keys.forEach(key => delete result[key]);
  return result;
};

export const deepClone = (obj) => {
  try {
    return JSON.parse(JSON.stringify(obj));
  } catch {
    return obj;
  }
};

// ===== BROWSER HELPERS =====
export const isMobile = () => {
  return window.innerWidth <= 768;
};

export const isTablet = () => {
  return window.innerWidth > 768 && window.innerWidth <= 1024;
};

export const isDesktop = () => {
  return window.innerWidth > 1024;
};

export const copyToClipboard = (text) => {
  try {
    navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
};

export const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

// ===== EXPORT ALL =====
export default {
  formatDate,
  formatTime,
  formatDateTime,
  getTimeAgo,
  formatPrice,
  formatPriceShort,
  calculateTotal,
  truncateText,
  capitalizeFirst,
  capitalizeWords,
  slugify,
  generateRandomId,
  validateEmail,
  validatePhone,
  validatePassword,
  validateURL,
  groupBy,
  sortBy,
  unique,
  chunk,
  storage,
  getQueryParams,
  buildQueryString,
  getRatingColor,
  getRatingLabel,
  getRatingPercentage,
  getStatusColor,
  getStatusLabel,
  getFileSize,
  getFileType,
  formatNumber,
  formatPercent,
  randomNumber,
  pick,
  omit,
  deepClone,
  isMobile,
  isTablet,
  isDesktop,
  copyToClipboard,
  scrollToTop,
};