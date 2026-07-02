
// ===== APP INFO =====
export const APP_NAME = 'Jirani Services';
export const APP_DESCRIPTION = 'Find trusted local workers near you in Kenya';
export const APP_VERSION = '1.0.0';

// ===== API CONFIGURATION =====
export const API_CONFIG = {
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  timeout: 30000,
  maxRetries: 3,
};

// ===== USER ROLES =====
export const ROLES = {
  ADMIN: 'admin',
  WORKER: 'worker',
  CUSTOMER: 'customer',
};

// ===== BOOKING STATUS =====
export const BOOKING_STATUS = {
  PENDING: 'pending',
  ACCEPTED: 'accepted',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
  IN_PROGRESS: 'in_progress',
};

export const BOOKING_STATUS_COLORS = {
  pending: 'bg-yellow-100 text-yellow-700',
  accepted: 'bg-blue-100 text-blue-700',
  completed: 'bg-green-100 text-green-700',
  cancelled: 'bg-gray-100 text-gray-700',
  in_progress: 'bg-purple-100 text-purple-700',
};

export const BOOKING_STATUS_LABELS = {
  pending: 'Pending',
  accepted: 'Accepted',
  completed: 'Completed',
  cancelled: 'Cancelled',
  in_progress: 'In Progress',
};

// ===== WORKER STATUS =====
export const WORKER_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  SUSPENDED: 'suspended',
};

export const WORKER_STATUS_COLORS = {
  pending: 'bg-yellow-100 text-yellow-700',
  approved: 'bg-green-100 text-green-700',
  rejected: 'bg-red-100 text-red-700',
  suspended: 'bg-gray-100 text-gray-700',
};

// ===== CATEGORIES =====
export const CATEGORIES = [
  'Electrician',
  'Plumber',
  'Mechanic',
  'Tutor',
  'Tailor',
  'Cleaner',
  'Carpenter',
  'Painter',
  'Driver',
  'IT Support',
  'Gardener',
  'Chef',
  'Nanny',
  'Security Guard',
  'Electrician',
];

export const CATEGORY_ICONS = {
  Electrician: '⚡',
  Plumber: '💧',
  Mechanic: '🔧',
  Tutor: '📚',
  Tailor: '✂️',
  Cleaner: '🧹',
  Carpenter: '🪚',
  Painter: '🎨',
  Driver: '🚗',
  'IT Support': '💻',
  Gardener: '🌿',
  Chef: '🍳',
  Nanny: '👶',
  'Security Guard': '🛡️',
};

// ===== COUNTIES IN KENYA =====
export const COUNTIES = [
  'Nairobi',
  'Mombasa',
  'Kisumu',
  'Nakuru',
  'Eldoret',
  'Thika',
  'Malindi',
  'Garissa',
  'Kisii',
  'Meru',
  'Nyeri',
  'Kitale',
  'Kericho',
  'Kakamega',
  'Bungoma',
  'Machakos',
  'Embu',
  'Isiolo',
  'Lamu',
  'Voi',
  'Naivasha',
  'Kitui',
  'Makueni',
  'Taita Taveta',
  'Kwale',
  'Kilifi',
  'Tana River',
  'Lamu',
  'Mandera',
  'Wajir',
  'Marsabit',
  'Turkana',
  'Samburu',
  'Trans Nzoia',
  'Uasin Gishu',
  'Elgeyo Marakwet',
  'Nandi',
  'Baringo',
  'Laikipia',
  'Narok',
  'Kajiado',
  'Kajiado',
  'Migori',
  'Homa Bay',
  'Siaya',
  'Busia',
  'Vihiga',
];

// ===== PAGINATION =====
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  LIMITS: [5, 10, 20, 50],
};

// ===== LOCAL STORAGE KEYS =====
export const STORAGE_KEYS = {
  TOKEN: 'token',
  ADMIN_LOGGED_IN: 'adminLoggedIn',
  REMEMBER_ME: 'rememberAdmin',
  USER: 'user',
  THEME: 'theme',
  LANGUAGE: 'language',
};

// ===== DEFAULT IMAGES =====
export const DEFAULT_IMAGES = {
  WORKER: 'https://ui-avatars.com/api/?name=Worker&size=200&background=3498db&color=fff',
  USER: 'https://ui-avatars.com/api/?name=User&size=200&background=2c3e50&color=fff',
  HERO: 'https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=600',
  NO_IMAGE: 'https://via.placeholder.com/400x300?text=No+Image',
};

// ===== PAYMENT METHODS =====
export const PAYMENT_METHODS = [
  { id: 'cash', label: 'Cash', icon: '💰' },
  { id: 'mpesa', label: 'M-Pesa', icon: '📱' },
  { id: 'bank', label: 'Bank Transfer', icon: '🏦' },
  { id: 'card', label: 'Credit Card', icon: '💳' },
];

// ===== CONTACT INFO =====
export const CONTACT = {
  PHONE: '+254 700 000000',
  PHONE_ALT: '+254 722 000000',
  EMAIL: 'info@jiraniservices.com',
  ADDRESS: 'Nairobi, Kenya',
  WORKING_HOURS: {
    MON_FRI: '8:00 AM - 6:00 PM',
    SAT: '9:00 AM - 4:00 PM',
    SUN: 'Closed',
  },
  SOCIAL: {
    FACEBOOK: 'https://facebook.com/jiraniservices',
    TWITTER: 'https://twitter.com/jiraniservices',
    INSTAGRAM: 'https://instagram.com/jiraniservices',
    LINKEDIN: 'https://linkedin.com/company/jiraniservices',
    YOUTUBE: 'https://youtube.com/jiraniservices',
  },
  WHATSAPP: 'https://wa.me/254700000000',
};

// ===== RATING =====
export const RATING = {
  MAX: 5,
  MIN: 0,
  DEFAULT: 0,
};

// ===== FILE UPLOAD =====
export const UPLOAD = {
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_TYPES: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
  ALLOWED_DOC_TYPES: ['application/pdf', 'image/jpeg', 'image/png'],
};

// ===== DATE FORMATS =====
export const DATE_FORMATS = {
  DISPLAY: 'MMM DD, YYYY',
  DISPLAY_TIME: 'MMM DD, YYYY HH:mm',
  API: 'YYYY-MM-DD',
  TIME: 'HH:mm',
};

// ===== SORT OPTIONS =====
export const SORT_OPTIONS = [
  { id: 'newest', label: 'Newest First' },
  { id: 'oldest', label: 'Oldest First' },
  { id: 'rating', label: 'Highest Rating' },
  { id: 'price_low', label: 'Price: Low to High' },
  { id: 'price_high', label: 'Price: High to Low' },
  { id: 'popular', label: 'Most Popular' },
];

// ===== FILTER OPTIONS =====
export const FILTER_OPTIONS = {
  experience: [
    { id: '1', label: '1+ years' },
    { id: '3', label: '3+ years' },
    { id: '5', label: '5+ years' },
    { id: '10', label: '10+ years' },
  ],
  rating: [
    { id: '1', label: '1+ Stars' },
    { id: '2', label: '2+ Stars' },
    { id: '3', label: '3+ Stars' },
    { id: '4', label: '4+ Stars' },
    { id: '5', label: '5 Stars' },
  ],
  price: [
    { id: '0-500', label: 'Under KES 500' },
    { id: '500-1000', label: 'KES 500 - 1,000' },
    { id: '1000-2000', label: 'KES 1,000 - 2,000' },
    { id: '2000-5000', label: 'KES 2,000 - 5,000' },
    { id: '5000+', label: 'KES 5,000+' },
  ],
};