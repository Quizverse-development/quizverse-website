// Quiz utilities and icons

// Quiz icons for categories
export const QUIZ_ICONS: Record<string, string> = {
  'Geography': '🌍',
  'Nature': '🌿',
  'Entertainment': '🎬',
  'Food': '🍕',
  'Science': '🔬',
  'History': '📚',
  'Sports': '⚽',
  'Technology': '💻',
  'Music': '🎵',
  'Art': '🎨'
};

// Get icon for a category
export function getCategoryIcon(category: string): string {
  return QUIZ_ICONS[category] || '❓';
}

// Additional quizzes to add
export const ADDITIONAL_QUIZZES = [
  {
    id: 'music',
    title: 'Music Trivia',
    description: 'Test your knowledge of music and musicians',
    category: 'Music',
    questions: [
      { id: 1, question: 'Which band performed the song "Bohemian Rhapsody"?', options: ['The Beatles', 'Queen', 'Led Zeppelin', 'The Rolling Stones'], correctAnswer: 1, timeLimit: 20 },
      { id: 2, question: 'Who is known as the "King of Pop"?', options: ['Elvis Presley', 'Michael Jackson', 'Prince', 'Justin Timberlake'], correctAnswer: 1, timeLimit: 15 },
      { id: 3, question: 'Which instrument has 88 keys?', options: ['Guitar', 'Violin', 'Piano', 'Drums'], correctAnswer: 2, timeLimit: 15 },
      { id: 4, question: 'What was the best-selling album of all time?', options: ['Back in Black', 'Thriller', 'The Dark Side of the Moon', 'Abbey Road'], correctAnswer: 1, timeLimit: 20 },
      { id: 5, question: 'Which of these is NOT a member of The Beatles?', options: ['John Lennon', 'Paul McCartney', 'Mick Jagger', 'George Harrison'], correctAnswer: 2, timeLimit: 20 },
      { id: 6, question: 'Which music genre originated in Jamaica in the 1960s?', options: ['Hip-hop', 'Reggae', 'Jazz', 'Blues'], correctAnswer: 1, timeLimit: 15 },
      { id: 7, question: 'Who wrote the opera "The Magic Flute"?', options: ['Bach', 'Beethoven', 'Mozart', 'Tchaikovsky'], correctAnswer: 2, timeLimit: 20 },
      { id: 8, question: 'Which band released the album "Dark Side of the Moon"?', options: ['The Who', 'Pink Floyd', 'Led Zeppelin', 'The Doors'], correctAnswer: 1, timeLimit: 15 },
      { id: 9, question: 'What instrument does Yo-Yo Ma play?', options: ['Violin', 'Piano', 'Cello', 'Flute'], correctAnswer: 2, timeLimit: 15 },
      { id: 10, question: 'Which female artist released the album "25" in 2015?', options: ['Taylor Swift', 'Beyoncé', 'Adele', 'Lady Gaga'], correctAnswer: 2, timeLimit: 15 }
    ]
  },
  {
    id: 'technology',
    title: 'Tech & Computers',
    description: 'Test your knowledge of technology and computers',
    category: 'Technology',
    questions: [
      { id: 1, question: 'Who founded Microsoft?', options: ['Steve Jobs', 'Bill Gates', 'Mark Zuckerberg', 'Jeff Bezos'], correctAnswer: 1, timeLimit: 15 },
      { id: 2, question: 'What does CPU stand for?', options: ['Central Processing Unit', 'Computer Personal Unit', 'Central Processor Utility', 'Core Processing Unit'], correctAnswer: 0, timeLimit: 15 },
      { id: 3, question: 'Which company created the iPhone?', options: ['Google', 'Microsoft', 'Apple', 'Samsung'], correctAnswer: 2, timeLimit: 15 },
      { id: 4, question: 'What year was the World Wide Web invented?', options: ['1989', '1991', '1995', '2000'], correctAnswer: 0, timeLimit: 20 },
      { id: 5, question: 'What does HTML stand for?', options: ['Hyper Text Markup Language', 'High Tech Modern Language', 'Hyper Transfer Markup Language', 'Home Tool Markup Language'], correctAnswer: 0, timeLimit: 20 },
      { id: 6, question: 'Which programming language is known as the "mother of all languages"?', options: ['Java', 'C', 'Python', 'COBOL'], correctAnswer: 1, timeLimit: 20 },
      { id: 7, question: 'What is the name of the digital currency released in 2009?', options: ['Ethereum', 'Bitcoin', 'Litecoin', 'Dogecoin'], correctAnswer: 1, timeLimit: 15 },
      { id: 8, question: 'Which company owns Android?', options: ['Apple', 'Microsoft', 'Google', 'Samsung'], correctAnswer: 2, timeLimit: 15 },
      { id: 9, question: 'What does "AI" stand for?', options: ['Automated Intelligence', 'Artificial Intelligence', 'Advanced Interface', 'Algorithmic Integration'], correctAnswer: 1, timeLimit: 15 },
      { id: 10, question: 'Which social media platform was founded by Mark Zuckerberg?', options: ['Twitter', 'Instagram', 'Facebook', 'LinkedIn'], correctAnswer: 2, timeLimit: 15 }
    ]
  }
];