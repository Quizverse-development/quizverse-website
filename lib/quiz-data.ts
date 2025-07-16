// Enhanced quiz data with more categories and questions

import { Quiz } from "./game-store";

export const ENHANCED_QUIZZES: Quiz[] = [
  {
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
  },
  {
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
  },
  {
    id: 'mythology',
    title: 'World Mythology',
    description: 'Test your knowledge of myths and legends from around the world',
    category: 'History',
    questions: [
      { id: 1, question: 'Who is the Greek god of the sea?', options: ['Zeus', 'Poseidon', 'Hades', 'Apollo'], correctAnswer: 1, timeLimit: 15 },
      { id: 2, question: 'In Norse mythology, who is the father of Thor?', options: ['Loki', 'Odin', 'Balder', 'Freyr'], correctAnswer: 1, timeLimit: 15 },
      { id: 3, question: 'Which creature in Greek mythology had the head of a bull and the body of a man?', options: ['Centaur', 'Minotaur', 'Chimera', 'Hydra'], correctAnswer: 1, timeLimit: 20 },
      { id: 4, question: 'Who opened Pandora\'s box in Greek mythology?', options: ['Athena', 'Hera', 'Pandora', 'Aphrodite'], correctAnswer: 2, timeLimit: 15 },
      { id: 5, question: 'In Egyptian mythology, who is the god of the dead?', options: ['Ra', 'Anubis', 'Osiris', 'Horus'], correctAnswer: 2, timeLimit: 20 },
      { id: 6, question: 'Which hero slew the Gorgon Medusa?', options: ['Hercules', 'Perseus', 'Theseus', 'Achilles'], correctAnswer: 1, timeLimit: 20 },
      { id: 7, question: 'In Hindu mythology, who is known as the destroyer?', options: ['Brahma', 'Vishnu', 'Shiva', 'Ganesha'], correctAnswer: 2, timeLimit: 20 },
      { id: 8, question: 'Which creature in Japanese folklore can shapeshift, often taking the form of a fox?', options: ['Oni', 'Kappa', 'Kitsune', 'Tanuki'], correctAnswer: 2, timeLimit: 20 },
      { id: 9, question: 'In Celtic mythology, what magical creatures are known for their gold?', options: ['Elves', 'Leprechauns', 'Fairies', 'Banshees'], correctAnswer: 1, timeLimit: 15 },
      { id: 10, question: 'Who is the trickster god in Norse mythology?', options: ['Thor', 'Loki', 'Odin', 'Freyr'], correctAnswer: 1, timeLimit: 15 }
    ]
  },
  {
    id: 'literature',
    title: 'World Literature',
    description: 'Test your knowledge of famous books and authors',
    category: 'Entertainment',
    questions: [
      { id: 1, question: 'Who wrote "Pride and Prejudice"?', options: ['Emily Brontë', 'Jane Austen', 'Virginia Woolf', 'Charlotte Brontë'], correctAnswer: 1, timeLimit: 20 },
      { id: 2, question: 'Which Shakespeare play features the character Hamlet?', options: ['Macbeth', 'Hamlet', 'Romeo and Juliet', 'Othello'], correctAnswer: 1, timeLimit: 15 },
      { id: 3, question: 'Who wrote "One Hundred Years of Solitude"?', options: ['Jorge Luis Borges', 'Gabriel García Márquez', 'Pablo Neruda', 'Isabel Allende'], correctAnswer: 1, timeLimit: 20 },
      { id: 4, question: 'Which novel begins with the line "Call me Ishmael"?', options: ['The Great Gatsby', 'Moby-Dick', 'The Catcher in the Rye', 'To Kill a Mockingbird'], correctAnswer: 1, timeLimit: 20 },
      { id: 5, question: 'Who wrote "War and Peace"?', options: ['Fyodor Dostoevsky', 'Leo Tolstoy', 'Anton Chekhov', 'Ivan Turgenev'], correctAnswer: 1, timeLimit: 20 },
      { id: 6, question: 'Which author created the character Sherlock Holmes?', options: ['Charles Dickens', 'Arthur Conan Doyle', 'Agatha Christie', 'Edgar Allan Poe'], correctAnswer: 1, timeLimit: 15 },
      { id: 7, question: 'Who wrote "The Divine Comedy"?', options: ['Petrarch', 'Dante Alighieri', 'Giovanni Boccaccio', 'Niccolò Machiavelli'], correctAnswer: 1, timeLimit: 20 },
      { id: 8, question: 'Which novel features the character Jay Gatsby?', options: ['The Great Gatsby', 'The Catcher in the Rye', 'To Kill a Mockingbird', 'Of Mice and Men'], correctAnswer: 0, timeLimit: 15 },
      { id: 9, question: 'Who wrote "Things Fall Apart"?', options: ['Wole Soyinka', 'Chinua Achebe', 'Ngũgĩ wa Thiong\'o', 'Ben Okri'], correctAnswer: 1, timeLimit: 20 },
      { id: 10, question: 'Which author wrote "The Lord of the Rings" trilogy?', options: ['C.S. Lewis', 'J.R.R. Tolkien', 'George R.R. Martin', 'Terry Pratchett'], correctAnswer: 1, timeLimit: 15 }
    ]
  },
  {
    id: 'capitals',
    title: 'World Capitals',
    description: 'Test your knowledge of capital cities around the world',
    category: 'Geography',
    questions: [
      { id: 1, question: 'What is the capital of Japan?', options: ['Seoul', 'Beijing', 'Tokyo', 'Bangkok'], correctAnswer: 2, timeLimit: 15 },
      { id: 2, question: 'What is the capital of Australia?', options: ['Sydney', 'Melbourne', 'Canberra', 'Perth'], correctAnswer: 2, timeLimit: 15 },
      { id: 3, question: 'What is the capital of Brazil?', options: ['Rio de Janeiro', 'São Paulo', 'Brasília', 'Salvador'], correctAnswer: 2, timeLimit: 15 },
      { id: 4, question: 'What is the capital of Canada?', options: ['Toronto', 'Vancouver', 'Ottawa', 'Montreal'], correctAnswer: 2, timeLimit: 15 },
      { id: 5, question: 'What is the capital of Egypt?', options: ['Alexandria', 'Cairo', 'Luxor', 'Giza'], correctAnswer: 1, timeLimit: 15 },
      { id: 6, question: 'What is the capital of South Africa?', options: ['Cape Town', 'Johannesburg', 'Pretoria', 'Durban'], correctAnswer: 2, timeLimit: 20 },
      { id: 7, question: 'What is the capital of Argentina?', options: ['Santiago', 'Buenos Aires', 'Lima', 'Montevideo'], correctAnswer: 1, timeLimit: 15 },
      { id: 8, question: 'What is the capital of Thailand?', options: ['Hanoi', 'Manila', 'Jakarta', 'Bangkok'], correctAnswer: 3, timeLimit: 15 },
      { id: 9, question: 'What is the capital of Turkey?', options: ['Istanbul', 'Ankara', 'Izmir', 'Antalya'], correctAnswer: 1, timeLimit: 15 },
      { id: 10, question: 'What is the capital of Sweden?', options: ['Oslo', 'Copenhagen', 'Helsinki', 'Stockholm'], correctAnswer: 3, timeLimit: 15 }
    ]
  }
];