import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import GlassCard from './GlassCard'
import NeonButton from './NeonButton'
import HeartBurst from './HeartBurst'
import { birthdayConfig } from '../data/birthdayConfig'

interface LoveQuestionProps {
  onYes: () => void
}

interface Particle {
  x: number
  y: number
  scale: number
  delay: number
  rotate: number
  emoji: string
}

export default function LoveQuestion({ onYes }: LoveQuestionProps) {
  const { question } = birthdayConfig
  const [noPosition, setNoPosition] = useState<{ x: number; y: number; rotate: number }>({
    x: 0,
    y: 0,
    rotate: 0,
  })
  const [noCount, setNoCount] = useState(0)
  const [hasMoved, setHasMoved] = useState(false)
  const [burst, setBurst] = useState(false)

  const cardRef = useRef<HTMLDivElement | null>(null)
  const yesRef = useRef<HTMLDivElement | null>(null)
  const slotRef = useRef<HTMLDivElement | null>(null)
  const noButtonRef = useRef<HTMLButtonElement | null>(null)
  const lastDodgeTime = useRef<number>(0)

  // Playful replies list
  const playfulMessages = useMemo(() => {
    const defaultReplies =
      question.noReplies && question.noReplies.length > 0
        ? question.noReplies
        : [
            'Hehe, wrong button! Try again 🙈',
            'Are you sure? Think again, my love 🥺',
            'The Yes button is feeling lonely... 💕',
            'Okay okay, last chance. Pick Yes! 😘',
          ]
    return ['Hehe, try Yes! 💗', ...defaultReplies, 'Can’t catch me! 👉💕', 'Nice try! Pick Yes instead 💖']
  }, [question.noReplies])

  const reply = noCount > 0 ? playfulMessages[(noCount - 1) % playfulMessages.length] : ''

  // Particles for celebratory Yes burst
  const yesBurstParticles = useMemo<Particle[]>(() => {
    const emojis = ['💗', '💖', '✨', '💕', '🌸', '💝']
    return Array.from({ length: 18 }, (_, i) => {
      const angle = (i / 18) * 2 * Math.PI + (Math.random() - 0.5) * 0.3
      const dist = 70 + Math.random() * 90
      return {
        x: Math.cos(angle) * dist,
        y: Math.sin(angle) * dist,
        scale: 1 + Math.random() * 0.5,
        delay: Math.random() * 0.15,
        rotate: (Math.random() - 0.5) * 45,
        emoji: emojis[i % emojis.length],
      }
    })
  }, [])

  // Calculate new random position within card / viewport avoiding Yes button
  const getNewPosition = useCallback(() => {
    if (!slotRef.current || !yesRef.current) return null

    const slotRect = slotRef.current.getBoundingClientRect()
    const yesRect = yesRef.current.getBoundingClientRect()
    const cardRect = cardRef.current?.getBoundingClientRect()

    const buttonWidth = noButtonRef.current?.offsetWidth || 110
    const buttonHeight = noButtonRef.current?.offsetHeight || 42

    const vpWidth = window.innerWidth
    const vpHeight = window.innerHeight
    const screenPad = 16

    // Absolute viewport bounds for the button
    const minVpX = screenPad
    const maxVpX = Math.max(screenPad, vpWidth - screenPad - buttonWidth)
    const minVpY = screenPad
    const maxVpY = Math.max(screenPad, vpHeight - screenPad - buttonHeight)

    // Preferred search area: around the card area if available
    const anchorRect = cardRect || slotRect
    const areaMinX = Math.max(minVpX, anchorRect.left - 30)
    const areaMaxX = Math.min(maxVpX, anchorRect.right + 30 - buttonWidth)
    const areaMinY = Math.max(minVpY, anchorRect.top - 24)
    const areaMaxY = Math.min(maxVpY, anchorRect.bottom + 24 - buttonHeight)

    const searchMinX = areaMaxX >= areaMinX ? areaMinX : minVpX
    const searchMaxX = areaMaxX >= areaMinX ? areaMaxX : maxVpX
    const searchMinY = areaMaxY >= areaMinY ? areaMinY : minVpY
    const searchMaxY = areaMaxY >= areaMinY ? areaMaxY : maxVpY

    const currentVpX = slotRect.left + noPosition.x
    const currentVpY = slotRect.top + noPosition.y

    let bestCandidate: { x: number; y: number; rotate: number } | null = null
    let maxDistance = -1

    for (let attempt = 0; attempt < 45; attempt++) {
      // Pick a random spot in search area
      const candVpX = searchMinX + Math.random() * (searchMaxX - searchMinX)
      const candVpY = searchMinY + Math.random() * (searchMaxY - searchMinY)

      const candLeft = candVpX
      const candRight = candVpX + buttonWidth
      const candTop = candVpY
      const candBottom = candVpY + buttonHeight

      // Check collision with stationary Yes button (with 24px safety buffer)
      const buffer = 24
      const collidesWithYes = !(
        candRight < yesRect.left - buffer ||
        candLeft > yesRect.right + buffer ||
        candBottom < yesRect.top - buffer ||
        candTop > yesRect.bottom + buffer
      )

      if (collidesWithYes) continue

      const distFromCurrent = Math.hypot(candVpX - currentVpX, candVpY - currentVpY)

      if (distFromCurrent >= 60) {
        return {
          x: candVpX - slotRect.left,
          y: candVpY - slotRect.top,
          rotate: (Math.random() - 0.5) * 16,
        }
      }

      if (distFromCurrent > maxDistance) {
        maxDistance = distFromCurrent
        bestCandidate = {
          x: candVpX - slotRect.left,
          y: candVpY - slotRect.top,
          rotate: (Math.random() - 0.5) * 16,
        }
      }
    }

    if (bestCandidate) return bestCandidate

    // Deterministic safe fallback (opposite side of Yes button)
    const fallbackVpY =
      currentVpY > (yesRect.top + yesRect.bottom) / 2
        ? Math.max(searchMinY, yesRect.top - buttonHeight - 30)
        : Math.min(searchMaxY, yesRect.bottom + 30)

    return {
      x: (Math.random() > 0.5 ? searchMaxX : searchMinX) - slotRect.left,
      y: fallbackVpY - slotRect.top,
      rotate: (Math.random() - 0.5) * 12,
    }
  }, [noPosition.x, noPosition.y])

  // Dodge handler for hover, click, and touch interactions
  const handleDodge = useCallback(
    (e?: React.SyntheticEvent | Event) => {
      if (burst) return
      if (e) {
        if (e.cancelable) {
          e.preventDefault()
        }
        e.stopPropagation()
      }

      const now = Date.now()
      // Small throttle to avoid jerky spam while maintaining instant responsiveness
      if (now - lastDodgeTime.current < 120) return
      lastDodgeTime.current = now

      const nextPos = getNewPosition()
      if (nextPos) {
        setNoPosition(nextPos)
        setHasMoved(true)
        setNoCount((c) => c + 1)
      }
    },
    [burst, getNewPosition],
  )

  // Clamp button on window resize / orientation change
  useEffect(() => {
    const handleResize = () => {
      if (!slotRef.current || !hasMoved) return
      const slotRect = slotRef.current.getBoundingClientRect()
      const buttonWidth = noButtonRef.current?.offsetWidth || 110
      const buttonHeight = noButtonRef.current?.offsetHeight || 42
      const minX = 16 - slotRect.left
      const maxX = window.innerWidth - 16 - buttonWidth - slotRect.left
      const minY = 16 - slotRect.top
      const maxY = window.innerHeight - 16 - buttonHeight - slotRect.top

      setNoPosition((prev) => ({
        ...prev,
        x: Math.min(Math.max(prev.x, minX), maxX),
        y: Math.min(Math.max(prev.y, minY), maxY),
      }))
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [hasMoved])

  const handleYes = () => {
    if (burst) return
    setBurst(true)
    window.setTimeout(onYes, 1600)
  }

  return (
    <>
      {burst && <HeartBurst count={48} />}
      <div ref={cardRef} className="relative w-full max-w-sm">
        <GlassCard>
          <div className="flex justify-center gap-6 text-3xl">
            <span className="animate-bob">💗</span>
            <span className="animate-bob" style={{ animationDelay: '1s' }}>
              💗
            </span>
          </div>

          <h2 className="mt-4 text-xl sm:text-2xl font-medium leading-snug text-white drop-shadow-[0_0_12px_rgba(255,79,163,0.6)]">
            {question.text}
          </h2>

          <div className="relative mt-6 flex min-h-[52px] items-center justify-center gap-4">
            {/* Stationary Yes Button */}
            <div ref={yesRef} className="relative z-10">
              <NeonButton
                onClick={handleYes}
                disabled={burst}
                className="shadow-glow hover:shadow-glow-lg transition-shadow"
              >
                {question.yesLabel}
              </NeonButton>
            </div>

            {/* No Button Slot - stays in DOM layout to keep Yes button stationary */}
            <div
              ref={slotRef}
              className="relative inline-flex items-center justify-center"
              style={{ minWidth: 104, minHeight: 42 }}
            >
              <motion.button
                ref={noButtonRef}
                type="button"
                onPointerEnter={handleDodge}
                onPointerDown={handleDodge}
                onTouchStart={handleDodge}
                onFocus={handleDodge}
                onClick={handleDodge}
                tabIndex={0}
                aria-label="No"
                disabled={burst}
                animate={{
                  x: noPosition.x,
                  y: noPosition.y,
                  rotate: noPosition.rotate,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 400,
                  damping: 24,
                  mass: 0.7,
                }}
                className={[
                  'rounded-full px-7 py-2.5 text-sm font-medium tracking-wide transition-[filter,background,opacity] focus:outline-none focus-visible:ring-2 focus-visible:ring-rose cursor-pointer select-none touch-none',
                  'bg-white/10 text-white/70 border border-white/15 hover:bg-white/15',
                  hasMoved ? 'shadow-[0_0_16px_rgba(255,79,163,0.25)]' : '',
                  burst ? 'cursor-not-allowed opacity-40' : '',
                ].join(' ')}
              >
                {question.noLabel}
              </motion.button>
            </div>
          </div>

          {/* Celebratory Yes Heart Bloom */}
          {burst && (
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center overflow-visible"
            >
              {yesBurstParticles.map((p, i) => (
                <motion.span
                  key={i}
                  initial={{ x: 0, y: 0, scale: 0.2, opacity: 1 }}
                  animate={{
                    x: p.x,
                    y: p.y,
                    scale: [0.2, p.scale, 0],
                    opacity: [1, 1, 0],
                    rotate: p.rotate,
                  }}
                  transition={{ duration: 1.3, ease: 'easeOut', delay: p.delay }}
                  className="absolute select-none text-2xl drop-shadow-[0_0_12px_rgba(255,79,163,0.8)]"
                >
                  {p.emoji}
                </motion.span>
              ))}
              <motion.div
                initial={{ scale: 0.6, opacity: 0.9 }}
                animate={{ scale: 2.2, opacity: 0 }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="absolute h-36 w-36 rounded-full border border-neon/80 bg-neon/15 blur-sm"
              />
            </div>
          )}

          {/* Playful Message Live Region */}
          <div className="mt-4 min-h-[1.75rem] flex items-center justify-center" aria-live="polite">
            <AnimatePresence mode="wait">
              {reply && !burst && (
                <motion.p
                  key={noCount}
                  initial={{ opacity: 0, y: 6, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -4, scale: 0.96 }}
                  transition={{ duration: 0.2 }}
                  className="text-sm font-medium text-rose/90 drop-shadow-[0_0_10px_rgba(255,79,163,0.5)]"
                >
                  {reply}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </GlassCard>
      </div>
    </>
  )
}

