import { motion } from 'framer-motion'
import GlassCard from './GlassCard'
import NeonButton from './NeonButton'
import { birthdayConfig } from '../data/birthdayConfig'

interface BirthdayGreetingProps {
  onNext: () => void
}

const fade = (i: number) => ({
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { delay: 0.5 + i * 0.45, duration: 0.6 },
})

export default function BirthdayGreeting({ onNext }: BirthdayGreetingProps) {
  const { birthday } = birthdayConfig
  return (
    <GlassCard className="relative max-w-md w-full mx-auto overflow-hidden">
      {/* Gentle floating hearts and flower-like sparkles */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl" aria-hidden="true">
        <span
          className="absolute -top-1 right-6 text-xl animate-bob opacity-75 select-none"
          style={{ animationDelay: '0.2s' }}
        >
          🌸
        </span>
        <span
          className="absolute top-12 left-3 text-sm animate-pulse opacity-60 text-neon select-none"
          style={{ animationDuration: '2.5s' }}
        >
          ✨
        </span>
        <span
          className="absolute bottom-16 right-4 text-base animate-bob opacity-70 select-none"
          style={{ animationDelay: '1.2s' }}
        >
          💖
        </span>
        <span
          className="absolute -bottom-1 left-7 text-lg animate-bob opacity-75 select-none"
          style={{ animationDelay: '0.7s' }}
        >
          🌸
        </span>
        <span
          className="absolute top-1/2 -right-1 text-xs animate-pulse opacity-50 text-rose select-none"
          style={{ animationDuration: '3s' }}
        >
          ✦
        </span>
      </div>

      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="font-script text-4xl sm:text-5xl md:text-6xl leading-tight text-rose drop-shadow-[0_0_18px_rgba(255,79,163,0.85)]"
      >
        {birthday.heading}
      </motion.h1>

      <div className="mt-6 space-y-3 sm:space-y-3.5 text-center">
        {birthday.lines.map((line, idx) => {
          const isWhite = idx === 1 || idx === 3
          const isLast = idx === 4
          return (
            <motion.p
              key={idx}
              {...fade(idx)}
              className={[
                'leading-relaxed',
                isLast
                  ? 'text-rose font-medium text-base sm:text-lg pt-1 drop-shadow-[0_0_12px_rgba(255,79,163,0.6)]'
                  : isWhite
                  ? 'text-white/95 text-sm sm:text-base drop-shadow-[0_0_8px_rgba(255,105,180,0.35)]'
                  : 'text-[#ffc2d9] text-sm sm:text-base drop-shadow-[0_0_8px_rgba(255,105,180,0.35)]',
              ].join(' ')}
            >
              {line}
            </motion.p>
          )
        })}
      </div>

      <motion.div {...fade(5)} className="mt-7">
        <NeonButton onClick={onNext}>Next 💞</NeonButton>
      </motion.div>
    </GlassCard>
  )
}
