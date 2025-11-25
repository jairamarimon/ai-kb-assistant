export default function Header() {
  return (
    <header className="w-full max-w-4xl text-center mb-6 flex-shrink-0">
      <div className="inline-block group">
        <div className="relative">
          {/* Glow effect behind ship */}
          <div className="absolute inset-0 blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-500">
            <svg
              width="240"
              height="120"
              viewBox="0 0 280 130"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <ellipse cx="140" cy="90" rx="100" ry="40" fill="white" />
            </svg>
          </div>
          
          {/* Ship SVG */}
          <svg
            width="150"
            height="75"
            viewBox="0 0 280 130"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            className="relative drop-shadow-2xl transition-transform duration-500 group-hover:scale-105"
          >
            {/* Hull */}
            <path d="M40 100 L60 70 L220 70 L240 100 Z" fill="white" />
            <path d="M30 100 L250 100 L260 120 L20 120 Z" fill="white" opacity="0.95" />

            {/* Decks */}
            <rect x="70" y="60" width="30" height="15" fill="white" opacity="0.95" rx="3" />
            <rect x="110" y="50" width="35" height="20" fill="white" opacity="0.95" rx="3" />
            <rect x="155" y="55" width="30" height="15" fill="white" opacity="0.95" rx="3" />

            {/* Smokestacks */}
            <rect x="115" y="35" width="12" height="15" fill="white" rx="2" />
            <rect x="135" y="30" width="12" height="20" fill="white" rx="2" />

            {/* Smoke effect */}
            <circle cx="121" cy="32" r="4" fill="white" opacity="0.6" className="animate-pulse" />
            <circle cx="141" cy="27" r="4" fill="white" opacity="0.6" className="animate-pulse" style={{ animationDelay: '0.5s' }} />

            {/* Flag */}
            <line x1="125" y1="30" x2="125" y2="15" stroke="white" strokeWidth="2.5" />
            <path d="M125 15 L143 21 L125 27 Z" fill="#edce6b" className="drop-shadow-lg" />

            {/* Windows with glow */}
            {Array.from({ length: 10 }).map((_, i) => (
              <circle 
                key={i} 
                cx={70 + i * 15} 
                cy="85" 
                r="3.5" 
                fill="#21c4e6"
                className="drop-shadow-md"
              />
            ))}

            {/* Portholes */}
            {Array.from({ length: 8 }).map((_, i) => (
              <circle 
                key={i} 
                cx={60 + i * 25} 
                cy="110" 
                r="4.5" 
                fill="#007e95"
                className="drop-shadow-md"
              />
            ))}
          </svg>
        </div>
      </div>

      <div className="space-y-3">
        <h1 className="text-3xl sm:text-5xl font text-white drop-shadow-lg tracking-tight">
          Cruise Travel Assistant
        </h1>
        <div className="inline-flex items-center gap-2 px-6 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30">
          <div className="w-2 h-2 rounded-full bg-[#edce6b] animate-pulse"></div>
          <p className="text-base sm:text-lg text-white/95">Your AI voyage companion</p>
        </div>
      </div>
    </header>
  );
}
