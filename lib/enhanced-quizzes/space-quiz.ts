import { Quiz } from "../game-store";

export const SpaceQuiz: Quiz = {
  id: 'space',
  title: 'Space Exploration',
  description: 'Test your knowledge of astronomy and space exploration',
  category: 'Science',
  questions: [
    { id: 1, question: 'Which was the first country to land a person on the moon?', options: ['Russia', 'United States', 'China', 'United Kingdom'], correctAnswer: 1, timeLimit: 20 },
    { id: 2, question: 'What is the largest planet in our solar system?', options: ['Earth', 'Mars', 'Jupiter', 'Saturn'], correctAnswer: 2, timeLimit: 15 },
    { id: 3, question: 'What is the name of the galaxy containing our solar system?', options: ['Andromeda', 'Milky Way', 'Whirlpool', 'Sombrero'], correctAnswer: 1, timeLimit: 20 },
    { id: 4, question: 'Who was the first person to walk on the moon?', options: ['Buzz Aldrin', 'Neil Armstrong', 'Yuri Gagarin', 'John Glenn'], correctAnswer: 1, timeLimit: 15 },
    { id: 5, question: 'What is the closest star to Earth?', options: ['Proxima Centauri', 'Alpha Centauri', 'The Sun', 'Sirius'], correctAnswer: 2, timeLimit: 15 },
    { id: 6, question: 'Which planet is known as the "Red Planet"?', options: ['Venus', 'Mars', 'Jupiter', 'Mercury'], correctAnswer: 1, timeLimit: 15 },
    { id: 7, question: 'What is the name of SpaceX\'s first crewed spacecraft?', options: ['Dragon', 'Crew Dragon', 'Falcon', 'Starship'], correctAnswer: 1, timeLimit: 20 },
    { id: 8, question: 'What is the largest moon in our solar system?', options: ['Europa', 'Titan', 'Ganymede', 'Luna'], correctAnswer: 2, timeLimit: 20 },
    { id: 9, question: 'Which space telescope was launched in 1990 and named after an astronomer?', options: ['James Webb', 'Hubble', 'Kepler', 'Spitzer'], correctAnswer: 1, timeLimit: 20 },
    { id: 10, question: 'What is the name of NASA\'s Mars rover that landed in 2021?', options: ['Curiosity', 'Opportunity', 'Perseverance', 'Spirit'], correctAnswer: 2, timeLimit: 20 }
  ]
};