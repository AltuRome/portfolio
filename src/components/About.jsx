import React from 'react';

import '../styles/components/About.css';

const skills = [
  'Python',
  'C++',
  'JavaScript',
  'React',
  'TensorFlow',
  'Keras',
  'Node.js',
  'NumPy',
  'Pandas',
  'Docker',
  'PostgreSQL',
  'Raylib',
  'HTML/CSS',
];

export default function About() {
  return (
    <section id="about" className="about section">
      <div className="container">
        <div className="aboutHead">
          <div className="kicker reveal" data-reveal style={{ '--reveal-delay': '60ms' }}>
            ABOUT
          </div>
          <h2 className="sectionTitle reveal" data-reveal style={{ '--reveal-delay': '120ms' }}>
            About
          </h2>
          <hr className="sectionDivider" />
        </div>

        <p className="aboutParagraph reveal" data-reveal style={{ '--reveal-delay': '200ms' }}>
          I&apos;m a second-year CS student at LPU with a focus on machine learning and systems
          programming. I like building tools that solve real problems — from satellite error
          prediction to academic planners.
        </p>

        <div className="aboutSkills reveal" data-reveal style={{ '--reveal-delay': '260ms' }}>
          {skills.map((s) => (
            <span key={s} className="pill mono">
              {s}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

