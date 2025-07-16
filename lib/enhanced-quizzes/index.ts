import { ArtQuiz } from "./art-quiz";
import { SpaceQuiz } from "./space-quiz";
import { WorldFlagsQuiz } from "./world-flags";
import { Quiz } from "../game-store";

// Export all enhanced quizzes
export const ENHANCED_QUIZZES: Quiz[] = [
  ArtQuiz,
  SpaceQuiz,
  WorldFlagsQuiz,
  // Add more quizzes here
];