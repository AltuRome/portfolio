import React, { useState } from 'react';

import GnssAnimation from './GnssAnimation.jsx';
import GraphAnimation from './GraphAnimation.jsx';
import GradeRainAnimation from './GradeRainAnimation.jsx';

import '../styles/components/Projects.css';

const projects = [
  {
    title: 'GNSS Satellite Error Predictor',
    date: 'Nov 2025 – Present',
    tags: ['TensorFlow', 'NumPy', 'AutoGluon'],
    bullets: [
      'Deep learning model forecasting time-varying clock and ephemeris errors for navigation satellites',
      'Integrates LSTM and Transformer-based networks to predict error patterns at 15-minute intervals',
      'Goal: Reduce delta between uploaded and modeled satellite parameters',
    ],
    animation: 'gnss',
  },
  {
    title: 'GraphMap – Graph Path Finder',
    date: 'Jun 2025 – Jul 2025',
    tags: ['Raylib', 'FMT', 'termcolor (C++)'],
    bullets: [
      'Solves map routing congestion within weighted graphs',
      "Dijkstra's algorithm with STL + custom CSV parser for graph node data",
      'Real-time path visualization via Raylib',
    ],
    animation: 'graph',
    href: 'https://github.com/AltuRome/Dijkstra-Graph-Path-Finder',
  },
  {
    title: 'GradeUp – Academic Performance Estimator',
    date: 'Jan 2025 – Feb 2025',
    tags: ['React', 'Express.js', 'Docker', 'PostgreSQL'],
    bullets: [
      'Website for students to plan semesters strategically',
      'Processes grades and identifies subjects for score improvement',
      'Delivers predictive scoring to enhance academic preparation',
    ],
    animation: 'grade',
    href: 'https://github.com/AltuRome/LPU-TGPA-Calculator',
  },
];

function GithubLinkBadge() {
  return (
    <span className="projectGithubBadge" aria-hidden="true">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M12 2C6.477 2 2 6.487 2 12.022c0 4.425 2.865 8.18 6.839 9.505.5.093.682-.218.682-.483 0-.237-.009-.868-.014-1.705-2.782.607-3.369-1.343-3.369-1.343-.454-1.159-1.11-1.468-1.11-1.468-.908-.62.069-.608.069-.608 1.004.071 1.532 1.05 1.532 1.05.892 1.53 2.341 1.088 2.91.832.091-.646.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.094.39-1.989 1.03-2.688-.103-.253-.447-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.56 9.56 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.748-1.026 2.748-1.026.546 1.378.202 2.397.099 2.65.64.699 1.029 1.594 1.029 2.688 0 3.847-2.339 4.695-4.566 4.943.36.312.679.92.679 1.854 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482 3.972-1.325 6.833-5.078 6.833-9.504C22 6.487 17.523 2 12 2Z"
          stroke="currentColor"
          strokeWidth="1.2"
        />
      </svg>
      <span>View on GitHub</span>
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ marginLeft: '2px' }}>
        <path d="M7 17L17 7M17 7H9M17 7V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

export default function Projects() {
  const [graphHover, setGraphHover] = useState(false);
  const renderAnimation = (kind) => {
    if (kind === 'gnss') return <GnssAnimation />;
    if (kind === 'graph') return <GraphAnimation active={graphHover} />;
    return <GradeRainAnimation />;
  };

  return (
    <section id="projects" className="projects section">
      <div className="container">
        <div className="projectsHead">
          <div className="kicker reveal" data-reveal style={{ '--reveal-delay': '60ms' }}>
            PROJECTS
          </div>
          <h2 className="sectionTitle projectsTitle reveal" data-reveal style={{ '--reveal-delay': '120ms' }}>
            Projects
          </h2>
          <hr className="sectionDivider" />
        </div>

        <div className="projectsRows">
          {projects.map((p, idx) => {
            const isReverse = idx % 2 === 1;
            const isClickable = !!p.href;

            const rowContent = (
              <div className="projectRowGrid">
                <div className="projectContent">
                  <div className="projectTop">
                    <h3 className="projectTitle">{p.title}</h3>
                    <div className="projectDate mono">{p.date}</div>
                  </div>

                  <div className="projectTags">
                    {p.tags.map((t) => (
                      <span key={t} className="pill mono projectTag">
                        {t}
                      </span>
                    ))}
                  </div>

                  <ul className="projectBullets">
                    {p.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </div>

                <div className="projectVisual">{renderAnimation(p.animation)}</div>

                {isClickable && <GithubLinkBadge />}
              </div>
            );

            return (
              <React.Fragment key={p.title}>
                {idx > 0 && <hr className="sectionDivider projectRowDivider" />}
                {isClickable ? (
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`projectRow projectRowClickable ${isReverse ? 'projectRowReverse' : ''} reveal`}
                    data-reveal
                    style={{ '--reveal-delay': `${180 + idx * 100}ms` }}
                    onMouseEnter={p.animation === 'graph' ? () => setGraphHover(true) : undefined}
                    onMouseLeave={p.animation === 'graph' ? () => setGraphHover(false) : undefined}
                  >
                    {rowContent}
                  </a>
                ) : (
                  <article
                    className={`projectRow ${isReverse ? 'projectRowReverse' : ''} reveal`}
                    data-reveal
                    style={{ '--reveal-delay': `${180 + idx * 100}ms` }}
                    onMouseEnter={p.animation === 'graph' ? () => setGraphHover(true) : undefined}
                    onMouseLeave={p.animation === 'graph' ? () => setGraphHover(false) : undefined}
                  >
                    {rowContent}
                  </article>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </section>
  );
}
