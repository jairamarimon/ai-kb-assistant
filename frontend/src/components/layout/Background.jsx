export default function Background() {
  return (
      <div className="fixed inset-0 bg-gradient-to-b from-[#21c4e6] via-[#edce6b] to-[#007e95] overflow-hidden">
        {/* Overlay gradient for depth */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#007e95]/30 via-transparent to-[#edce6b]/20"></div>
        
        {/* Animated orbs for modern effect */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#21c4e6]/40 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#007e95]/40 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#edce6b]/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>
  );
}
