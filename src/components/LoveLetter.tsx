import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import NeonButton from './NeonButton'
import HeartBurst from './HeartBurst'
import { birthdayConfig } from '../data/birthdayConfig'

interface LoveLetterProps {
  onRestart: () => void
}

const CHAR_DELAY_MS = 28

export default function LoveLetter({ onRestart }: LoveLetterProps) {
  const { letter, name, restartLabel } = birthdayConfig
  const reduce = useReducedMotion()

  const greeting = letter.greeting.replace('{name}', name)
  const fullText = useMemo(() => letter.paragraphs.join('\n\n'), [letter.paragraphs])

  const [count, setCount] = useState(reduce ? fullText.length : 0)
  const [loved, setLoved] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const typing = count < fullText.length

  useEffect(() => {
    if (reduce) {
      setCount(fullText.length)
      return
    }
    const id = window.setInterval(() => {
      setCount((c) => {
        if (c >= fullText.length) {
          window.clearInterval(id)
          return c
        }
        return c + 1
      })
    }, CHAR_DELAY_MS)
    return () => window.clearInterval(id)
  }, [fullText, reduce])

  // keep the newest line in view while typing
  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [count])

  const skip = () => setCount(fullText.length)

  return (
    <>
      {loved && <HeartBurst count={50} />}
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-lg rounded-2xl bg-gradient-to-b from-[#fffafc] via-[#fff2f7] to-[#ffe5ee] p-6 sm:p-8 text-[#5b1236] shadow-[0_0_40px_rgba(255,150,200,0.55),0_0_90px_rgba(255,79,163,0.25)] border border-[#ffc2d9]/60"
      >
        <AnimatePresence mode="wait">
          {!loved ? (
            <motion.div key="letter" exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
              <h2 className="font-hand text-3xl sm:text-4xl font-bold text-[#c2185b] tracking-wide">{greeting}</h2>

              <div
                ref={scrollRef}
                className="mt-4 max-h-[58vh] sm:max-h-none overflow-y-auto pr-2 text-left font-hand text-lg sm:text-xl leading-relaxed whitespace-pre-line text-[#5b1236]"
                aria-live="off"
              >
                {fullText.slice(0, count)}
                {typing && (
                  <span className="ml-0.5 inline-block h-5 w-[2px] translate-y-1 animate-pulse bg-[#c2185b]" />
                )}
                {!typing && letter.signature && (
                  <p className="mt-4 text-right text-[#c2185b]">{letter.signature}</p>
                )}
              </div>

              {/* Small decorative pink heart near the bottom of the letter */}
              <div className="mt-4 flex items-center justify-center">
                <span className="text-xl select-none filter drop-shadow-[0_0_6px_rgba(255,79,163,0.4)] animate-bob">
                  💖
                </span>
              </div>

              <div className="mt-5 flex items-center justify-center gap-3">
                {typing ? (
                  <button
                    onClick={skip}
                    className="text-xs text-[#c2185b]/70 underline underline-offset-2 hover:text-[#c2185b] transition-colors"
                  >
                    Skip typing
                  </button>
                ) : (
                  <NeonButton onClick={() => setLoved(true)}>{letter.buttonLabel}</NeonButton>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="final"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="py-6"
            >
              <div className="text-5xl animate-bob">💖</div>
              <p className="mt-4 font-script text-3xl sm:text-4xl leading-snug text-[#c2185b]">
                {letter.finalMessage}
              </p>
              <button
                onClick={onRestart}
                className="mt-6 rounded-full border border-[#c2185b]/40 px-5 py-2 text-sm text-[#c2185b] transition hover:bg-[#c2185b]/10"
              >
                {restartLabel}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  )
}
