// ✏️ Edit this single file to personalise the whole experience.

export interface Memory {
  emoji: string
  text: string
}

export const birthdayConfig = {
  /** Name shown in headings and the letter */
  name: 'Thangoo',

  /** Your name, used to sign the letter */
  fromName: 'Yours, always',

  /**
   * When the countdown ends (local time of the viewer's device).
   * Format: 'YYYY-MM-DDTHH:mm:ss'
   * Tip: open the site with `?skip` at the end of the URL to jump past the countdown while testing.
   */
  targetDate: '2026-10-20T00:00:00',

  countdown: {
    heading: 'Something special is coming...',
    subtitle: 'Hold on tight, my love. Good things are worth the wait 💗',
  },

  birthday: {
    heading: 'Happy Birthday Thangoo 💖',
    lines: [
      'Today is not just another day,',
      "it's the day my favorite person was born.",
      'Thank you for filling my life with beautiful memories,',
      'Endless smiles and unforgettable moments.',
      'Happy birthday, my Thangoo 🌸',
    ],
    message: "Today is not just another day,\n\nit's the day my favorite person was born.",
    thanks: 'Thank you for filling my life with beautiful memories,\n\nEndless smiles and unforgettable moments.',
    closing: 'Happy birthday, my Thangoo 🌸',
  },

  memoriesHeading: 'Memory Garden 💝',
  memories: [
    { emoji: '🌸', text: 'Some memories become special, because they are made with someone special.' },
    { emoji: '✨', text: 'Life feels a little more beautiful whenever your memories cross my mind.' },
    { emoji: '💫', text: "If I could relive one moment again, I'd choose every moment spent with you." },
    { emoji: '🌷', text: 'Every little moment with you became a beautiful part of my story.' },
    { emoji: '💖', text: 'Among all the memories I have, you are my favorite chapter. ♡' },
  ] as Memory[],

  question: {
    text: 'Will you marry me? 💗',
    yesLabel: 'Yes 💕',
    noLabel: 'No 🙈',
    /** Shown one after another each time "No" is pressed (cycles) */
    noReplies: [
      'Hehe, wrong button! Try again 🙈',
      'Are you sure? Think again, my love 🥺',
      'The Yes button is feeling lonely... 💕',
      'Okay okay, last chance. Pick Yes! 😘',
    ],
  },

  congratulations: {
    heading: 'Congratulations! 🎉',
    message: 'You just made my day, and I am the happiest person alive. Now, let us see how well you know us...',
    buttonLabel: 'Quiz',
  },

  quizTitle: 'Love Quiz',

  score: {
    heading: 'Your Score',
    buttonLabel: 'Letter',
    /** Message for the score ranges, checked from top to bottom (first match wins) */
    messages: [
      { min: 100, text: 'Perfect! You know us by heart 💖' },
      { min: 60, text: 'So close! Our bond is clearly strong 💗' },
      { min: 0, text: 'Do not worry, we still have a lifetime of memories to make 💕' },
    ],
  },

  letter: {
    heading: 'Dear Thangoo,',
    greeting: 'Dear Thangoo,',
    paragraphs: [
      'Today is your special day, but somehow I feel like I am the lucky one because I got to know someone as special as you.',
      'Every memory, every laugh, every little moment means more to me than words can explain.',
      'I hope this birthday brings you everything your heart wishes for.',
      'Happy birthday, my Thangoo.',
    ],
    signature: '',
    buttonLabel: 'Love You 💗',
    finalMessage: 'I love you more than words can say. Happy Birthday, my heart. 💗',
  },

  restartLabel: 'Start again',

  /** Optional background music. Drop a file into /public/audio and set its name, or leave '' for none. */
  music: '' as string, // e.g. '/audio/song.mp3'
}

export type BirthdayConfig = typeof birthdayConfig
