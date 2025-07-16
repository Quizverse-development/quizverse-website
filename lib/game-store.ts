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

// Pre-made quizzes
export const PREMADE_QUIZZES: Quiz[] = [
  {
    id: 'flags',
    title: 'World Flags',
    description: 'Test your knowledge of country flags',
    category: 'Geography',
    questions: [
      {
        id: 1,
        question: 'Which country has this flag? 🇺🇸',
        options: ['Canada', 'United States', 'Mexico', 'Brazil'],
        correctAnswer: 1,
        timeLimit: 20
      },
      {
        id: 2,
        question: 'Which country has this flag? 🇫🇷',
        options: ['Italy', 'Spain', 'France', 'Germany'],
        correctAnswer: 2,
        timeLimit: 20
      },
      {
        id: 3,
        question: 'Which country has this flag? 🇯🇵',
        options: ['China', 'Japan', 'South Korea', 'Thailand'],
        correctAnswer: 1,
        timeLimit: 20
      },
      {
        id: 4,
        question: 'Which country has this flag? 🇬🇧',
        options: ['Ireland', 'Scotland', 'United Kingdom', 'Wales'],
        correctAnswer: 2,
        timeLimit: 20
      },
      {
        id: 5,
        question: 'Which country has this flag? 🇨🇦',
        options: ['Canada', 'United States', 'Australia', 'New Zealand'],
        correctAnswer: 0,
        timeLimit: 20
      }
    ]
  },
  {
    id: 'geography',
    title: 'World Geography',
    description: 'Test your knowledge of world geography',
    category: 'Geography',
    questions: [
      {
        id: 1,
        question: 'What is the capital of Australia?',
        options: ['Sydney', 'Melbourne', 'Canberra', 'Perth'],
        correctAnswer: 2,
        timeLimit: 20
      },
      {
        id: 2,
        question: 'Which is the longest river in the world?',
        options: ['Amazon', 'Nile', 'Mississippi', 'Yangtze'],
        correctAnswer: 1,
        timeLimit: 20
      },
      {
        id: 3,
        question: 'What is the smallest country in the world?',
        options: ['Monaco', 'Vatican City', 'San Marino', 'Liechtenstein'],
        correctAnswer: 1,
        timeLimit: 20
      },
      {
        id: 4,
        question: 'Which mountain range contains Mount Everest?',
        options: ['Andes', 'Rocky Mountains', 'Alps', 'Himalayas'],
        correctAnswer: 3,
        timeLimit: 20
      },
      {
        id: 5,
        question: 'What is the largest desert in the world?',
        options: ['Sahara', 'Gobi', 'Antarctica', 'Arabian'],
        correctAnswer: 2,
        timeLimit: 20
      }
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

export function createGame(hostId: string, quizId: string): Game {
  const game: Game = {
    id: Math.random().toString(36).substring(2),
    hostId,
    quizId,
    code: generateGameCode(),
    status: 'lobby',
    players: [],
    currentQuestion: 0,
    createdAt: new Date()
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
  games.set(gameId, game)
  return true
}

export function submitAnswer(gameId: string, playerId: string, questionId: number, answer: string, timeMs: number): boolean {
  const game = games.get(gameId)
  if (!game) return false
  
  const player = game.players.find(p => p.id === playerId)
  if (!player) return false

  const quiz = PREMADE_QUIZZES.find(q => q.id === game.quizId)
  if (!quiz) return false

  const question = quiz.questions.find(q => q.id === questionId)
  if (!question) return false

  const correct = question.options[question.correctAnswer] === answer
  if (correct) {
    // Score based on speed (max 1000 points, min 100 points)
    const speedBonus = Math.max(100, 1000 - (timeMs / question.timeLimit) * 900)
    player.score += Math.round(speedBonus)
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