import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface NeonButtonProps {
  children: ReactNode
  onClick?: () => void
  variant?: 'primary' | 'muted'
  disabled?: boolean
  className?: string
  type?: 'button' | 'submit'
}

/** Pill button. `primary` glows neon pink, `muted` is a quiet gray. */
export default function NeonButton({
  children,
  onClick,
  variant = 'primary',
  disabled = false,
  className = '',
  type = 'button',
}: NeonButtonProps) {
  const styles =
    variant === 'primary'
      ? 'bg-gradient-to-b from-[#ff6bb5] to-[#ff2f93] text-white shadow-glow-lg hover:brightness-110'
      : 'bg-white/10 text-white/70 border border-white/15 hover:bg-white/15'

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={disabled ? undefined : { scale: 1.04 }}
      whileTap={disabled ? undefined : { scale: 0.95 }}
      className={[
        'rounded-full px-7 py-2.5 text-sm font-medium tracking-wide transition-[filter,background,opacity] focus:outline-none focus-visible:ring-2 focus-visible:ring-rose',
        disabled ? 'cursor-not-allowed opacity-40 shadow-none' : 'cursor-pointer',
        styles,
        className,
      ].join(' ')}
    >
      {children}
    </motion.button>
  )
}
