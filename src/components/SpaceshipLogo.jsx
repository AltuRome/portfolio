import React from 'react';

import '../styles/components/SpaceshipLogo.css';

/**
 * Interdimensional spaceship trail SVG logo.
 * variant="navbar"  — compact (~120×36) for the top navbar
 * variant="hero"    — large decorative (~400×250) for the hero aside
 */
export default function SpaceshipLogo({ variant = 'navbar' }) {
  const isHero = variant === 'hero';

  if (isHero) {
    return (
      <div className="spaceshipLogo spaceshipLogoHero" aria-hidden="true">
        <svg
          className="spaceshipSvg"
          viewBox="0 0 400 250"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Radial background glow at vanishing point */}
          <defs>
            <radialGradient id="heroRiftGlow" cx="88%" cy="50%" r="45%">
              <stop offset="0%" stopColor="rgba(74,143,168,0.08)" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
            <linearGradient id="heroTrailGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#4A8FA8" stopOpacity="0.9" />
              <stop offset="60%" stopColor="#4A8FA8" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#4A8FA8" stopOpacity="0" />
            </linearGradient>
          </defs>

          <rect width="400" height="250" fill="url(#heroRiftGlow)" />

          {/* Trail lines — 10 lines with slight curves converging right */}
          <g className="spaceshipTrailLines heroTrailLines">
            <path d="M20 60 Q200 62 350 125"   stroke="url(#heroTrailGrad)" strokeWidth="2.2" strokeLinecap="round" />
            <path d="M15 78 Q190 80 350 125"    stroke="url(#heroTrailGrad)" strokeWidth="2.0" strokeLinecap="round" />
            <path d="M30 96 Q200 98 350 125"    stroke="url(#heroTrailGrad)" strokeWidth="2.8" strokeLinecap="round" />
            <path d="M10 112 Q185 113 350 125"  stroke="url(#heroTrailGrad)" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M25 125 Q200 125 350 125"  stroke="url(#heroTrailGrad)" strokeWidth="3.0" strokeLinecap="round" />
            <path d="M10 138 Q185 137 350 125"  stroke="url(#heroTrailGrad)" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M30 154 Q200 152 350 125"  stroke="url(#heroTrailGrad)" strokeWidth="2.8" strokeLinecap="round" />
            <path d="M15 172 Q190 170 350 125"  stroke="url(#heroTrailGrad)" strokeWidth="2.0" strokeLinecap="round" />
            <path d="M20 190 Q200 188 350 125"  stroke="url(#heroTrailGrad)" strokeWidth="2.2" strokeLinecap="round" />
            {/* Extra warped lines */}
            <path d="M60 42 Q210 50 350 125"    stroke="url(#heroTrailGrad)" strokeWidth="1.4" strokeLinecap="round" opacity="0.5" />
            <path d="M60 208 Q210 200 350 125"  stroke="url(#heroTrailGrad)" strokeWidth="1.4" strokeLinecap="round" opacity="0.5" />
          </g>

          {/* Rift ring at vanishing point */}
          <ellipse
            className="spaceshipRift heroRift"
            cx="350"
            cy="125"
            rx="22"
            ry="32"
            fill="none"
            stroke="rgba(74,143,168,0.3)"
            strokeWidth="1.5"
          />

          {/* Ship dot at vanishing point */}
          <polygon
            className="spaceshipDot heroDot"
            points="350,119 354,125 350,131 346,125"
            fill="#C8A96E"
          />
        </svg>
      </div>
    );
  }

  // Navbar variant (compact)
  return (
    <div className="spaceshipLogo spaceshipLogoNav" aria-hidden="true">
      <svg
        className="spaceshipSvg"
        viewBox="0 0 120 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="navTrailGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#4A8FA8" stopOpacity="0.9" />
            <stop offset="55%" stopColor="#4A8FA8" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#4A8FA8" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Trail lines — 5 lines converging to vanishing point */}
        <g className="spaceshipTrailLines navTrailLines">
          <path d="M4 7 Q55 9 105 18"     stroke="url(#navTrailGrad)" strokeWidth="1.3" strokeLinecap="round" />
          <path d="M2 13 Q50 14 105 18"    stroke="url(#navTrailGrad)" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M6 18 Q55 18 105 18"    stroke="url(#navTrailGrad)" strokeWidth="2.0" strokeLinecap="round" />
          <path d="M2 23 Q50 22 105 18"    stroke="url(#navTrailGrad)" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M4 29 Q55 27 105 18"    stroke="url(#navTrailGrad)" strokeWidth="1.3" strokeLinecap="round" />
          {/* Warped space lines */}
          <path d="M18 3 Q60 5 105 18"     stroke="url(#navTrailGrad)" strokeWidth="0.8" strokeLinecap="round" opacity="0.45" />
          <path d="M18 33 Q60 31 105 18"   stroke="url(#navTrailGrad)" strokeWidth="0.8" strokeLinecap="round" opacity="0.45" />
        </g>

        {/* Faint rift ring */}
        <ellipse
          className="spaceshipRift navRift"
          cx="105"
          cy="18"
          rx="6"
          ry="9"
          fill="none"
          stroke="rgba(74,143,168,0.3)"
          strokeWidth="0.8"
        />

        {/* Ship dot — tiny diamond */}
        <polygon
          className="spaceshipDot navDot"
          points="105,15.5 107,18 105,20.5 103,18"
          fill="#C8A96E"
        />
      </svg>
    </div>
  );
}
