import React, { useEffect, useMemo, useRef, useState } from 'react';

import '../styles/components/GraphAnimation.css';

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

function useCanHover() {
  const mql = useMemo(() => window.matchMedia('(hover: hover) and (pointer: fine)'), []);
  const [canHover, setCanHover] = useState(mql.matches);

  useEffect(() => {
    const onChange = () => setCanHover(mql.matches);
    onChange();
    mql.addEventListener?.('change', onChange);
    return () => mql.removeEventListener?.('change', onChange);
  }, [mql]);

  return canHover;
}

export default function GraphAnimation({ active } = {}) {
  const reduced = usePrefersReducedMotion();
  const canHover = useCanHover();

  const nodes = useMemo(
    () => [
      { id: 'A', x: 95, y: 52 },
      { id: 'B', x: 190, y: 78 },
      { id: 'C', x: 290, y: 60 },
      { id: 'D', x: 146, y: 136 },
      { id: 'E', x: 86, y: 176 },
      { id: 'F', x: 234, y: 162 },
      { id: 'G', x: 306, y: 130 },
    ],
    [],
  );

  const edges = useMemo(
    () => [
      ['A', 'B'],
      ['A', 'D'],
      ['B', 'C'],
      ['B', 'D'],
      ['C', 'G'],
      ['D', 'E'],
      ['D', 'F'],
      ['F', 'G'],
      ['E', 'F'],
    ],
    [],
  );

  const visitOrder = useMemo(() => ['A', 'B', 'D', 'E', 'F', 'G', 'C'], []);

  const nodeById = useMemo(() => new Map(nodes.map((n) => [n.id, n])), [nodes]);

  const hoveringRef = useRef(false);
  const [hovered, setHovered] = useState(false);

  const isExternallyControlled = typeof active === 'boolean';

  useEffect(() => {
    hoveringRef.current = hovered;
  }, [hovered]);

  useEffect(() => {
    if (!isExternallyControlled) return;
    setHovered(active);
  }, [active, isExternallyControlled]);

  const [stepIndex, setStepIndex] = useState(0); // number of visited nodes
  const [ripple, setRipple] = useState({ key: 0, x: 0, y: 0 });

  useEffect(() => {
    if (reduced) return;

    let cancelled = false;

    const sleep = (ms) =>
      new Promise((resolve) => {
        const t = setTimeout(() => {
          clearTimeout(t);
          resolve();
        }, ms);
      });

    const run = async () => {
      // Trigger only for hover-capable devices.
      if (canHover && !hoveringRef.current) return;

      while (!cancelled && (hoveringRef.current || !canHover)) {
        setStepIndex(0);

        for (let i = 0; i < visitOrder.length; i += 1) {
          if (cancelled) return;
          if (canHover && !hoveringRef.current) return;

          const id = visitOrder[i];
          const n = nodeById.get(id);
          setStepIndex(i + 1);
          setRipple({ key: i + 1 + Date.now(), x: n.x, y: n.y });
          await sleep(400);
        }

        await sleep(1500);
        if (cancelled) return;
        if (canHover && !hoveringRef.current) return;

        // Reset to hollow/unfilled.
        setStepIndex(0);
      }
    };

    run();

    return () => {
      cancelled = true;
    };
  }, [reduced, canHover, hovered, nodeById, visitOrder]);

  const visited = useMemo(() => {
    const s = new Set(visitOrder.slice(0, stepIndex));
    return s;
  }, [stepIndex, visitOrder]);

  const currentId = stepIndex > 0 ? visitOrder[stepIndex - 1] : null;
  const previousId = stepIndex > 1 ? visitOrder[stepIndex - 2] : null;

  const nodeRadius = 14;

  return (
    <div
      className="graphWrap"
      onMouseEnter={() => {
        if (isExternallyControlled) return;
        if (canHover) setHovered(true);
      }}
      onMouseLeave={() => {
        if (isExternallyControlled) return;
        if (canHover) setHovered(false);
        setStepIndex(0);
      }}
      role="img"
      aria-label="Graph path finder Dijkstra visualization"
    >
      <div className="graphCanvas">
        <svg className="graphSvg" viewBox="0 0 380 240" preserveAspectRatio="none">
          <rect x="0" y="0" width="380" height="240" fill="var(--bg-secondary)" />

          {/* Edges */}
          <g>
            {edges.map(([a, b]) => {
              const isVisitedEdge =
                stepIndex > 1 &&
                ((a === previousId && b === currentId) || (b === previousId && a === currentId));

              const opacity = isVisitedEdge ? 0.95 : stepIndex === 0 ? 0.28 : 0.18;
              return (
                <line
                  key={`${a}-${b}`}
                  x1={nodeById.get(a).x}
                  y1={nodeById.get(a).y}
                  x2={nodeById.get(b).x}
                  y2={nodeById.get(b).y}
                  stroke={isVisitedEdge ? 'var(--gold)' : 'var(--border)'}
                  strokeWidth={isVisitedEdge ? 2.2 : 1.2}
                  opacity={opacity}
                />
              );
            })}
          </g>

          {/* Nodes */}
          <g>
            {nodes.map((n) => {
              const isVisited = visited.has(n.id);
              const fill = isVisited ? 'var(--accent)' : 'transparent';
              const stroke = isVisited ? 'var(--gold)' : 'var(--gold)';
              const opacity = isVisited ? 0.95 : 0.35;

              return (
                <g key={n.id}>
                  <circle cx={n.x} cy={n.y} r={nodeRadius} fill={fill} stroke={stroke} opacity={opacity} />
                  <text
                    x={n.x}
                    y={n.y + 4}
                    textAnchor="middle"
                    fontFamily="JetBrains Mono, ui-monospace, monospace"
                    fontSize="13"
                    fill="var(--text-secondary)"
                    opacity={0.9}
                  >
                    {n.id}
                  </text>
                </g>
              );
            })}

            {/* Ripple on visited nodes */}
            {stepIndex > 0 ? (
              <circle key={ripple.key} className="graphRipple" cx={ripple.x} cy={ripple.y} r="6" />
            ) : null}
          </g>
        </svg>
      </div>

      <div className="graphHint mono">Hover to explore</div>
    </div>
  );
}

