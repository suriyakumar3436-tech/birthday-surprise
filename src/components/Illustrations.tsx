// Hand-drawn SVG characters (no external assets needed).

export function TeddyCouple({ size = 130 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" role="img" aria-label="Two teddy bears holding a heart">
      <defs>
        <radialGradient id="tc-bg" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="#5b1236" />
          <stop offset="100%" stopColor="#2a0816" />
        </radialGradient>
      </defs>
      <rect width="200" height="200" rx="28" fill="url(#tc-bg)" />
      {/* bear left */}
      <g>
        <circle cx="62" cy="78" r="9" fill="#c98a5e" />
        <circle cx="98" cy="78" r="9" fill="#c98a5e" />
        <circle cx="80" cy="96" r="28" fill="#d99b6c" />
        <circle cx="70" cy="92" r="3" fill="#2a0816" />
        <circle cx="90" cy="92" r="3" fill="#2a0816" />
        <ellipse cx="80" cy="104" rx="10" ry="7" fill="#f3d2b3" />
        <ellipse cx="80" cy="101" rx="3" ry="2" fill="#2a0816" />
        <ellipse cx="80" cy="146" rx="26" ry="28" fill="#d99b6c" />
      </g>
      {/* bear right with bow */}
      <g>
        <circle cx="102" cy="78" r="9" fill="#b97a50" opacity="0" />
        <circle cx="122" cy="82" r="9" fill="#c98a5e" />
        <circle cx="158" cy="82" r="9" fill="#c98a5e" />
        <circle cx="140" cy="100" r="28" fill="#e6ae80" />
        <circle cx="130" cy="96" r="3" fill="#2a0816" />
        <circle cx="150" cy="96" r="3" fill="#2a0816" />
        <ellipse cx="140" cy="108" rx="10" ry="7" fill="#f8e0c6" />
        <ellipse cx="140" cy="105" rx="3" ry="2" fill="#2a0816" />
        <path d="M128 76 l-10 -6 v12 z M152 76 l10 -6 v12 z" fill="#ff4fa3" />
        <circle cx="140" cy="76" r="4" fill="#ff2f93" />
        <ellipse cx="140" cy="148" rx="26" ry="28" fill="#e6ae80" />
      </g>
      {/* heart */}
      <path
        d="M110 150 c-14 -12 -22 -20 -22 -29 a12 12 0 0 1 22 -6 a12 12 0 0 1 22 6 c0 9 -8 17 -22 29z"
        fill="#ff4fa3"
        stroke="#ffd0e5"
        strokeWidth="2"
      />
    </svg>
  )
}

/** Cute bouncing heart face. `mood` changes the expression. */
export function HeartCharacter({ size = 110, mood = 'happy' }: { size?: number; mood?: 'happy' | 'cheer' | 'shy' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" role="img" aria-label="Cute heart character">
      <path
        d="M60 104 C18 72 10 52 10 38 a24 24 0 0 1 50 -8 a24 24 0 0 1 50 8 c0 14 -8 34 -50 66z"
        fill="#ff4fa3"
        stroke="#ffd0e5"
        strokeWidth="3"
      />
      <ellipse cx="34" cy="38" rx="8" ry="5" fill="#ffffff" opacity="0.35" transform="rotate(-30 34 38)" />
      {mood === 'shy' ? (
        <>
          <path d="M40 54 q6 -6 12 0" stroke="#3a0b25" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M68 54 q6 -6 12 0" stroke="#3a0b25" strokeWidth="3" fill="none" strokeLinecap="round" />
        </>
      ) : (
        <>
          <circle cx="46" cy="54" r="5" fill="#3a0b25" />
          <circle cx="74" cy="54" r="5" fill="#3a0b25" />
          <circle cx="48" cy="52" r="1.6" fill="#fff" />
          <circle cx="76" cy="52" r="1.6" fill="#fff" />
        </>
      )}
      <ellipse cx="36" cy="66" rx="7" ry="4" fill="#ff93c4" opacity="0.8" />
      <ellipse cx="84" cy="66" rx="7" ry="4" fill="#ff93c4" opacity="0.8" />
      {mood === 'cheer' ? (
        <path d="M50 68 q10 14 20 0 z" fill="#3a0b25" />
      ) : (
        <path d="M52 68 q8 8 16 0" stroke="#3a0b25" strokeWidth="3" fill="none" strokeLinecap="round" />
      )}
    </svg>
  )
}

export function SadBear({ size = 110 }: { size?: number }) {
  // A gentle, encouraging bear for wrong answers.
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" role="img" aria-label="Encouraging teddy bear">
      <circle cx="30" cy="34" r="14" fill="#c98a5e" />
      <circle cx="90" cy="34" r="14" fill="#c98a5e" />
      <circle cx="60" cy="62" r="40" fill="#d99b6c" />
      <circle cx="45" cy="56" r="4" fill="#2a0816" />
      <circle cx="75" cy="56" r="4" fill="#2a0816" />
      <ellipse cx="60" cy="74" rx="15" ry="11" fill="#f3d2b3" />
      <ellipse cx="60" cy="70" rx="4.5" ry="3" fill="#2a0816" />
      <path d="M54 80 q6 -4 12 0" stroke="#2a0816" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M96 72 c-4 6 -4 10 0 12 c4 -2 4 -6 0 -12z" fill="#8fd3ff" opacity="0" />
      <path d="M86 28 c6 -8 14 -6 14 0 c0 6 -8 10 -14 16 c-6 -6 -14 -10 -14 -16 c0 -6 8 -8 14 0z" fill="#ff4fa3" transform="translate(-8 -4) scale(0.7)" />
    </svg>
  )
}
