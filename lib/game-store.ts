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
      { id: 1, question: 'Which country has this flag? 🇺🇸', options: ['Canada', 'United States', 'Mexico', 'Brazil'], correctAnswer: 1, timeLimit: 20 },
      { id: 2, question: 'Which country has this flag? 🇫🇷', options: ['Italy', 'Spain', 'France', 'Germany'], correctAnswer: 2, timeLimit: 20 },
      { id: 3, question: 'Which country has this flag? 🇯🇵', options: ['China', 'Japan', 'South Korea', 'Thailand'], correctAnswer: 1, timeLimit: 20 },
      { id: 4, question: 'Which country has this flag? 🇬🇧', options: ['Ireland', 'Scotland', 'United Kingdom', 'Wales'], correctAnswer: 2, timeLimit: 20 },
      { id: 5, question: 'Which country has this flag? 🇨🇦', options: ['Canada', 'United States', 'Australia', 'New Zealand'], correctAnswer: 0, timeLimit: 20 },
      { id: 6, question: 'Which country has this flag? 🇩🇪', options: ['Austria', 'Germany', 'Belgium', 'Netherlands'], correctAnswer: 1, timeLimit: 20 },
      { id: 7, question: 'Which country has this flag? 🇮🇹', options: ['Italy', 'Ireland', 'Mexico', 'Hungary'], correctAnswer: 0, timeLimit: 20 },
      { id: 8, question: 'Which country has this flag? 🇪🇸', options: ['Portugal', 'Spain', 'Colombia', 'Venezuela'], correctAnswer: 1, timeLimit: 20 },
      { id: 9, question: 'Which country has this flag? 🇦🇺', options: ['New Zealand', 'Australia', 'Fiji', 'Samoa'], correctAnswer: 1, timeLimit: 20 },
      { id: 10, question: 'Which country has this flag? 🇧🇷', options: ['Argentina', 'Brazil', 'Uruguay', 'Paraguay'], correctAnswer: 1, timeLimit: 20 }
    ]
  },
  {
    id: 'geography',
    title: 'World Geography',
    description: 'Test your knowledge of world geography',
    category: 'Geography',
    questions: [
      { id: 1, question: 'What is the capital of Australia?', options: ['Sydney', 'Melbourne', 'Canberra', 'Perth'], correctAnswer: 2, timeLimit: 20 },
      { id: 2, question: 'Which is the longest river in the world?', options: ['Amazon', 'Nile', 'Mississippi', 'Yangtze'], correctAnswer: 1, timeLimit: 20 },
      { id: 3, question: 'What is the smallest country in the world?', options: ['Monaco', 'Vatican City', 'San Marino', 'Liechtenstein'], correctAnswer: 1, timeLimit: 20 },
      { id: 4, question: 'Which mountain range contains Mount Everest?', options: ['Andes', 'Rocky Mountains', 'Alps', 'Himalayas'], correctAnswer: 3, timeLimit: 20 },
      { id: 5, question: 'What is the largest desert in the world?', options: ['Sahara', 'Gobi', 'Antarctica', 'Arabian'], correctAnswer: 2, timeLimit: 20 },
      { id: 6, question: 'What is the capital of Canada?', options: ['Toronto', 'Vancouver', 'Ottawa', 'Montreal'], correctAnswer: 2, timeLimit: 20 },
      { id: 7, question: 'Which ocean is the largest?', options: ['Atlantic', 'Pacific', 'Indian', 'Arctic'], correctAnswer: 1, timeLimit: 20 },
      { id: 8, question: 'What is the highest mountain in Africa?', options: ['Mount Kenya', 'Mount Kilimanjaro', 'Mount Elgon', 'Drakensberg'], correctAnswer: 1, timeLimit: 20 },
      { id: 9, question: 'Which country has the most time zones?', options: ['Russia', 'United States', 'China', 'France'], correctAnswer: 3, timeLimit: 20 },
      { id: 10, question: 'What is the deepest ocean trench?', options: ['Puerto Rico Trench', 'Mariana Trench', 'Java Trench', 'Peru-Chile Trench'], correctAnswer: 1, timeLimit: 20 }
    ]
  },
  {
    id: 'science',
    title: 'Basic Science',
    description: 'Test your knowledge of basic science facts',
    category: 'Science',
    questions: [
      { id: 1, question: 'What is the chemical symbol for water?', options: ['H2O', 'CO2', 'NaCl', 'O2'], correctAnswer: 0, timeLimit: 15 },
      { id: 2, question: 'How many bones are in the human body?', options: ['196', '206', '216', '226'], correctAnswer: 1, timeLimit: 20 },
      { id: 3, question: 'What planet is closest to the Sun?', options: ['Venus', 'Earth', 'Mercury', 'Mars'], correctAnswer: 2, timeLimit: 15 },
      { id: 4, question: 'What gas do plants absorb from the atmosphere?', options: ['Oxygen', 'Nitrogen', 'Carbon Dioxide', 'Hydrogen'], correctAnswer: 2, timeLimit: 15 },
      { id: 5, question: 'What is the speed of light?', options: ['300,000 km/s', '150,000 km/s', '450,000 km/s', '600,000 km/s'], correctAnswer: 0, timeLimit: 20 },
      { id: 6, question: 'What is the largest organ in the human body?', options: ['Brain', 'Liver', 'Skin', 'Heart'], correctAnswer: 2, timeLimit: 15 },
      { id: 7, question: 'How many chambers does a human heart have?', options: ['2', '3', '4', '5'], correctAnswer: 2, timeLimit: 15 },
      { id: 8, question: 'What is the hardest natural substance?', options: ['Gold', 'Iron', 'Diamond', 'Platinum'], correctAnswer: 2, timeLimit: 15 },
      { id: 9, question: 'What type of animal is a dolphin?', options: ['Fish', 'Mammal', 'Reptile', 'Amphibian'], correctAnswer: 1, timeLimit: 15 },
      { id: 10, question: 'How many minutes are in a full day?', options: ['1440', '1400', '1480', '1500'], correctAnswer: 0, timeLimit: 20 }
    ]
  },
  {
    id: 'history',
    title: 'World History',
    description: 'Test your knowledge of historical events',
    category: 'History',
    questions: [
      { id: 1, question: 'In which year did World War II end?', options: ['1944', '1945', '1946', '1947'], correctAnswer: 1, timeLimit: 20 },
      { id: 2, question: 'Who was the first person to walk on the moon?', options: ['Buzz Aldrin', 'Neil Armstrong', 'John Glenn', 'Alan Shepard'], correctAnswer: 1, timeLimit: 20 },
      { id: 3, question: 'Which ancient wonder was located in Alexandria?', options: ['Colossus of Rhodes', 'Lighthouse of Alexandria', 'Hanging Gardens', 'Temple of Artemis'], correctAnswer: 1, timeLimit: 25 },
      { id: 4, question: 'Who painted the Mona Lisa?', options: ['Michelangelo', 'Leonardo da Vinci', 'Raphael', 'Donatello'], correctAnswer: 1, timeLimit: 15 },
      { id: 5, question: 'In which year did the Berlin Wall fall?', options: ['1987', '1988', '1989', '1990'], correctAnswer: 2, timeLimit: 20 },
      { id: 6, question: 'Which empire was ruled by Julius Caesar?', options: ['Greek Empire', 'Roman Empire', 'Byzantine Empire', 'Ottoman Empire'], correctAnswer: 1, timeLimit: 15 },
      { id: 7, question: 'What year did the Titanic sink?', options: ['1910', '1911', '1912', '1913'], correctAnswer: 2, timeLimit: 20 },
      { id: 8, question: 'Who was the first President of the United States?', options: ['Thomas Jefferson', 'John Adams', 'George Washington', 'Benjamin Franklin'], correctAnswer: 2, timeLimit: 15 },
      { id: 9, question: 'Which country gifted the Statue of Liberty to the US?', options: ['England', 'France', 'Spain', 'Italy'], correctAnswer: 1, timeLimit: 15 },
      { id: 10, question: 'In which city was John F. Kennedy assassinated?', options: ['New York', 'Washington DC', 'Dallas', 'Los Angeles'], correctAnswer: 2, timeLimit: 20 }
    ]
  },
  {
    id: 'sports',
    title: 'Sports Trivia',
    description: 'Test your knowledge of sports and athletes',
    category: 'Sports',
    questions: [
      { id: 1, question: 'How many players are on a basketball team on the court?', options: ['4', '5', '6', '7'], correctAnswer: 1, timeLimit: 15 },
      { id: 2, question: 'In which sport would you perform a slam dunk?', options: ['Volleyball', 'Tennis', 'Basketball', 'Baseball'], correctAnswer: 2, timeLimit: 15 },
      { id: 3, question: 'How often are the Summer Olympics held?', options: ['Every 2 years', 'Every 3 years', 'Every 4 years', 'Every 5 years'], correctAnswer: 2, timeLimit: 15 },
      { id: 4, question: 'What is the maximum score possible in ten-pin bowling?', options: ['250', '280', '300', '350'], correctAnswer: 2, timeLimit: 20 },
      { id: 5, question: 'In soccer, how many players are on the field per team?', options: ['10', '11', '12', '13'], correctAnswer: 1, timeLimit: 15 },
      { id: 6, question: 'Which country has won the most FIFA World Cups?', options: ['Germany', 'Argentina', 'Brazil', 'Italy'], correctAnswer: 2, timeLimit: 20 },
      { id: 7, question: 'What sport is played at Wimbledon?', options: ['Golf', 'Tennis', 'Cricket', 'Rugby'], correctAnswer: 1, timeLimit: 15 },
      { id: 8, question: 'How many holes are played in a standard round of golf?', options: ['16', '18', '20', '22'], correctAnswer: 1, timeLimit: 15 },
      { id: 9, question: 'In American football, how many points is a touchdown worth?', options: ['5', '6', '7', '8'], correctAnswer: 1, timeLimit: 15 },
      { id: 10, question: 'Which sport uses terms like "love" and "deuce"?', options: ['Badminton', 'Tennis', 'Squash', 'Table Tennis'], correctAnswer: 1, timeLimit: 15 }
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