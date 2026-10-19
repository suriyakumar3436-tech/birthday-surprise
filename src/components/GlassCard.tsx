import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface GlassCardProps {
  children: ReactNode
  className?: string
  /** Stronger neon border + glow */
  glow?: boolean
  /** Darker, more opaque variant */
  dark?: boolean
}

/** Compact translucent burgundy card with a soft pink neon glow. */
export default function GlassCard({ children, className = '', glow = true, dark = false }: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -16, scale: 0.98 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className={[
        'relative w-full max-w-sm rounded-3xl p-6 sm:p-8 text-center backdrop-blur-xl',
        dark ? 'bg-[#1c0612]/85' : 'bg-[#4a0f2c]/45',
        glow ? 'border border-neon/50 shadow-glow' : 'border border-white/10',
        className,
      ].join(' ')}
    >
      {children}
    </motion.div>
  )
}
