import React from 'react';

import '../styles/components/Education.css';

const education = [
  {
    institution: 'Lovely Professional University',
    location: 'Punjab, India',
    degree: 'Bachelor of Technology – Computer Science and Engineering',
    date: 'Aug 2023 – Present',
    ongoing: true,
  },
  {
    institution: "Scholar's Home Senior Secondary School",
    location: 'Uttarakhand, India',
    degree: 'Intermediate',
    date: '2019 – 2021',
    ongoing: false,
  },
  {
    institution: 'Krishna Public School',
    location: 'Chhattisgarh, India',
    degree: 'Matriculation',
    date: '2017 – 2019',
    ongoing: false,
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
              key={e.institution}
              className={`eduEntry reveal ${e.ongoing ? 'eduOngoing' : 'eduCompleted'}`}
              data-reveal
              style={{ '--reveal-delay': `${160 + idx * 120}ms` }}
            >
              {/* Timeline node */}
              <div className={`eduNode ${e.ongoing ? 'eduNodeOngoing' : 'eduNodeCompleted'}`} />

              {/* Date column */}
              <div className="eduDate mono">
                {e.date}
                {e.ongoing && <span className="eduPulseDot" />}
              </div>

              {/* Content column */}
              <div className="eduContent">
                <div className={`eduInstitution ${!e.ongoing ? 'eduSweep' : ''}`}>
                  <h3 className="eduSchool">{e.institution}</h3>
                  {e.ongoing && <span className="eduOngoingBadge mono">Ongoing</span>}
                </div>
                <div className="eduLocation">{e.location}</div>
                <div className="eduDegree">{e.degree}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
