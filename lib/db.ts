// Simple in-memory database for development
// In production, replace with actual database (PostgreSQL, MongoDB, etc.)

export interface Quiz {
  id: string
  title: string
  description: string
  questions: Question[]
  isPublic: boolean
  createdBy: string
  createdAt: Date
  gameCode?: string
}

export interface Question {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  timeLimit: number
}

export interface GameSession {
  id: string
  quizId: string
  hostId: string
  gameCode: string
  isActive: boolean
  players: Player[]
  currentQuestion: number
  createdAt: Date
}

export interface Player {
  id: string
  name: string
  email: string
  score: number
  answers: Answer[]
}

export interface Answer {
  questionId: string
  selectedOption: number
  isCorrect: boolean
  timeSpent: number
}

// In-memory storage (replace with real database)
let quizzes: Quiz[] = []
let gameSessions: GameSession[] = []

export const db = {
  // Quiz operations
  createQuiz: (quiz: Omit<Quiz, 'id' | 'createdAt'>) => {
    const newQuiz: Quiz = {
      ...quiz,
      id: Math.random().toString(36).substring(7),
      createdAt: new Date()
    }
    quizzes.push(newQuiz)
    return newQuiz
  },

  getQuizzes: (isPublic?: boolean) => {
    return isPublic ? quizzes.filter(q => q.isPublic) : quizzes
  },

  getQuizById: (id: string) => {
    return quizzes.find(q => q.id === id)
  },

  // Game session operations
  createGameSession: (session: Omit<GameSession, 'id' | 'createdAt'>) => {
    const newSession: GameSession = {
      ...session,
      id: Math.random().toString(36).substring(7),
      createdAt: new Date()
    }
    gameSessions.push(newSession)
    return newSession
  },

  getGameSession: (gameCode: string) => {
    return gameSessions.find(s => s.gameCode === gameCode && s.isActive)
  },

  updateGameSession: (id: string, updates: Partial<GameSession>) => {
    const index = gameSessions.findIndex(s => s.id === id)
    if (index !== -1) {
      gameSessions[index] = { ...gameSessions[index], ...updates }
      return gameSessions[index]
    }
    return null
  }
}