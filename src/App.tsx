import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, MotionConfig } from 'framer-motion'
import { Volume2, VolumeX } from 'lucide-react'
import AnimatedBackground from './components/AnimatedBackground'
import CountdownCard from './components/CountdownCard'
import BirthdayGreeting from './components/BirthdayGreeting'
import MemoryGarden from './components/MemoryGarden'
import LoveQuestion from './components/LoveQuestion'
import CongratulationsCard from './components/CongratulationsCard'
import QuizCard from './components/QuizCard'
import QuizFeedback from './components/QuizFeedback'
import ScoreCard from './components/ScoreCard'
import LoveLetter from './components/LoveLetter'
import { birthdayConfig } from './data/birthdayConfig'
import { quizQuestions } from './data/quizQuestions'

type Screen =
  | 'countdown'
  | 'birthday'
  | 'memories'
  | 'question'
  | 'congrats'
  | 'quiz'
  | 'feedback'
  | 'score'
  | 'letter'

const DEFAULT_PRAISE = 'You know us so well 💗'
const DEFAULT_ENCOURAGEMENT = 'That is okay, every memory is a chance to learn more about us 💕'

function initialScreen(): Screen {
  if (typeof window !== 'undefined' && new URLSearchParams(window.location.search).has('skip')) return 'birthday'
  return 'countdown'
}

export default function App() {
  const [screen, setScreen] = useState<Screen>(initialScreen)
  const [qIndex, setQIndex] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [lastCorrect, setLastCorrect] = useState(false)
  const [musicOn, setMusicOn] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const total = quizQuestions.length
  const correctCount = useMemo(
    () =>
      answers.reduce((n, a, i) => {
        const q = quizQuestions[i]
        if (!q) return n
        const isCorrect =
          a === q.correct || (Boolean(q.correctAnswer) && q.options[a] === q.correctAnswer)
        return n + (isCorrect ? 1 : 0)
      }, 0),
    [answers],
  )

  const goBirthday = useCallback(() => setScreen('birthday'), [])

  const submitAnswer = (selected: number) => {
    const q = quizQuestions[qIndex]
    const isCorrect =
      Boolean(q) &&
      (selected === q.correct || (Boolean(q.correctAnswer) && q.options[selected] === q.correctAnswer))
    setAnswers((prev) => [...prev, selected])
    setLastCorrect(isCorrect)
    setScreen('feedback')
  }

  const afterFeedback = () => {
    if (qIndex + 1 >= total) {
      setScreen('score')
    } else {
      setQIndex((i) => i + 1)
      setScreen('quiz')
    }
  }

  const startQuiz = () => {
    setQIndex(0)
    setAnswers([])
    setScreen('quiz')
  }

  const restart = () => {
    setQIndex(0)
    setAnswers([])
    setLastCorrect(false)
    setScreen(new URLSearchParams(window.location.search).has('skip') ? 'birthday' : 'countdown')
  }

  // optional background music (starts only after the user taps the speaker button)
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    if (musicOn) audio.play().catch(() => setMusicOn(false))
    else audio.pause()
  }, [musicOn])

  const currentQ = quizQuestions[qIndex]
  const feedbackMessage = lastCorrect
    ? currentQ?.praise ?? DEFAULT_PRAISE
    : currentQ?.encouragement ?? DEFAULT_ENCOURAGEMENT

  return (
    <MotionConfig reducedMotion="user">
      <AnimatedBackground />

      {birthdayConfig.music && (
        <>
          <audio ref={audioRef} src={birthdayConfig.music} loop preload="none" />
          <button
            onClick={() => setMusicOn((v) => !v)}
            aria-label={musicOn ? 'Mute music' : 'Play music'}
            className="fixed right-4 top-4 z-40 grid h-10 w-10 place-items-center rounded-full border border-neon/40 bg-black/30 text-rose backdrop-blur transition hover:bg-black/50"
          >
            {musicOn ? <Volume2 size={18} /> : <VolumeX size={18} />}
          </button>
        </>
      )}

      <main className="relative z-10 flex min-h-[100dvh] items-center justify-center px-4 py-10">
        <AnimatePresence mode="wait">
          {screen === 'countdown' && <CountdownCard key="countdown" onComplete={goBirthday} />}
          {screen === 'birthday' && <BirthdayGreeting key="birthday" onNext={() => setScreen('memories')} />}
          {screen === 'memories' && <MemoryGarden key="memories" onNext={() => setScreen('question')} />}
          {screen === 'question' && <LoveQuestion key="question" onYes={() => setScreen('congrats')} />}
          {screen === 'congrats' && <CongratulationsCard key="congrats" onQuiz={startQuiz} />}
          {screen === 'quiz' && currentQ && (
            <QuizCard
              key={`quiz-${qIndex}`}
              question={currentQ}
              index={qIndex}
              total={total}
              onSubmit={submitAnswer}
            />
          )}
          {screen === 'feedback' && (
            <QuizFeedback
              key={`fb-${qIndex}`}
              correct={lastCorrect}
              message={feedbackMessage}
              isLast={qIndex + 1 >= total}
              onContinue={afterFeedback}
            />
          )}
          {screen === 'score' && (
            <ScoreCard key="score" correct={correctCount} total={total} onNext={() => setScreen('letter')} />
          )}
          {screen === 'letter' && <LoveLetter key="letter" onRestart={restart} />}
        </AnimatePresence>
      </main>
    </MotionConfig>
  )
}
