import React, { useEffect, useMemo, useRef } from 'react';

import '../styles/components/GnssAnimation.css';

function usePrefersReducedMotion() {
  const mql = useMemo(() => window.matchMedia('(prefers-reduced-motion: reduce)'), []);
  const getValue = () => mql.matches;

  const stateRef = useRef(getValue());
  const [, force] = React.useState(0);

  useEffect(() => {
    const onChange = () => {
      stateRef.current = getValue();
      force((v) => v + 1);
    };
    onChange();
    mql.addEventListener?.('change', onChange);
    return () => mql.removeEventListener?.('change', onChange);
  }, [mql]);

  return stateRef.current;
}

export default function GnssAnimation() {
  const reduced = usePrefersReducedMotion();

  const pathRef = useRef(null);
  const satRef = useRef(null);
  const pulseRef = useRef(null);
  const trailRefs = useRef([]);

  const reducedOnceRef = useRef(false);

  useEffect(() => {
    if (!pathRef.current || !satRef.current) return;

    const path = pathRef.current;
    const total = path.getTotalLength();
    const sat = satRef.current;
    const pulse = pulseRef.current;

    const trailCircles = trailRefs.current;
    const trailN = trailCircles.length;

    // Pre-seed trail at the beginning for zero-jank layout.
    const seedPt = path.getPointAtLength(0);
    for (let i = 0; i < trailN; i += 1) {
      const c = trailCircles[i];
      c.setAttribute('cx', String(seedPt.x));
      c.setAttribute('cy', String(seedPt.y));
      c.style.opacity = '0';
    }

    let raf = 0;
    const start = performance.now();
    const durationMs = 5200;

    const trailPushEveryMs = 70;
    let lastTrailPush = 0;

    const pulsePeriodMs = 2800;
    const pulseDurationMs = 900;
    let lastPulseStart = start;

    let lastLen = 0;

    const renderAt = (now) => {
      const t = ((now - start) % durationMs) / durationMs;
      const len = t * total;

      // Satellite position + tangent for rotation.
      const p = path.getPointAtLength(len);
      const p2 = path.getPointAtLength(Math.min(total, len + 1));
      const angle = Math.atan2(p2.y - p.y, p2.x - p.x) * (180 / Math.PI);

      sat.setAttribute('transform', `translate(${p.x} ${p.y}) rotate(${angle})`);

      if (reduced) {
        // Freeze after the first frame.
        if (!reducedOnceRef.current) {
          reducedOnceRef.current = true;
          // Place a short static signal ring.
          if (pulse) {
            pulse.setAttribute('cx', String(p.x));
            pulse.setAttribute('cy', String(p.y));
            pulse.setAttribute('r', '16');
            pulse.style.opacity = '0.35';
          }
        }
        return;
      }

      // Trail push.
      if (now - lastTrailPush > trailPushEveryMs || Math.abs(len - lastLen) > 8) {
        lastTrailPush = now;
        lastLen = len;

        // Shift older points left (index 0 is oldest).
        for (let i = 0; i < trailN - 1; i += 1) {
          const src = trailCircles[i + 1];
          trailCircles[i].setAttribute('cx', src.getAttribute('cx') || String(seedPt.x));
          trailCircles[i].setAttribute('cy', src.getAttribute('cy') || String(seedPt.y));
          trailCircles[i].style.opacity = String((i / (trailN - 1)) * 0.55);
        }

        const newest = trailCircles[trailN - 1];
        newest.setAttribute('cx', String(p.x));
        newest.setAttribute('cy', String(p.y));
        newest.style.opacity = '0.85';
      } else {
        // Fade old trail a tiny bit between pushes.
        for (let i = 0; i < trailN; i += 1) {
          const c = trailCircles[i];
          const current = Number(c.style.opacity || 0);
          c.style.opacity = String(current * 0.98);
        }
      }

      if (pulse) {
        const elapsed = now - lastPulseStart;
        if (elapsed > pulsePeriodMs) lastPulseStart = now;

        const local = now - lastPulseStart;
        const progress = Math.min(1, local / pulseDurationMs);
        const r = 6 + progress * 18;
        const op = (1 - progress) * 0.55;

        pulse.setAttribute('cx', String(p.x));
        pulse.setAttribute('cy', String(p.y));
        pulse.setAttribute('r', String(r));
        pulse.style.opacity = String(op);

        if (progress >= 1) pulse.style.opacity = '0';
      }

      raf = requestAnimationFrame(renderAt);
    };

    raf = requestAnimationFrame(renderAt);
    return () => {
      cancelAnimationFrame(raf);
    };
  }, [reduced]);

  // Orbit curve (elliptical-ish) across the frame.
  const orbitD = 'M20 130 Q140 20 260 130';

  return (
    <div className="gnssWrap" aria-hidden="true">
      <svg className="gnssSvg" viewBox="0 0 280 180" preserveAspectRatio="none">
        <defs>
          <path id="orbitPath" d={orbitD} />
        </defs>

        <path ref={pathRef} d={orbitD} fill="none" stroke="var(--gold)" strokeWidth="2" opacity="0.35" strokeDasharray="7 6" />

        {/* Stars */}
        <g className="gnssStars">
          <circle cx="42" cy="34" r="1.4" className="gnssStar" style={{ animationDelay: '0.1s' }} />
          <circle cx="222" cy="28" r="1.1" className="gnssStar" style={{ animationDelay: '0.5s' }} />
          <circle cx="248" cy="70" r="1.3" className="gnssStar" style={{ animationDelay: '0.8s' }} />
          <circle cx="78" cy="76" r="1.0" className="gnssStar" style={{ animationDelay: '1.1s' }} />
        </g>

        {/* Trail */}
        <g>
          {Array.from({ length: 14 }).map((_, i) => (
            <circle
              // eslint-disable-next-line react/no-array-index-key
              key={i}
              ref={(el) => {
                trailRefs.current[i] = el;
              }}
              cx="0"
              cy="0"
              r="2.1"
              fill="var(--accent)"
              style={{ opacity: 0 }}
            />
          ))}
        </g>

        {/* Signal pulse ring */}
        <circle ref={pulseRef} cx="0" cy="0" r="6" fill="none" stroke="var(--accent)" strokeWidth="1.6" opacity="0" />

        {/* Satellite (simple geometric) */}
        <g ref={satRef} transform="translate(0 0)">
          <rect x="-6" y="-2.2" width="12" height="4.4" rx="2" fill="var(--accent)" opacity="0.95" />
          <rect x="-16" y="-1.4" width="10" height="3.2" rx="1" fill="var(--accent)" opacity="0.92" />
          <rect x="6" y="-1.4" width="10" height="3.2" rx="1" fill="var(--accent)" opacity="0.92" />
          <rect x="-1.1" y="-4.8" width="2.2" height="3.1" rx="1.1" fill="var(--accent)" opacity="0.85" />
        </g>
      </svg>
    </div>
  );
}

