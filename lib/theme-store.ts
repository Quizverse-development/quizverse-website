// Theme store for the application

export interface Theme {
  id: string;
  name: string;
  description: string;
  bgGradient: string;
  cardGradient: string;
  buttonGradient: string;
  textPrimary: string;
  textSecondary: string;
}

// Available themes
export const THEMES: Theme[] = [
  {
    id: 'default',
    name: 'Default Blue',
    description: 'Classic blue and indigo theme',
    bgGradient: 'from-blue-50 to-indigo-50',
    cardGradient: 'from-blue-50 to-indigo-50',
    buttonGradient: 'from-blue-500 to-purple-500',
    textPrimary: 'text-black',
    textSecondary: 'text-purple-700'
  },
  {
    id: 'sunset',
    name: 'Sunset',
    description: 'Warm orange and pink theme',
    bgGradient: 'from-orange-50 to-pink-50',
    cardGradient: 'from-orange-50 to-pink-50',
    buttonGradient: 'from-orange-500 to-pink-500',
    textPrimary: 'text-black',
    textSecondary: 'text-pink-700'
  },
  {
    id: 'forest',
    name: 'Forest',
    description: 'Calming green and teal theme',
    bgGradient: 'from-green-50 to-teal-50',
    cardGradient: 'from-green-50 to-teal-50',
    buttonGradient: 'from-green-500 to-teal-500',
    textPrimary: 'text-black',
    textSecondary: 'text-teal-700'
  },
  {
    id: 'galaxy',
    name: 'Galaxy',
    description: 'Deep purple and blue theme',
    bgGradient: 'from-purple-50 to-blue-50',
    cardGradient: 'from-purple-50 to-blue-50',
    buttonGradient: 'from-purple-500 to-blue-500',
    textPrimary: 'text-black',
    textSecondary: 'text-blue-700'
  },
  {
    id: 'candy',
    name: 'Candy',
    description: 'Fun pink and blue theme',
    bgGradient: 'from-pink-50 to-blue-50',
    cardGradient: 'from-pink-50 to-blue-50',
    buttonGradient: 'from-pink-500 to-blue-500',
    textPrimary: 'text-black',
    textSecondary: 'text-blue-700'
  }
];

// Get theme by ID
export function getTheme(id: string): Theme {
  return THEMES.find(theme => theme.id === id) || THEMES[0];
}

// Browser storage key
const THEME_STORAGE_KEY = 'quizverse-theme';

// Save theme preference to local storage
export function saveThemePreference(themeId: string): void {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, themeId);
    } catch (error) {
      console.error('Error saving theme to localStorage:', error);
    }
  }
}

// Get theme preference from local storage
export function getThemePreference(): string {
  if (typeof window !== 'undefined') {
    try {
      return localStorage.getItem(THEME_STORAGE_KEY) || 'default';
    } catch (error) {
      console.error('Error accessing localStorage:', error);
      return 'default';
    }
  }
  return 'default';
}