import { useState } from 'react'
import { motion } from 'framer-motion'
import GlassCard from './GlassCard'
import NeonButton from './NeonButton'
import { birthdayConfig } from '../data/birthdayConfig'
import type { QuizQuestion } from '../data/quizQuestions'

interface QuizCardProps {
  question: QuizQuestion
  index: number
  total: number
  onSubmit: (selected: number) => void
}

export default function QuizCard({ question, index, total, onSubmit }: QuizCardProps) {
  const [selected, setSelected] = useState<number | null>(null)

  return (
    <GlassCard className="max-w-md">
      <p className="text-[11px] uppercase tracking-[0.25em] text-rose/70">
        {birthdayConfig.quizTitle} • Question {index + 1}/{total}
      </p>

      <div className="mx-auto mt-3 h-1 w-32 overflow-hidden rounded-full bg-white/10">
        <motion.div
          className="h-full rounded-full bg-neon shadow-glow"
          initial={{ width: `${(index / total) * 100}%` }}
          animate={{ width: `${((index + 1) / total) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      <h2 className="mt-5 text-lg sm:text-xl font-medium leading-snug text-white">{question.question}</h2>

      <div role="radiogroup" aria-label={question.question} className="mt-5 flex flex-col gap-2.5">
        {question.options.map((option, i) => {
          const active = selected === i
          return (
            <motion.button
              key={option}
              role="radio"
              aria-checked={active}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelected(i)}
              className={[
                'w-full rounded-2xl px-4 py-3 text-sm text-left transition focus:outline-none focus-visible:ring-2 focus-visible:ring-rose',
                active
                  ? 'bg-neon/15 text-white border border-neon shadow-glow'
                  : 'bg-white/10 text-white/80 border border-transparent hover:bg-white/15',
              ].join(' ')}
            >
              {option}
            </motion.button>
          )
        })}
      </div>

      <div className="mt-6">
        <NeonButton disabled={selected === null} onClick={() => selected !== null && onSubmit(selected)}>
          Continue
        </NeonButton>
      </div>
    </GlassCard>
  )
}
