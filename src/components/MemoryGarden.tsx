import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Heart, Sparkles } from 'lucide-react'
import GlassCard from './GlassCard'
import NeonButton from './NeonButton'
import { birthdayConfig } from '../data/birthdayConfig'

interface MemoryGardenProps {
  onNext: () => void
}

export default function MemoryGarden({ onNext }: MemoryGardenProps) {
  const { memories, memoriesHeading } = birthdayConfig
  const [index, setIndex] = useState(0)
  const last = index === memories.length - 1
  const memory = memories[index]

  const go = useCallback(
    (d: number) => {
      setIndex((curr) => {
        const next = curr + d
        if (next < 0 || next >= memories.length) return curr
        return next
      })
    },
    [memories.length],
  )

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') go(-1)
      else if (e.key === 'ArrowRight') go(1)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [go])

  return (
    <GlassCard className="max-w-md w-full">
      {/* Decorative corner elements */}
      <span className="absolute -top-3 -left-2 text-xl animate-bob select-none pointer-events-none">
        💗
      </span>
      <span
        className="absolute -top-2 -right-2 text-lg animate-bob select-none pointer-events-none"
        style={{ animationDelay: '0.8s' }}
      >
        💕
      </span>
      <span
        className="absolute -bottom-3 left-6 text-base animate-bob select-none pointer-events-none"
        style={{ animationDelay: '1.4s' }}
      >
        💖
      </span>
      <span
        className="absolute -bottom-2 -right-2 text-base animate-bob select-none pointer-events-none"
        style={{ animationDelay: '1.1s' }}
      >
        ✨
      </span>

      {/* Heading */}
      <h2 className="font-script text-4xl sm:text-5xl text-rose drop-shadow-[0_0_14px_rgba(255,79,163,0.7)]">
        {memoriesHeading}
      </h2>

      {/* Subtle romantic badge */}
      <div className="mt-1 flex items-center justify-center gap-1.5 text-xs text-rose/70 font-medium tracking-widest uppercase">
        <Sparkles size={11} className="text-neon/70" />
        <span>Sweetest Keepsakes</span>
        <Sparkles size={11} className="text-neon/70" />
      </div>

      {/* Memory Display Area */}
      <div className="relative mt-5 flex min-h-[170px] sm:min-h-[180px] items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 22, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.98 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full rounded-2xl bg-white/[0.08] px-5 py-6 sm:px-6 sm:py-7 text-center ring-1 ring-white/15 backdrop-blur-md shadow-[0_8px_24px_rgba(0,0,0,0.35),inset_0_1px_1px_rgba(255,255,255,0.15)] overflow-hidden"
          >
            {/* Subtle background decorations */}
            <span
              className="pointer-events-none absolute -top-1 -left-1 text-2xl text-rose/15 select-none"
              aria-hidden="true"
            >
              ✨
            </span>
            <span
              className="pointer-events-none absolute -bottom-2 -right-1 text-2xl text-rose/15 select-none font-serif"
              aria-hidden="true"
            >
              ♡
            </span>

            {/* Pill badge */}
            <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-neon/15 px-3 py-0.5 text-[11px] font-medium tracking-wider text-rose border border-neon/30 shadow-[0_0_10px_rgba(255,79,163,0.2)]">
              <Heart size={10} className="text-neon fill-neon/40 animate-pulse" />
              <span>
                Memory {index + 1} of {memories.length}
              </span>
            </div>

            {/* Emoji icon */}
            <div className="mb-3 text-3xl sm:text-4xl filter drop-shadow-[0_0_10px_rgba(255,79,163,0.5)] select-none">
              {memory.emoji}
            </div>

            {/* Romantic typography */}
            <p className="font-sans text-base sm:text-lg leading-relaxed text-[#fff5f9] font-normal tracking-wide drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">
              {memory.text}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Progress Dots */}
      <div className="mt-5 flex items-center justify-center gap-2" aria-label="Memory progress">
        {memories.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Go to memory ${i + 1}`}
            className={`h-2 rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-neon ${
              i === index
                ? 'w-6 bg-gradient-to-r from-neon to-rose shadow-glow ring-1 ring-white/50'
                : 'w-2 bg-white/25 hover:bg-white/40'
            }`}
          />
        ))}
      </div>

      {/* Navigation Controls */}
      <div className="mt-5 flex items-center justify-between gap-3">
        <button
          onClick={() => go(-1)}
          disabled={index === 0}
          aria-label="Previous memory"
          className="grid h-10 w-10 sm:h-11 sm:w-11 place-items-center rounded-full bg-white/10 text-rose ring-1 ring-white/10 transition hover:bg-white/20 hover:scale-105 active:scale-95 disabled:opacity-30 disabled:hover:scale-100 disabled:pointer-events-none"
        >
          <ChevronLeft size={20} />
        </button>

        {last ? (
          <NeonButton onClick={onNext}>Continue 💗</NeonButton>
        ) : (
          <span className="text-xs font-medium text-rose/75 tracking-wider">
            {index + 1} / {memories.length}
          </span>
        )}

        <button
          onClick={() => go(1)}
          disabled={last}
          aria-label="Next memory"
          className="grid h-10 w-10 sm:h-11 sm:w-11 place-items-center rounded-full bg-white/10 text-rose ring-1 ring-white/10 transition hover:bg-white/20 hover:scale-105 active:scale-95 disabled:opacity-30 disabled:hover:scale-100 disabled:pointer-events-none"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </GlassCard>
  )
}
