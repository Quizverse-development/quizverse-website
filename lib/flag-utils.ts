/**
 * Map of country names to their flag emojis
 */
export const countryFlags: Record<string, string> = {
  "United States": "🇺🇸",
  "France": "🇫🇷",
  "Japan": "🇯🇵",
  "United Kingdom": "🇬🇧",
  "Canada": "🇨🇦",
  "Germany": "🇩🇪",
  "Italy": "🇮🇹",
  "Spain": "🇪🇸",
  "Australia": "🇦🇺",
  "Brazil": "🇧🇷",
  "Switzerland": "🇨🇭",
  "Bangladesh": "🇧🇩",
  "Sweden": "🇸🇪",
  "Netherlands": "🇳🇱",
  "Denmark": "🇩🇰",
  "Norway": "🇳🇴",
  "Finland": "🇫🇮",
  "Iceland": "🇮🇸",
  "Russia": "🇷🇺",
  "China": "🇨🇳",
  "India": "🇮🇳",
  "Mexico": "🇲🇽",
  "South Korea": "🇰🇷",
  "Ireland": "🇮🇪",
  "Scotland": "🏴󠁧󠁢󠁳󠁣󠁴󠁿",
  "Wales": "🏴󠁧󠁢󠁷󠁬󠁳󠁿",
  "New Zealand": "🇳🇿",
  "Austria": "🇦🇹",
  "Belgium": "🇧🇪",
  "Hungary": "🇭🇺",
  "Portugal": "🇵🇹",
  "Colombia": "🇨🇴",
  "Venezuela": "🇻🇪",
  "Fiji": "🇫🇯",
  "Samoa": "🇼🇸",
  "Argentina": "🇦🇷",
  "Uruguay": "🇺🇾",
  "Paraguay": "🇵🇾",
  "Greece": "🇬🇷",
  "Turkey": "🇹🇷",
  "Thailand": "🇹🇭",
  "South Africa": "🇿🇦",
  "Egypt": "🇪🇬",
  "Nigeria": "🇳🇬",
  "Kenya": "🇰🇪",
  "Poland": "🇵🇱",
  "Ukraine": "🇺🇦",
  "Vietnam": "🇻🇳",
  "Singapore": "🇸🇬",
  "Malaysia": "🇲🇾",
  "Indonesia": "🇮🇩"
};

/**
 * Get flag emoji for a country name
 */
export function getFlagEmoji(countryName: string): string {
  return countryFlags[countryName] || "🏳️";
}