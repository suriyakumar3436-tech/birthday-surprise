// ✏️ Edit the questions, options and the index of the correct answer.

export interface QuizQuestion {
  question: string
  options: [string, string, string, string]
  /** Index (0-3) of the correct option */
  correct: number
  /** Exact string value of the correct answer */
  correctAnswer?: string
  /** Optional per-question praise shown on a correct answer */
  praise?: string
  /** Optional per-question gentle message shown on a wrong answer */
  encouragement?: string
}

export const quizQuestions: QuizQuestion[] = [
  {
    question: 'Where did our favorite memories begin?',
    options: ['School', 'College', 'Online', 'Somewhere unexpected'],
    correct: 0,
    correctAnswer: 'School',
    praise: 'You remember where it all began 💗',
    encouragement: 'Every memory with you is special 💕',
  },
  {
    question: 'What makes me happiest?',
    options: ['Your smile 💖', 'Your gifts', 'Watching movies', 'Travelling together'],
    correct: 0,
    correctAnswer: 'Your smile 💖',
    praise: 'Your smile lights up my entire world 💖',
    encouragement: 'Your smile is always my favorite thing 💕',
  },
  {
    question: 'Which word describes our memories best?',
    options: ['Beautiful', 'Funny', 'Ordinary', 'Unforgettable'],
    correct: 0,
    correctAnswer: 'Beautiful',
    praise: 'Every single memory with you is beautiful 💗',
    encouragement: 'Our journey together is truly beautiful 💕',
  },
  {
    question: 'What would I choose?',
    options: ['A lifetime with you', 'Money', 'Travelling alone', 'Nothing'],
    correct: 0,
    correctAnswer: 'A lifetime with you',
    praise: 'A lifetime with you, always and forever 💖',
    encouragement: 'I would always choose a lifetime with you 💕',
  },
  {
    question: 'Who owns a special place in my heart?',
    options: ['Nobody', 'My friends', 'My family', 'You 💖'],
    correct: 3,
    correctAnswer: 'You 💖',
    praise: 'Always and forever, only you 💗',
    encouragement: 'You will always have that special place in my heart 💕',
  },
]

