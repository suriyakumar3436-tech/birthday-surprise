import { motion, useReducedMotion } from 'framer-motion'
import { useMemo } from 'react'

interface HeartBurstProps {
  count?: number
}

/** Full-screen celebratory burst of hearts rising from the bottom. Pointer-events are off. */
export default function HeartBurst({ count = 36 }: HeartBurstProps) {
  const reduce = useReducedMotion()
  const hearts = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        i,
        x: Math.random() * 100,
        size: 16 + Math.random() * 30,
        delay: Math.random() * 0.8,
        duration: 2.2 + Math.random() * 1.8,
        drift: (Math.random() - 0.5) * 120,
        emoji: ['💗', '💖', '💕', '💞', '❤️'][i % 5],
      })),
    [count],
  )

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {hearts.map((h) => (
        <motion.span
          key={h.i}
          className="absolute select-none"
          style={{ left: `${h.x}%`, bottom: -50, fontSize: h.size }}
          initial={{ y: 0, opacity: 0, scale: 0.5 }}
          animate={
            reduce
              ? { opacity: [0, 1, 0], scale: 1 }
              : { y: '-110vh', x: h.drift, opacity: [0, 1, 1, 0], scale: [0.5, 1.1, 1] }
          }
          transition={{ duration: reduce ? 1.5 : h.duration, delay: h.delay, ease: 'easeOut' }}
        >
          {h.emoji}
        </motion.span>
      ))}
    </div>
  )
}
