export default function Header() {
  return (
    <header className="w-full max-w-4xl text-center mb-6 flex-shrink-0">
      <div className="inline-block">
        <svg
          width="200"
          height="100"
          viewBox="0 0 280 130"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Hull */}
          <path d="M40 100 L60 70 L220 70 L240 100 Z" fill="white" />
          <path d="M30 100 L250 100 L260 120 L20 120 Z" fill="white" opacity="0.9" />

          {/* Decks */}
          <rect x="70" y="60" width="30" height="15" fill="white" opacity="0.9" rx="2" />
          <rect x="110" y="50" width="35" height="20" fill="white" opacity="0.9" rx="2" />
          <rect x="155" y="55" width="30" height="15" fill="white" opacity="0.9" rx="2" />

          {/* Smokestacks */}
          <rect x="115" y="35" width="12" height="15" fill="white" rx="2" />
          <rect x="135" y="30" width="12" height="20" fill="white" rx="2" />

          {/* Flag */}
          <line x1="125" y1="30" x2="125" y2="15" stroke="white" strokeWidth="2" />
          <path d="M125 15 L140 20 L125 25 Z" fill="#fbbf24" />

          {/* Windows */}
          {Array.from({ length: 10 }).map((_, i) => (
            <circle key={i} cx={70 + i * 15} cy="85" r="3" fill="#0EA5E9" />
          ))}

          {/* Portholes */}
          {Array.from({ length: 8 }).map((_, i) => (
            <circle key={i} cx={60 + i * 25} cy="110" r="4" fill="#0EA5E9" />
          ))}
        </svg>
      </div>

      <h1 className="text-2xl sm:text-5xl font-bold text-white mb-1">Cruise Travel Assistant</h1>
      <p className="text-base sm:text-lg text-white tracking-wide">Your AI voyage companion</p>
    </header>
  );
}
