export default function Logo({ className = '' }) {
  return (
    <svg 
      viewBox="0 0 200 200" 
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer hexagon */}
      <path 
        d="M100 20 L170 60 L170 140 L100 180 L30 140 L30 60 Z" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="3"
        className="text-purple-500"
      />
      
      {/* Inner design - Code brackets */}
      <text 
        x="60" 
        y="120" 
        fontSize="80" 
        fontWeight="bold" 
        fill="currentColor"
        className="text-purple-500"
        fontFamily="monospace"
      >
        {'<'}
      </text>
      <text 
        x="115" 
        y="120" 
        fontSize="80" 
        fontWeight="bold" 
        fill="currentColor"
        className="text-purple-500"
        fontFamily="monospace"
      >
        {'>'}
      </text>
      
      {/* Center dot */}
      <circle 
        cx="100" 
        cy="100" 
        r="8" 
        fill="currentColor"
        className="text-purple-500"
      />
      
      {/* Animated glow effect */}
      <circle 
        cx="100" 
        cy="100" 
        r="12" 
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="text-purple-500 opacity-50"
      >
        <animate
          attributeName="r"
          values="12;20;12"
          dur="2s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          values="0.5;0;0.5"
          dur="2s"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  );
}