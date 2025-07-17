// Game utilities

import { PREMADE_QUIZZES } from "./game-store";
import { ADDITIONAL_QUIZZES } from "./quiz-utils";
import { ENHANCED_QUIZZES } from "./enhanced-quizzes";

// Get all available quizzes
export function getAllQuizzes() {
  return [...PREMADE_QUIZZES, ...ADDITIONAL_QUIZZES, ...ENHANCED_QUIZZES];
}

// Check if game has reached time limit
export function hasGameReachedTimeLimit(game: any): boolean {
  if (!game.endTime) return false;
  return new Date() > new Date(game.endTime);
}

// Format remaining time
export function formatRemainingTime(endTime: Date | undefined): string {
  if (!endTime) return "∞";
  
  const now = new Date();
  const end = new Date(endTime);
  const diffMs = end.getTime() - now.getTime();
  
  if (diffMs <= 0) return "0:00";
  
  const diffMinutes = Math.floor(diffMs / 60000);
  const diffSeconds = Math.floor((diffMs % 60000) / 1000);
  
  return `${diffMinutes}:${diffSeconds.toString().padStart(2, '0')}`;
}

// Get quiz by ID from all available quizzes
export function getQuizById(quizId: string) {
  const allQuizzes = getAllQuizzes();
  return allQuizzes.find(quiz => quiz.id === quizId);
}