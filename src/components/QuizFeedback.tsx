import { motion } from 'framer-motion'
import GlassCard from './GlassCard'
import NeonButton from './NeonButton'
import { HeartCharacter, SadBear } from './Illustrations'

interface QuizFeedbackProps {
  correct: boolean
  message: string
  isLast: boolean
  onContinue: () => void
}

export default function QuizFeedback({ correct, message, isLast, onContinue }: QuizFeedbackProps) {
  return (
    <GlassCard dark>
      <motion.div
        className="mx-auto w-fit"
        initial={{ scale: 0.4, rotate: -12 }}
        animate={correct ? { scale: [0.4, 1.15, 1], rotate: [-12, 8, 0] } : { scale: 1, rotate: 0 }}
        transition={{ duration: 0.7 }}
      >
        <div className="animate-bob">
          {correct ? <HeartCharacter mood="cheer" /> : <SadBear />}
        </div>
      </motion.div>

      <h2 className="mt-4 text-2xl font-semibold text-white drop-shadow-[0_0_14px_rgba(255,79,163,0.8)]">
        {correct ? 'Correct Answer! 💗' : 'Answer Wrong! 💔'}
      </h2>
      <p className="mt-2 text-sm text-rose/85" aria-live="polite">
        {message}
      </p>

      <div className="mt-6">
        <NeonButton onClick={onContinue}>{isLast ? 'See my score 💖' : 'Continue'}</NeonButton>
      </div>
    </GlassCard>
  )
}
