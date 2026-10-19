import { useEffect, useState } from 'react'
import { animate, motion } from 'framer-motion'
import GlassCard from './GlassCard'
import NeonButton from './NeonButton'
import HeartBurst from './HeartBurst'
import { HeartCharacter } from './Illustrations'
import { birthdayConfig } from '../data/birthdayConfig'

interface ScoreCardProps {
  correct: number
  total: number
  onNext: () => void
}

export default function ScoreCard({ correct, total, onNext }: ScoreCardProps) {
  const { score } = birthdayConfig
  const percent = total === 0 ? 0 : Math.round((correct / total) * 100)
  const [shown, setShown] = useState(0)

  useEffect(() => {
    const controls = animate(0, percent, {
      duration: 1.2,
      ease: 'easeOut',
      onUpdate: (v) => setShown(Math.round(v)),
    })
    return () => controls.stop()
  }, [percent])

  const message = (score.messages.find((m) => percent >= m.min) ?? score.messages[score.messages.length - 1]).text

  return (
    <>
      <HeartBurst count={30} />
      <GlassCard className="bg-[#7a1946]/40">
        <h2 className="font-script text-4xl sm:text-5xl text-rose drop-shadow-[0_0_14px_rgba(255,79,163,0.7)]">
          {score.heading}
        </h2>

        <motion.div
          className="mx-auto mt-3 w-fit animate-bob"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', delay: 0.2 }}
        >
          <HeartCharacter mood={percent >= 60 ? 'cheer' : 'happy'} size={100} />
        </motion.div>

        <p className="mt-3 text-5xl font-semibold text-white drop-shadow-[0_0_16px_rgba(255,79,163,0.9)]">
          {shown}% 💗
        </p>
        <p className="mt-1 text-xs text-rose/60">
          {correct} of {total} correct
        </p>
        <p className="mt-3 text-sm text-rose/90">{message}</p>

        <div className="mt-6">
          <NeonButton onClick={onNext}>{score.buttonLabel}</NeonButton>
        </div>
      </GlassCard>
    </>
  )
}
