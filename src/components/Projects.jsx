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
  },
];

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
            return (
              <React.Fragment key={p.title}>
                {idx > 0 && <hr className="sectionDivider projectRowDivider" />}
                <article
                  className={`projectRow ${isReverse ? 'projectRowReverse' : ''} reveal`}
                  data-reveal
                  style={{ '--reveal-delay': `${180 + idx * 100}ms` }}
                  onMouseEnter={p.animation === 'graph' ? () => setGraphHover(true) : undefined}
                  onMouseLeave={p.animation === 'graph' ? () => setGraphHover(false) : undefined}
                >
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
                  </div>
                </article>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </section>
  );
}
