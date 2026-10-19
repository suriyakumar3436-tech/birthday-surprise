import GlassCard from './GlassCard'
import NeonButton from './NeonButton'
import { TeddyCouple } from './Illustrations'
import { birthdayConfig } from '../data/birthdayConfig'

interface CongratulationsCardProps {
  onQuiz: () => void
}

export default function CongratulationsCard({ onQuiz }: CongratulationsCardProps) {
  const { congratulations } = birthdayConfig
  return (
    <GlassCard dark className="shadow-glow-lg">
      <h2 className="text-2xl sm:text-3xl font-semibold text-white drop-shadow-[0_0_14px_rgba(255,79,163,0.8)]">
        {congratulations.heading}
      </h2>

      <div className="mx-auto mt-5 w-fit rounded-3xl border border-neon/40 bg-black/20 p-2 shadow-glow animate-bob">
        <TeddyCouple />
      </div>

      <p className="mt-5 text-sm leading-relaxed text-rose/85">{congratulations.message}</p>

      <div className="mt-6">
        <NeonButton onClick={onQuiz}>{congratulations.buttonLabel}</NeonButton>
      </div>
    </GlassCard>
  )
}
