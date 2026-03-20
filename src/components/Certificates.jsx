import React from 'react';

import '../styles/components/Certificates.css';

const certificates = [
  {
    name: '1st place — Spin and Speak Extempore (CPE, LPU)',
    date: 'Sep 2025',
    highlight: true,
  },
  {
    name: 'Fundamentals of Network Communication',
    date: 'Coursera',
    highlight: false,
  },
  {
    name: 'Peer-to-Peer Protocols and Local Area Networks',
    date: 'Coursera',
  },
  {
    name: 'TCP/IP and Advanced Topics',
    date: 'Coursera',
  },
  {
    name: 'Packet Switching Networks and Algorithms',
    date: 'Coursera',
  },
  {
    name: 'The Bits and Bytes of Computer Networking',
    date: 'Coursera',
  },
  {
    name: 'DBMS and MySQL Beginner to Advanced',
    date: 'Udemy',
  },
  {
    name: 'Mastering Data Structures & Algorithms using C and C++',
    date: 'Udemy',
  },
  {
    name: 'Community Service Volunteer — DV Singh Foundation',
    date: 'Jan–Feb 2025',
  },
];

function extractYear(dateText) {
  const match = String(dateText).match(/(19|20)\d{2}/);
  return match ? match[0] : '';
}

export default function Certificates() {
  return (
    <section id="certificates" className="certificates section">
      <div className="container">
        <div className="certHead">
          <div className="kicker reveal" data-reveal style={{ '--reveal-delay': '60ms' }}>
            ACHIEVEMENTS
          </div>
          <h2 className="sectionTitle reveal" data-reveal style={{ '--reveal-delay': '120ms' }}>
            Achievements & Certificates
          </h2>
          <hr className="sectionDivider" />
        </div>

        <div className="certGrid">
          {certificates.map((c, idx) => {
            const year = extractYear(c.date);
            const yearLabel = year || 'CERT';
            return (
              <article
                key={c.name}
                className={`certCard reveal ${c.highlight ? 'highlight' : ''}`}
                data-reveal
                style={{ '--reveal-delay': `${160 + idx * 100}ms` }}
              >
                <div className="certYearWrap" aria-hidden="true">
                  <span className={`yearBadge ${year ? '' : 'yearBadgeEmpty'}`}>{yearLabel}</span>
                </div>
                {c.highlight ? (
                  <div className="certSpark" aria-hidden="true">
                    ✦
                  </div>
                ) : null}
                <h3 className="certTitle">{c.name}</h3>
                <div className="certMeta mono">{c.date}</div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

