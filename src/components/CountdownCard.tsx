import { useEffect } from 'react'
import GlassCard from './GlassCard'
import { useCountdown } from '../hooks/useCountdown'
import { birthdayConfig } from '../data/birthdayConfig'

interface CountdownCardProps {
  onComplete: () => void
}

export default function CountdownCard({ onComplete }: CountdownCardProps) {
  const { formatted, done, days } = useCountdown(birthdayConfig.targetDate)

  useEffect(() => {
    if (done) onComplete()
  }, [done, onComplete])

  return (
    <GlassCard className="-mt-16">
      <h1 className="font-script text-4xl sm:text-5xl leading-tight text-rose drop-shadow-[0_0_14px_rgba(255,79,163,0.7)]">
        {birthdayConfig.countdown.heading}
      </h1>

      <div
        role="timer"
        aria-live="off"
        aria-label={`Time remaining ${formatted}`}
        className="mt-6 font-mono text-4xl sm:text-5xl font-semibold tabular-nums tracking-widest text-white drop-shadow-[0_0_12px_rgba(255,79,163,0.8)]"
      >
        {formatted}
      </div>

      {days > 0 && (
        <p className="mt-1 text-[11px] uppercase tracking-[0.25em] text-rose/60">
          {days} {days === 1 ? 'day' : 'days'} to go
        </p>
      )}

      <p className="mt-5 text-sm text-rose/80 font-light">{birthdayConfig.countdown.subtitle}</p>
    </GlassCard>
  )
}
