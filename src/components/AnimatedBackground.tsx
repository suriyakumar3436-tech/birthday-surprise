import { memo, useMemo } from 'react'

interface Particle {
  id: number
  left: number
  size: number
  duration: number
  delay: number
  drift: number
  opacity: number
  blur: number
}

const rand = (min: number, max: number) => min + Math.random() * (max - min)

function useParticles(count: number): Particle[] {
  return useMemo(
    () =>
      Array.from({ length: count }, (_, id) => ({
        id,
        left: rand(0, 100),
        size: rand(10, 26),
        duration: rand(12, 26),
        delay: -rand(0, 26), // negative: start mid-flight so the screen is never empty
        drift: rand(-40, 40),
        opacity: rand(0.25, 0.75),
        blur: Math.random() < 0.3 ? rand(0.5, 1.8) : 0,
      })),
    [count],
  )
}

function AnimatedBackgroundBase() {
  const isSmall = typeof window !== 'undefined' && window.innerWidth < 640
  const hearts = useParticles(isSmall ? 14 : 24)
  const stars = useParticles(isSmall ? 26 : 46)

  return (
    <div
      aria-hidden
      className="fixed inset-0 -z-0 overflow-hidden pointer-events-none"
      style={{
        background:
          'radial-gradient(ellipse at 50% 30%, #3a0b25 0%, #230816 45%, #12030c 100%)',
      }}
    >
      {/* soft glow blobs */}
      <div
        className="absolute -top-32 -left-24 h-80 w-80 rounded-full blur-3xl"
        style={{ background: 'rgba(255,79,163,0.12)' }}
      />
      <div
        className="absolute -bottom-32 -right-24 h-96 w-96 rounded-full blur-3xl"
        style={{ background: 'rgba(120,20,70,0.35)' }}
      />

      {/* twinkling stars */}
      {stars.map((s) => (
        <span
          key={`s${s.id}`}
          className="bg-star absolute rounded-full bg-white"
          style={{
            left: `${s.left}%`,
            top: `${rand(0, 100)}%`,
            width: s.size / 8,
            height: s.size / 8,
            boxShadow: '0 0 6px 1px rgba(255,200,225,0.8)',
            animation: `twinkle ${s.duration / 4 + 2}s ease-in-out ${s.delay}s infinite`,
          }}
        />
      ))}

      {/* floating hearts + occasional glowing orbs */}
      {hearts.map((h) => {
        const orb = h.id % 6 === 0
        return (
          <span
            key={`h${h.id}`}
            className="bg-heart absolute select-none will-change-transform"
            style={
              {
                left: `${h.left}%`,
                bottom: -40,
                fontSize: h.size,
                lineHeight: 1,
                filter: h.blur ? `blur(${h.blur}px)` : undefined,
                color: '#ff6fb1',
                textShadow: '0 0 10px rgba(255,79,163,0.8)',
                '--o': h.opacity,
                '--dx': `${h.drift}px`,
                animation: `float-up ${h.duration}s linear ${h.delay}s infinite`,
              } as React.CSSProperties
            }
          >
            {orb ? (
              <span
                className="block rounded-full"
                style={{
                  width: h.size * 0.6,
                  height: h.size * 0.6,
                  background: 'radial-gradient(circle, #ffb3d6, rgba(255,79,163,0) 70%)',
                }}
              />
            ) : (
              '♥'
            )}
          </span>
        )
      })}
    </div>
  )
}

export const AnimatedBackground = memo(AnimatedBackgroundBase)
export default AnimatedBackground
