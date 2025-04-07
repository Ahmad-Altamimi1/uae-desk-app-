export function SidebarCircuitPattern() {
  return (
    <svg
      className="absolute bottom-0 left-0 w-full opacity-10"
      viewBox="0 0 300 400"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      <g stroke="currentColor" fill="none" strokeWidth="2">
        {/* Circuit lines */}
        <path d="M20,300 L20,350 L70,350" strokeLinecap="round" />
        <path d="M100,350 L150,350 L150,300" strokeLinecap="round" />
        <path d="M150,270 L150,230 L200,230 L200,270" strokeLinecap="round" />
        <path d="M200,300 L200,350 L250,350" strokeLinecap="round" />
        <path d="M50,300 L50,250 L100,250 L100,200" strokeLinecap="round" />
        <path d="M100,170 L100,120 L150,120" strokeLinecap="round" />
        <path d="M180,120 L230,120 L230,170" strokeLinecap="round" />
        <path d="M230,200 L230,250 L180,250" strokeLinecap="round" />

        {/* Connection nodes */}
        <circle cx="20" cy="300" r="5" fill="currentColor" />
        <circle cx="70" cy="350" r="5" fill="currentColor" />
        <circle cx="100" cy="350" r="5" fill="currentColor" />
        <circle cx="150" cy="300" r="5" fill="currentColor" />
        <circle cx="150" cy="270" r="5" fill="currentColor" />
        <circle cx="150" cy="230" r="5" fill="currentColor" />
        <circle cx="200" cy="230" r="5" fill="currentColor" />
        <circle cx="200" cy="270" r="5" fill="currentColor" />
        <circle cx="200" cy="300" r="5" fill="currentColor" />
        <circle cx="250" cy="350" r="5" fill="currentColor" />
        <circle cx="50" cy="300" r="5" fill="currentColor" />
        <circle cx="50" cy="250" r="5" fill="currentColor" />
        <circle cx="100" cy="250" r="5" fill="currentColor" />
        <circle cx="100" cy="200" r="5" fill="currentColor" />
        <circle cx="100" cy="170" r="5" fill="currentColor" />
        <circle cx="100" cy="120" r="5" fill="currentColor" />
        <circle cx="150" cy="120" r="5" fill="currentColor" />
        <circle cx="180" cy="120" r="5" fill="currentColor" />
        <circle cx="230" cy="120" r="5" fill="currentColor" />
        <circle cx="230" cy="170" r="5" fill="currentColor" />
        <circle cx="230" cy="200" r="5" fill="currentColor" />
        <circle cx="230" cy="250" r="5" fill="currentColor" />
        <circle cx="180" cy="250" r="5" fill="currentColor" />

        {/* Larger connection nodes */}
        <circle cx="70" cy="350" r="8" fill="currentColor" />
        <circle cx="150" cy="230" r="8" fill="currentColor" />
        <circle cx="100" cy="170" r="8" fill="currentColor" />
        <circle cx="180" cy="120" r="8" fill="currentColor" />
      </g>
    </svg>
  );
}
