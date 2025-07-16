import { Quiz } from "../game-store";

export const ArtQuiz: Quiz = {
  id: 'art',
  title: 'Art & Culture',
  description: 'Test your knowledge of art history and cultural masterpieces',
  category: 'Art',
  questions: [
    { id: 1, question: 'Who painted "The Starry Night"?', options: ['Pablo Picasso', 'Vincent van Gogh', 'Claude Monet', 'Leonardo da Vinci'], correctAnswer: 1, timeLimit: 20 },
    { id: 2, question: 'Which art movement is Salvador Dalí associated with?', options: ['Impressionism', 'Cubism', 'Surrealism', 'Pop Art'], correctAnswer: 2, timeLimit: 20 },
    { id: 3, question: 'Who sculpted "David"?', options: ['Donatello', 'Michelangelo', 'Leonardo da Vinci', 'Raphael'], correctAnswer: 1, timeLimit: 20 },
    { id: 4, question: 'Which museum houses the "Mona Lisa"?', options: ['The Metropolitan Museum of Art', 'The Louvre', 'The British Museum', 'The Prado Museum'], correctAnswer: 1, timeLimit: 20 },
    { id: 5, question: 'Who painted "The Persistence of Memory" with melting clocks?', options: ['Pablo Picasso', 'Salvador Dalí', 'Frida Kahlo', 'Andy Warhol'], correctAnswer: 1, timeLimit: 20 },
    { id: 6, question: 'Which artist is known for cutting off part of his ear?', options: ['Claude Monet', 'Vincent van Gogh', 'Pablo Picasso', 'Salvador Dalí'], correctAnswer: 1, timeLimit: 20 },
    { id: 7, question: 'Which art movement did Claude Monet belong to?', options: ['Impressionism', 'Expressionism', 'Cubism', 'Surrealism'], correctAnswer: 0, timeLimit: 20 },
    { id: 8, question: 'Who painted the ceiling of the Sistine Chapel?', options: ['Leonardo da Vinci', 'Raphael', 'Michelangelo', 'Donatello'], correctAnswer: 2, timeLimit: 20 },
    { id: 9, question: 'Which artist is known for Campbell\'s Soup Cans?', options: ['Roy Lichtenstein', 'Andy Warhol', 'Jackson Pollock', 'Mark Rothko'], correctAnswer: 1, timeLimit: 20 },
    { id: 10, question: 'What nationality was Frida Kahlo?', options: ['Spanish', 'Mexican', 'Brazilian', 'Colombian'], correctAnswer: 1, timeLimit: 20 }
  ]
};