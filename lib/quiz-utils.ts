// Quiz utilities and icons

// Quiz icons for categories
export const QUIZ_ICONS: Record<string, string> = {
  'Geography': '🌍',
  'Nature': '🌿',
  'Entertainment': '🎬',
  'Food': '🍕',
  'Science': '🔬',
  'History': '📚',
  'Sports': '⚽',
  'Technology': '💻',
  'Music': '🎵',
  'Art': '🎨'
};

// Get icon for a category
export function getCategoryIcon(category: string): string {
  return QUIZ_ICONS[category] || '❓';
}

// Additional quizzes to add - keeping empty as requested
export const ADDITIONAL_QUIZZES = [];