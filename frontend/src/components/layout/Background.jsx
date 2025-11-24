export default function Background() {
  return (
    <div className="fixed inset-0 bg-gradient-to-b from-[#6abdc5] via-[#efe4c6] to-[#4cb9d5] overflow-hidden">
      <svg
        className="absolute bottom-0 left-0 w-full h-64 opacity-20"
        viewBox="0 0 1440 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0 192C360 288 720 96 1080 192H1440V320H0V192Z" fill="white" opacity="0.1" />
        <path d="M0 224C360 128 720 320 1080 224H1440V320H0V224Z" fill="white" opacity="0.1" />
      </svg>
    </div>
  );
}
