// Enhanced database with persistent storage simulation

export interface Quiz {
  id: string
  title: string
  description: string
  category: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  questions: Question[]
  isPublic: boolean
  createdBy: string
  createdAt: Date
  updatedAt: Date
  tags: string[]
  estimatedTime: number
}

export interface Question {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  timeLimit: number
  explanation?: string
  points: number
}

export interface GameSession {
  id: string
  quizId: string
  hostId: string
  hostName: string
  gameCode: string
  isActive: boolean
  players: Player[]
  currentQuestion: number
  status: 'waiting' | 'active' | 'finished'
  createdAt: Date
  settings: GameSettings
}

export interface GameSettings {
  allowLateJoin: boolean
  showLeaderboard: boolean
  randomizeQuestions: boolean
  maxPlayers: number
}

export interface Player {
  id: string
  name: string
  email: string
  score: number
  answers: Answer[]
  joinedAt: Date
  isReady: boolean
}

export interface Answer {
  questionId: string
  selectedOption: number
  isCorrect: boolean
  timeSpent: number
  points: number
}

// Persistent storage simulation
let quizzes: Quiz[] = []
let gameSessions: GameSession[] = []

// Save to localStorage in browser
const saveData = () => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('quizverse_quizzes', JSON.stringify(quizzes))
    localStorage.setItem('quizverse_sessions', JSON.stringify(gameSessions))
  }
}

// Load from localStorage
const loadData = () => {
  if (typeof window !== 'undefined') {
    const savedQuizzes = localStorage.getItem('quizverse_quizzes')
    const savedSessions = localStorage.getItem('quizverse_sessions')
    
    if (savedQuizzes) {
      quizzes = JSON.parse(savedQuizzes)
    }
    if (savedSessions) {
      gameSessions = JSON.parse(savedSessions)
    }
  }
}

// Initialize data
loadData()

export const db = {
  // Quiz operations
  createQuiz: (quiz: Omit<Quiz, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newQuiz: Quiz = {
      ...quiz,
      id: Math.random().toString(36).substring(2, 10),
      createdAt: new Date(),
      updatedAt: new Date()
    }
    quizzes.push(newQuiz)
    saveData()
    return newQuiz
  },

  updateQuiz: (id: string, updates: Partial<Quiz>) => {
    const index = quizzes.findIndex(q => q.id === id)
    if (index !== -1) {
      quizzes[index] = { ...quizzes[index], ...updates, updatedAt: new Date() }
      saveData()
      return quizzes[index]
    }
    return null
  },

  deleteQuiz: (id: string) => {
    const index = quizzes.findIndex(q => q.id === id)
    if (index !== -1) {
      quizzes.splice(index, 1)
      saveData()
      return true
    }
    return false
  },

  getQuizzes: (isPublic?: boolean, createdBy?: string) => {
    let filtered = quizzes
    if (isPublic !== undefined) {
      filtered = filtered.filter(q => q.isPublic === isPublic)
    }
    if (createdBy) {
      filtered = filtered.filter(q => q.createdBy === createdBy)
    }
    return filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  },

  getQuizById: (id: string) => {
    return quizzes.find(q => q.id === id)
  },

  // Game session operations
  createGameSession: (session: Omit<GameSession, 'id' | 'createdAt'>) => {
    const newSession: GameSession = {
      ...session,
      id: Math.random().toString(36).substring(2, 10),
      createdAt: new Date()
    }
    gameSessions.push(newSession)
    saveData()
    return newSession
  },

  getGameSession: (gameCode: string) => {
    return gameSessions.find(s => s.gameCode === gameCode && s.isActive)
  },

  updateGameSession: (id: string, updates: Partial<GameSession>) => {
    const index = gameSessions.findIndex(s => s.id === id)
    if (index !== -1) {
      gameSessions[index] = { ...gameSessions[index], ...updates }
      saveData()
      return gameSessions[index]
    }
    return null
  },

  getActiveGames: (hostId?: string) => {
    let filtered = gameSessions.filter(s => s.isActive)
    if (hostId) {
      filtered = filtered.filter(s => s.hostId === hostId)
    }
    return filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  }
}

// Initialize sample data for demo
if (quizzes.length === 0) {
  db.createQuiz({
    title: "Sample Quiz",
    description: "A sample quiz to test the system",
    category: "General Knowledge",
    difficulty: "Easy",
    isPublic: true,
    createdBy: "ben.steels@outlook.com",
    tags: ["sample", "test"],
    estimatedTime: 5,
    questions: [
      {
        id: "q1",
        question: "What is 2 + 2?",
        options: ["3", "4", "5", "6"],
        correctAnswer: 1,
        timeLimit: 30,
        explanation: "Basic arithmetic: 2 + 2 = 4",
        points: 10
      }
    ]
  })
}