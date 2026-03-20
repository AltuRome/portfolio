import React, { useEffect, useMemo, useRef, useState } from 'react';

import '../styles/components/GradeRainAnimation.css';

function usePrefersReducedMotion() {
  const mql = useMemo(() => window.matchMedia('(prefers-reduced-motion: reduce)'), []);
  const [reduced, setReduced] = useState(mql.matches);

  useEffect(() => {
    const onChange = () => setReduced(mql.matches);
    onChange();
    mql.addEventListener?.('change', onChange);
    return () => mql.removeEventListener?.('change', onChange);
  }, [mql]);

  return reduced;
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

export default function GradeRainAnimation() {
  const reduced = usePrefersReducedMotion();

  const canvasRef = useRef(null);
  const rafRef = useRef(0);
  const sizeRef = useRef({ w: 280, h: 180 });

  const [focalKey, setFocalKey] = useState(0);
  const [focalIndex, setFocalIndex] = useState(0);

  const gradesRain = useMemo(() => ['F', 'D', 'C', 'C+', 'B', 'B+', 'A', 'A+'], []);
  const focalCycle = useMemo(() => ['C', 'C+', 'B', 'B+', 'A', 'A+'], []);

  useEffect(() => {
    if (reduced) return undefined;

    let cancelled = false;
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

    let key = 0;

    const run = async () => {
      while (!cancelled) {
        for (let i = 0; i < focalCycle.length; i += 1) {
          if (cancelled) return;
          setFocalIndex(i);
          key += 1;
          setFocalKey(key);
          // Each grade sits for 0.6s with a slide/fade transition.
          // The final A+ will get a glow burst via CSS when it mounts.
          await sleep(600);
        }
        // Pause before looping back.
        await sleep(1500);
      }
    };

    run();
    return () => {
      cancelled = true;
    };
  }, [reduced, focalCycle]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const ctx = canvas.getContext('2d');
    if (!ctx) return undefined;

    const rootStyles = getComputedStyle(document.documentElement);
    const textPrimary = rootStyles.getPropertyValue('--text-primary').trim();
    const textSecondary = rootStyles.getPropertyValue('--text-secondary').trim();
    const bgSecondary = rootStyles.getPropertyValue('--bg-secondary').trim();
    const accent = rootStyles.getPropertyValue('--accent').trim();

    let cancelled = false;

    const particles = [];
    const particleCount = 28;

    const order = ['F', 'D', 'C', 'C+', 'B', 'B+', 'A', 'A+'];
    const gradeRank = (g) => order.indexOf(g);

    const randomGrade = () => {
      // Slightly bias toward middle grades for a calmer density.
      const r = Math.random();
      if (r < 0.12) return 'F';
      if (r < 0.23) return 'D';
      if (r < 0.40) return 'C';
      if (r < 0.55) return 'C+';
      if (r < 0.72) return 'B';
      if (r < 0.84) return 'B+';
      if (r < 0.94) return 'A';
      return 'A+';
    };

    const spawn = (p, w, h, y0) => {
      const grade = randomGrade();
      const rank = gradeRank(grade);
      const t = rank / (order.length - 1);

      p.grade = grade;
      p.x0 = Math.random() * w;
      p.y = y0 ?? -Math.random() * (h * 0.4);
      p.phase = Math.random() * Math.PI * 2;
      p.swayAmp = lerp(6, 18, Math.pow(t, 0.8));

      // Faster for brighter grades.
      const speed = lerp(18, 48, Math.pow(t, 1.15));
      p.speed = speed;

      p.size = lerp(12, 20, Math.pow(t, 1.05));
      p.alphaBase = lerp(0.28, 0.62, Math.pow(t, 1.0));
      p.color = t < 0.35 ? textSecondary : textPrimary;
      p.tint = t < 0.35 ? accent : textPrimary;
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const w = Math.max(1, Math.round(rect.width));
      const h = Math.max(1, Math.round(rect.height));
      sizeRef.current = { w, h };

      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Ensure a stable particle set after resize.
      if (particles.length === 0) {
        for (let i = 0; i < particleCount; i += 1) {
          const p = {};
          spawn(p, w, h, -Math.random() * h);
          particles.push(p);
        }
      } else {
        particles.forEach((p) => {
          if (p.x0 > w) p.x0 = Math.random() * w;
        });
      }
    };

    resize();

    const ro = new ResizeObserver(() => resize());
    ro.observe(canvas);

    if (reduced) {
      const { w, h } = sizeRef.current;

      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = bgSecondary;
      ctx.fillRect(0, 0, w, h);
      ctx.globalAlpha = 0.08;
      ctx.fillStyle = accent;
      ctx.fillRect(0, 0, w, h);
      ctx.globalAlpha = 1;

      particles.forEach((p) => {
        if (p.x0 > w) p.x0 = Math.random() * w;
        if (p.y < 0 || p.y > h) p.y = Math.random() * h;
        const x = p.x0 + Math.sin(Date.now() * 0.001 + p.phase) * (p.swayAmp * 0.2);
        const alpha = p.alphaBase * 0.75;
        ctx.globalAlpha = alpha;
        ctx.font = `600 ${p.size}px "Cinzel", serif`;
        ctx.fillStyle = p.color;
        ctx.fillText(p.grade, x, p.y);
      });

      return () => {
        ro.disconnect();
      };
    }

    let last = performance.now();

    const draw = (now) => {
      if (cancelled) return;
      const { w, h } = sizeRef.current;
      const dt = Math.min(0.033, (now - last) / 1000);
      last = now;

      // Clear background (no heavy trails).
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = bgSecondary;
      ctx.fillRect(0, 0, w, h);

      // Subtle haze.
      ctx.globalAlpha = 0.08;
      ctx.fillStyle = accent;
      ctx.fillRect(0, 0, w, h);
      ctx.globalAlpha = 1;

      for (let i = 0; i < particles.length; i += 1) {
        const p = particles[i];

        p.y += p.speed * dt;
        const xSway = Math.sin(now * 0.001 + p.phase) * p.swayAmp * dt * 1.6;
        const x = p.x0 + xSway;

        if (p.y > h + p.size + 6) {
          spawn(p, w, h, -Math.random() * (h * 0.25));
        }

        // Fade out a touch near the bottom.
        const yT = Math.max(0, (h - p.y) / h);
        const alpha = p.alphaBase * (0.6 + 0.4 * yT);

        ctx.globalAlpha = alpha;
        ctx.font = `600 ${p.size}px "Cinzel", serif`;
        ctx.fillStyle = p.color;
        ctx.fillText(p.grade, x, p.y);

        // A tiny accent shadow for bright grades.
        if (p.color === textPrimary && p.grade.endsWith('+')) {
          ctx.globalAlpha = alpha * 0.45;
          ctx.fillStyle = accent;
          ctx.fillText(p.grade, x + 0.8, p.y + 0.8);
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    if (!reduced) rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelled = true;
      ro.disconnect();
      cancelAnimationFrame(rafRef.current);
    };
  }, [reduced, gradesRain]);

  const focalGrade = focalCycle[focalIndex] || 'C';
  const isBurst = focalIndex === focalCycle.length - 1;

  return (
    <div className="gradeWrap" aria-hidden="true">
      <canvas className="gradeCanvas" ref={canvasRef} />
      <div className="gradeFocalLayer">
        <div key={focalKey} className={`gradeFocal ${isBurst ? 'isBurst' : ''}`}>
          {focalGrade}
        </div>
      </div>
    </div>
  );
}

