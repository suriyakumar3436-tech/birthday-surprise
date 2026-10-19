# Romantic Birthday Surprise 💗

React + Vite + TypeScript + Tailwind + Framer Motion.

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # typecheck + production build in dist/
```

Open the site with `?skip` (e.g. `http://localhost:5173/?skip`) to jump past the countdown while testing.

## Personalise it

- `src/data/birthdayConfig.ts` — name, countdown date, birthday message, memories, the question and "No" replies, score messages, letter text, optional music.
- `src/data/quizQuestions.ts` — questions, four options each, index of the correct answer, optional praise / encouragement lines.

Music: copy a file into `public/audio/` and set `music: '/audio/yourfile.mp3'` in the config. A speaker button then appears (browsers need a tap to start audio).

## Flow

Countdown → Birthday wishes → Memory Garden → Love question → Congratulations → Quiz (question → feedback, ×5) → Score → Love letter → final message → Start again.

The score is computed from the actual answers. Animations respect `prefers-reduced-motion`.
