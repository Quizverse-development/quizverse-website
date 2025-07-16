/**
 * Map of country names to their flag emojis
 */
// Country code to flag image URL mapping
export const countryFlagUrls: Record<string, string> = {
  "United States": "https://flagcdn.com/w320/us.png",
  "France": "https://flagcdn.com/w320/fr.png",
  "Japan": "https://flagcdn.com/w320/jp.png",
  "United Kingdom": "https://flagcdn.com/w320/gb.png",
  "Canada": "https://flagcdn.com/w320/ca.png",
  "Germany": "https://flagcdn.com/w320/de.png",
  "Italy": "https://flagcdn.com/w320/it.png",
  "Spain": "https://flagcdn.com/w320/es.png",
  "Australia": "https://flagcdn.com/w320/au.png",
  "Brazil": "https://flagcdn.com/w320/br.png",
  "Switzerland": "https://flagcdn.com/w320/ch.png",
  "Bangladesh": "https://flagcdn.com/w320/bd.png",
  "Sweden": "https://flagcdn.com/w320/se.png",
  "Netherlands": "https://flagcdn.com/w320/nl.png",
  "Denmark": "https://flagcdn.com/w320/dk.png",
  "Norway": "https://flagcdn.com/w320/no.png",
  "Finland": "https://flagcdn.com/w320/fi.png",
  "Iceland": "https://flagcdn.com/w320/is.png",
  "Russia": "https://flagcdn.com/w320/ru.png",
  "China": "https://flagcdn.com/w320/cn.png",
  "India": "https://flagcdn.com/w320/in.png",
  "Mexico": "https://flagcdn.com/w320/mx.png",
  "South Korea": "https://flagcdn.com/w320/kr.png",
  "Ireland": "https://flagcdn.com/w320/ie.png",
  "New Zealand": "https://flagcdn.com/w320/nz.png",
  "Austria": "https://flagcdn.com/w320/at.png",
  "Belgium": "https://flagcdn.com/w320/be.png",
  "Hungary": "https://flagcdn.com/w320/hu.png",
  "Portugal": "https://flagcdn.com/w320/pt.png",
  "Colombia": "https://flagcdn.com/w320/co.png",
  "Venezuela": "https://flagcdn.com/w320/ve.png",
  "Fiji": "https://flagcdn.com/w320/fj.png",
  "Samoa": "https://flagcdn.com/w320/ws.png",
  "Argentina": "https://flagcdn.com/w320/ar.png",
  "Uruguay": "https://flagcdn.com/w320/uy.png",
  "Paraguay": "https://flagcdn.com/w320/py.png",
  "Greece": "https://flagcdn.com/w320/gr.png",
  "Turkey": "https://flagcdn.com/w320/tr.png",
  "Thailand": "https://flagcdn.com/w320/th.png",
  "South Africa": "https://flagcdn.com/w320/za.png",
  "Egypt": "https://flagcdn.com/w320/eg.png",
  "Nigeria": "https://flagcdn.com/w320/ng.png",
  "Kenya": "https://flagcdn.com/w320/ke.png",
  "Poland": "https://flagcdn.com/w320/pl.png",
  "Ukraine": "https://flagcdn.com/w320/ua.png",
  "Vietnam": "https://flagcdn.com/w320/vn.png",
  "Singapore": "https://flagcdn.com/w320/sg.png",
  "Malaysia": "https://flagcdn.com/w320/my.png",
  "Indonesia": "https://flagcdn.com/w320/id.png"
};

// Keep emoji flags as fallback
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
 * Get flag image URL for a country name
 */
export function getFlagUrl(countryName: string): string {
  return countryFlagUrls[countryName] || "https://flagcdn.com/w320/un.png";
}

/**
 * Get flag emoji for a country name (fallback)
 */
export function getFlagEmoji(countryName: string): string {
  return countryFlags[countryName] || "🏳️";
}