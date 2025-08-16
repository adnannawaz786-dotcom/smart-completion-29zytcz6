// Editor constants
export const EDITOR_MODES = {
  EDIT: 'edit',
  VIEW: 'view',
  PREVIEW: 'preview'
};

export const DOCUMENT_STATUS = {
  DRAFT: 'draft',
  PUBLISHED: 'published',
  ARCHIVED: 'archived'
};

// AI Sidebar constants
export const AI_SIDEBAR_STATES = {
  COLLAPSED: 'collapsed',
  EXPANDED: 'expanded',
  HIDDEN: 'hidden'
};

export const AI_FEATURES = {
  COMPLETION: 'completion',
  SUGGESTION: 'suggestion',
  GRAMMAR_CHECK: 'grammar_check',
  SUMMARIZE: 'summarize',
  REWRITE: 'rewrite'
};

export const AI_STATUS = {
  IDLE: 'idle',
  THINKING: 'thinking',
  GENERATING: 'generating',
  COMPLETE: 'complete',
  ERROR: 'error'
};

// Document editor constants
export const EDITOR_SHORTCUTS = {
  SAVE: 'Ctrl+S',
  BOLD: 'Ctrl+B',
  ITALIC: 'Ctrl+I',
  UNDERLINE: 'Ctrl+U',
  UNDO: 'Ctrl+Z',
  REDO: 'Ctrl+Y',
  AI_SIDEBAR: 'Ctrl+/',
  FOCUS_MODE: 'Ctrl+Shift+F'
};

export const TOOLBAR_ITEMS = [
  { id: 'bold', label: 'Bold', shortcut: 'Ctrl+B' },
  { id: 'italic', label: 'Italic', shortcut: 'Ctrl+I' },
  { id: 'underline', label: 'Underline', shortcut: 'Ctrl+U' },
  { id: 'strikethrough', label: 'Strikethrough' },
  { id: 'heading1', label: 'Heading 1' },
  { id: 'heading2', label: 'Heading 2' },
  { id: 'heading3', label: 'Heading 3' },
  { id: 'bulletList', label: 'Bullet List' },
  { id: 'orderedList', label: 'Numbered List' },
  { id: 'blockquote', label: 'Quote' },
  { id: 'codeBlock', label: 'Code Block' },
  { id: 'link', label: 'Link' }
];

// Layout constants
export const SIDEBAR_WIDTH = {
  MIN: 240,
  MAX: 480,
  DEFAULT: 320
};

export const EDITOR_WIDTH = {
  MIN: 400,
  MAX: 800,
  DEFAULT: 650
};

export const LAYOUT_BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280
};

// Theme constants
export const THEME_MODES = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system'
};

export const EDITOR_THEMES = {
  DEFAULT: 'default',
  MINIMAL: 'minimal',
  FOCUS: 'focus',
  TYPEWRITER: 'typewriter'
};

// Navigation constants
export const NAVIGATION_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', path: '/dashboard' },
  { id: 'documents', label: 'Documents', path: '/documents' },
  { id: 'settings', label: 'Settings', path: '/settings' }
];

export const DOCUMENT_ACTIONS = [
  { id: 'new', label: 'New Document' },
  { id: 'import', label: 'Import' },
  { id: 'export', label: 'Export' },
  { id: 'share', label: 'Share' },
  { id: 'duplicate', label: 'Duplicate' },
  { id: 'delete', label: 'Delete' }
];

// File and export constants
export const SUPPORTED_FORMATS = {
  MARKDOWN: 'md',
  PDF: 'pdf',
  DOCX: 'docx',
  HTML: 'html',
  TXT: 'txt'
};

export const EXPORT_OPTIONS = [
  { format: 'pdf', label: 'PDF', icon: 'FileText' },
  { format: 'docx', label: 'Word Document', icon: 'FileText' },
  { format: 'md', label: 'Markdown', icon: 'Code' },
  { format: 'html', label: 'HTML', icon: 'Globe' },
  { format: 'txt', label: 'Plain Text', icon: 'Type' }
];

// Auto-save constants
export const AUTO_SAVE = {
  INTERVAL: 30000, // 30 seconds
  DEBOUNCE_DELAY: 2000, // 2 seconds
  MAX_RETRIES: 3
};

// Character and word limits
export const LIMITS = {
  DOCUMENT_TITLE: 200,
  DOCUMENT_CONTENT: 1000000, // 1M characters
  AI_PROMPT: 2000,
  SEARCH_QUERY: 100
};

// Default content
export const DEFAULT_DOCUMENT = {
  title: 'Untitled Document',
  content: '',
  status: DOCUMENT_STATUS.DRAFT,
  createdAt: null,
  updatedAt: null
};

// AI placeholder messages
export const AI_PLACEHOLDER_MESSAGES = [
  "AI features are coming soon! This will be your intelligent writing assistant.",
  "Feature pending: AI-powered suggestions and completions",
  "Soon you'll be able to get writing help, grammar suggestions, and more!",
  "AI sidebar is in development - exciting features coming your way!"
];

// Error messages
export const ERROR_MESSAGES = {
  SAVE_FAILED: 'Failed to save document. Please try again.',
  LOAD_FAILED: 'Failed to load document. Please refresh the page.',
  NETWORK_ERROR: 'Network error. Please check your connection.',
  INVALID_FORMAT: 'Invalid file format. Please try again.',
  FILE_TOO_LARGE: 'File is too large. Please choose a smaller file.',
  AI_UNAVAILABLE: 'AI features are currently unavailable.'
};

// Success messages
export const SUCCESS_MESSAGES = {
  DOCUMENT_SAVED: 'Document saved successfully',
  DOCUMENT_EXPORTED: 'Document exported successfully',
  DOCUMENT_SHARED: 'Document shared successfully',
  SETTINGS_UPDATED: 'Settings updated successfully'
};

// Animation constants
export const ANIMATIONS = {
  SIDEBAR_TRANSITION: 'transition-all duration-300 ease-in-out',
  FADE_IN: 'animate-in fade-in duration-200',
  FADE_OUT: 'animate-out fade-out duration-200',
  SLIDE_IN: 'animate-in slide-in-from-right duration-300',
  SLIDE_OUT: 'animate-out slide-out-to-right duration-300'
};

// Z-index layers
export const Z_INDEX = {
  DROPDOWN: 50,
  MODAL: 100,
  TOOLTIP: 200,
  NOTIFICATION: 300
};