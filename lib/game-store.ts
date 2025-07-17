// In-memory game store (would be database in production)
export interface Player {
  id: string
  username: string
  animal: string
  score: number
  answers: { questionId: number; answer: string; correct: boolean; timeMs: number }[]
}

export interface Game {
  id: string
  hostId: string
  quizId: string
  code: string
  status: 'lobby' | 'playing' | 'finished'
  players: Player[]
  currentQuestion: number
  createdAt: Date
  timeLimit?: number // Game time limit in minutes
  endTime?: Date // When the game will end
}

export interface Quiz {
  id: string
  title: string
  description: string
  category: string
  questions: Question[]
}

export interface Question {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  timeLimit: number
}

// Available animals (limited to 12)
export const ANIMALS = [
  '🐶', '🐱', '🐭', '🐹', '🐰', '🦊',
  '🐻', '🐼', '🐨', '🐯', '🦁', '🐸'
]

// Pre-made quizzes - keeping only World Flags quiz
export const PREMADE_QUIZZES: Quiz[] = [
  {
    id: 'flags',
    title: 'World Flags',
    description: 'Test your knowledge of country flags',
    category: 'Geography',
    questions: [
      { id: 1, question: 'Which country has a flag with red and white stripes and white stars on a blue rectangle?', options: ['Canada', 'United States', 'Mexico', 'Brazil'], correctAnswer: 1, timeLimit: 20 },
      { id: 2, question: 'Which country has a flag with vertical blue, white, and red stripes?', options: ['Italy', 'Spain', 'France', 'Germany'], correctAnswer: 2, timeLimit: 20 },
      { id: 3, question: 'Which country has a white flag with a red circle in the center?', options: ['China', 'Japan', 'South Korea', 'Thailand'], correctAnswer: 1, timeLimit: 20 },
      { id: 4, question: 'Which country has a flag with overlapping crosses of St. George, St. Andrew, and St. Patrick?', options: ['Ireland', 'Scotland', 'United Kingdom', 'Wales'], correctAnswer: 2, timeLimit: 20 },
      { id: 5, question: 'Which country has a red and white flag with a maple leaf in the center?', options: ['Canada', 'United States', 'Australia', 'New Zealand'], correctAnswer: 0, timeLimit: 20 },
      { id: 6, question: 'Which country has a flag with horizontal black, red, and gold stripes?', options: ['Austria', 'Germany', 'Belgium', 'Netherlands'], correctAnswer: 1, timeLimit: 20 },
      { id: 7, question: 'Which country has a flag with vertical green, white, and red stripes?', options: ['Italy', 'Ireland', 'Mexico', 'Hungary'], correctAnswer: 0, timeLimit: 20 },
      { id: 8, question: 'Which country has a flag with horizontal red and yellow stripes and a coat of arms?', options: ['Portugal', 'Spain', 'Colombia', 'Venezuela'], correctAnswer: 1, timeLimit: 20 },
      { id: 9, question: 'Which country has a blue flag with the Union Jack in the corner and stars?', options: ['New Zealand', 'Australia', 'Fiji', 'Samoa'], correctAnswer: 1, timeLimit: 20 },
      { id: 10, question: 'Which country has a green flag with a yellow diamond and blue circle?', options: ['Argentina', 'Brazil', 'Uruguay', 'Paraguay'], correctAnswer: 1, timeLimit: 20 },
      { id: 11, question: 'Which country has a flag with a white cross on a red background?', options: ['Denmark', 'Switzerland', 'Norway', 'Finland'], correctAnswer: 1, timeLimit: 20 },
      { id: 12, question: 'Which country has a flag with a red circle on a white background?', options: ['Bangladesh', 'Japan', 'Turkey', 'Tunisia'], correctAnswer: 0, timeLimit: 20 },
      { id: 13, question: 'Which country has a flag with a yellow cross on a blue background?', options: ['Finland', 'Sweden', 'Norway', 'Iceland'], correctAnswer: 1, timeLimit: 20 },
      { id: 14, question: 'Which country has a flag with horizontal red, white, and blue stripes?', options: ['France', 'Netherlands', 'Luxembourg', 'Russia'], correctAnswer: 1, timeLimit: 20 },
      { id: 15, question: 'Which country has a flag with a red maple leaf between two red vertical bars?', options: ['Canada', 'Peru', 'Austria', 'Lebanon'], correctAnswer: 0, timeLimit: 20 }
    ]
  }
]

// In-memory storage
const games = new Map<string, Game>()

// Profanity filter (basic)
const BANNED_WORDS = ['damn', 'hell', 'stupid', 'idiot', 'hate', 'kill', 'die', 'sex', 'porn']

export function isUsernameValid(username: string): boolean {
  if (!username || username.length < 2 || username.length > 15) return false
  const lower = username.toLowerCase()
  return !BANNED_WORDS.some(word => lower.includes(word))
}

export function generateGameCode(): string {
  return Math.random().toString(36).substring(2, 8).toUpperCase()
}

export function createGame(hostId: string, quizId: string, timeLimit?: number): Game {
  const game: Game = {
    id: Math.random().toString(36).substring(2),
    hostId,
    quizId,
    code: generateGameCode(),
    status: 'lobby',
    players: [],
    currentQuestion: 0,
    createdAt: new Date(),
    timeLimit: timeLimit || 10 // Default 10 minutes if not specified
  }
  games.set(game.id, game)
  return game
}

export function getGame(gameId: string): Game | undefined {
  return games.get(gameId)
}

export function getGameByCode(code: string): Game | undefined {
  return Array.from(games.values()).find(game => game.code === code)
}

export function joinGame(code: string, username: string, animal: string): { success: boolean; game?: Game; player?: Player; error?: string } {
  const game = getGameByCode(code)
  if (!game) return { success: false, error: 'Game not found' }
  if (game.status !== 'lobby') return { success: false, error: 'Game already started' }
  if (game.players.length >= 30) return { success: false, error: 'Game is full' }
  if (!isUsernameValid(username)) return { success: false, error: 'Username not allowed' }
  if (game.players.some(p => p.username === username)) return { success: false, error: 'Username taken' }
  if (game.players.some(p => p.animal === animal)) return { success: false, error: 'Animal taken' }

  const player: Player = {
    id: Math.random().toString(36).substring(2),
    username,
    animal,
    score: 0,
    answers: []
  }

  game.players.push(player)
  games.set(game.id, game)
  return { success: true, game, player }
}

export function startGame(gameId: string): boolean {
  const game = games.get(gameId)
  if (!game || game.status !== 'lobby') return false
  game.status = 'playing'
  game.currentQuestion = 1
  
  // Set end time based on time limit
  if (game.timeLimit) {
    const endTime = new Date()
    endTime.setMinutes(endTime.getMinutes() + game.timeLimit)
    game.endTime = endTime
  }
  
  games.set(gameId, game)
  return true
}

export function getCurrentQuestion(gameId: string): Question | null {
  const game = games.get(gameId)
  if (!game) return null
  
  // Use getAllQuizzes to find the quiz from all available sources
  const allQuizzes = getAllQuizzes()
  const quiz = allQuizzes.find(q => q.id === game.quizId)
  if (!quiz) return null
  
  return quiz.questions.find(q => q.id === game.currentQuestion) || null
}

import { getAllQuizzes, hasGameReachedTimeLimit } from "./game-utils"

export function nextQuestion(gameId: string): boolean {
  const game = games.get(gameId)
  if (!game) return false
  
  // Check if game has reached time limit
  if (hasGameReachedTimeLimit(game)) {
    game.status = 'finished'
    games.set(gameId, game)
    return false
  }
  
  // Find quiz in all available quizzes
  const allQuizzes = getAllQuizzes()
  const quiz = allQuizzes.find(q => q.id === game.quizId)
  if (!quiz) return false
  
  // Loop back to first question if we've reached the end
  if (game.currentQuestion >= quiz.questions.length) {
    game.currentQuestion = 1
  } else {
    game.currentQuestion++
  }
  
  games.set(gameId, game)
  return true
}

export function submitAnswer(gameId: string, playerId: string, questionId: number, answer: string, timeMs: number): boolean {
  const game = games.get(gameId)
  if (!game) return false
  
  const player = game.players.find(p => p.id === playerId)
  if (!player) return false

  // Use getAllQuizzes to find the quiz from all available sources
  const allQuizzes = getAllQuizzes()
  const quiz = allQuizzes.find(q => q.id === game.quizId)
  if (!quiz) return false

  const question = quiz.questions.find(q => q.id === questionId)
  if (!question) return false

  const correct = question.options[question.correctAnswer] === answer
  if (correct) {
    // Fixed points for correct answers - no time penalty
    player.score += 100
  }

  player.answers.push({ questionId, answer, correct, timeMs })
  games.set(gameId, game)
  return true
}

export function getLeaderboard(gameId: string): Player[] {
  const game = games.get(gameId)
  if (!game) return []
  return [...game.players].sort((a, b) => b.score - a.score)
}