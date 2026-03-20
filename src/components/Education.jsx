import React from 'react';

import '../styles/components/Education.css';

const education = [
  {
    school: 'LPU',
    details: 'B.Tech CSE',
    date: 'Aug 2023 – Present',
  },
  {
    school: 'Scholar&apos;s Home Senior Secondary, Uttarakhand',
    details: 'Intermediate',
    date: '2019–2021',
  },
  {
    school: 'Krishna Public School, Chhattisgarh',
    details: 'Matriculation',
    date: '2017–2019',
  },
];

export default function Education() {
  return (
    <section id="education" className="education section">
      <div className="container">
        <div className="eduHead">
          <div className="kicker reveal" data-reveal style={{ '--reveal-delay': '60ms' }}>
            EDUCATION
          </div>
          <h2 className="sectionTitle reveal" data-reveal style={{ '--reveal-delay': '120ms' }}>
            Education
          </h2>
          <hr className="sectionDivider" />
        </div>

        <div className="eduTimeline">
          {education.map((e, idx) => (
            <div
              key={e.school}
              className="eduItem reveal"
              data-reveal
              style={{ '--reveal-delay': `${160 + idx * 100}ms` }}
            >
              <div className="eduYear mono">{e.date}</div>
              <div className="eduSchool">{e.school}</div>
              <div className="eduDetails">{e.details}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

