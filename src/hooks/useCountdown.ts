import { useEffect, useState } from 'react'

export interface CountdownState {
  /** Total remaining milliseconds (never negative) */
  remaining: number
  done: boolean
  /** Zero-padded HH:MM:SS. Hours can exceed 24 (and 99) for far-away dates. */
  formatted: string
  days: number
}

const pad = (n: number) => String(n).padStart(2, '0')

function compute(target: number): CountdownState {
  const remaining = Math.max(0, target - Date.now())
  const totalSeconds = Math.floor(remaining / 1000)
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60
  return {
    remaining,
    done: remaining <= 0,
    formatted: `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`,
    days: Math.floor(hours / 24),
  }
}

/** Ticks once per second until the target is reached. */
export function useCountdown(targetIso: string): CountdownState {
  const target = new Date(targetIso).getTime()
  const [state, setState] = useState<CountdownState>(() => compute(target))

  useEffect(() => {
    setState(compute(target))
    const id = window.setInterval(() => {
      const next = compute(target)
      setState(next)
      if (next.done) window.clearInterval(id)
    }, 1000)
    return () => window.clearInterval(id)
  }, [target])

  return state
}
