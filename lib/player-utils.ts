// Player utilities for managing player sessions

/**
 * Saves player data to localStorage
 */
export function savePlayer(player: any) {
  try {
    localStorage.setItem('player', JSON.stringify(player));
  } catch (error) {
    console.error('Failed to save player data:', error);
  }
}

/**
 * Gets player data from localStorage
 */
export function getPlayer() {
  try {
    const savedPlayer = localStorage.getItem('player');
    if (savedPlayer) {
      return JSON.parse(savedPlayer);
    }
  } catch (error) {
    console.error('Failed to get player data:', error);
    clearPlayer();
  }
  return null;
}

/**
 * Clears player data from localStorage
 */
export function clearPlayer() {
  try {
    localStorage.removeItem('player');
  } catch (error) {
    console.error('Failed to clear player data:', error);
  }
}