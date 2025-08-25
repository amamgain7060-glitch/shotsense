interface ShotSenseLogoProps {
  className?: string;
  size?: number;
}

export function ShotSenseLogo({ className = "", size = 48 }: ShotSenseLogoProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 48 48" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="racketGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{stopColor:"#3B82F6", stopOpacity:1}} />
          <stop offset="100%" style={{stopColor:"#1D4ED8", stopOpacity:1}} />
        </linearGradient>
        <linearGradient id="shuttlecockGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{stopColor:"#F59E0B", stopOpacity:1}} />
          <stop offset="100%" style={{stopColor:"#D97706", stopOpacity:1}} />
        </linearGradient>
      </defs>
      
      {/* Background circle */}
      <circle cx="24" cy="24" r="22" fill="#1E293B" stroke="#334155" strokeWidth="2"/>
      
      {/* Badminton racket handle */}
      <rect x="20" y="30" width="8" height="12" rx="4" fill="url(#racketGradient)"/>
      
      {/* Racket head (oval) */}
      <ellipse cx="24" cy="18" rx="9" ry="12" fill="none" stroke="url(#racketGradient)" strokeWidth="3"/>
      
      {/* Racket strings (horizontal) */}
      <line x1="16" y1="10" x2="32" y2="10" stroke="#60A5FA" strokeWidth="0.8" opacity="0.7"/>
      <line x1="16" y1="14" x2="32" y2="14" stroke="#60A5FA" strokeWidth="0.8" opacity="0.7"/>
      <line x1="16" y1="18" x2="32" y2="18" stroke="#60A5FA" strokeWidth="0.8" opacity="0.7"/>
      <line x1="16" y1="22" x2="32" y2="22" stroke="#60A5FA" strokeWidth="0.8" opacity="0.7"/>
      <line x1="16" y1="26" x2="32" y2="26" stroke="#60A5FA" strokeWidth="0.8" opacity="0.7"/>
      
      {/* Racket strings (vertical) */}
      <line x1="18" y1="8" x2="18" y2="28" stroke="#60A5FA" strokeWidth="0.8" opacity="0.7"/>
      <line x1="21" y1="7" x2="21" y2="29" stroke="#60A5FA" strokeWidth="0.8" opacity="0.7"/>
      <line x1="24" y1="6" x2="24" y2="30" stroke="#60A5FA" strokeWidth="0.8" opacity="0.7"/>
      <line x1="27" y1="7" x2="27" y2="29" stroke="#60A5FA" strokeWidth="0.8" opacity="0.7"/>
      <line x1="30" y1="8" x2="30" y2="28" stroke="#60A5FA" strokeWidth="0.8" opacity="0.7"/>
      
      {/* Shuttlecock */}
      <g transform="translate(36, 10)">
        {/* Shuttlecock head */}
        <circle cx="0" cy="0" r="3" fill="url(#shuttlecockGradient)"/>
        {/* Feathers */}
        <path d="M-2,-3 L-3,-9 L0,-7.5 L3,-9 L2,-3" fill="#F3F4F6" stroke="#D1D5DB" strokeWidth="0.8"/>
        <path d="M-1,-3 L-1.5,-8 L1,-3 L1.5,-8" stroke="#D1D5DB" strokeWidth="0.5"/>
      </g>
      
      {/* Motion lines for dynamic effect */}
      <path d="M38,12 Q42,14 40,18" stroke="#F59E0B" strokeWidth="2" fill="none" opacity="0.6"/>
      <path d="M40,14 Q44,16 42,20" stroke="#F59E0B" strokeWidth="1.5" fill="none" opacity="0.4"/>
    </svg>
  );
}