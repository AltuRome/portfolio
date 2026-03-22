import React from 'react';

import '../styles/components/Certificates.css';

const achievements = [
  {
    title: '1st place — Spin and Speak Extempore',
    platform: 'CPE, LPU',
    date: 'Sep 2025',
    highlight: true,
  },
  {
    title: '1st place — Group Discussion',
    platform: 'CPE, LPU',
    date: 'Dec 2025',
    highlight: true,
  },
  {
    title: 'Community Service Volunteer',
    platform: 'DV Singh Foundation',
    date: 'Jan–Feb 2025',
    highlight: false,
  },
];

const certificates = [
  {
    title: 'Fundamentals of Network Communication',
    platform: 'Coursera',
    date: 'Nov 2025',
  },
  {
    title: 'Peer-to-Peer Protocols and Local Area Networks',
    platform: 'Coursera',
    date: 'Nov 2025',
  },
  {
    title: 'TCP/IP and Advanced Topics',
    platform: 'Coursera',
    date: 'Nov 2025',
  },
  {
    title: 'Packet Switching Networks and Algorithms',
    platform: 'Coursera',
    date: 'Nov 2025',
  },
  {
    title: 'The Bits and Bytes of Computer Networking',
    platform: 'Coursera',
    date: 'Nov 2025',
  },
  {
    title: 'DBMS and MySQL Beginner to Advanced',
    platform: 'Udemy',
    date: 'Jun–Sep 2025',
  },
  {
    title: 'Mastering Data Structures & Algorithms using C and C++',
    platform: 'Udemy',
    date: 'Apr–Sep 2025',
  },
  {
    title: 'Java',
    platform: 'LPU',
    date: 'Jan–May 2025',
  },
  {
    title: 'C Language',
    platform: 'LPU',
    date: 'Jan–May 2024',
  },
  {
    title: 'DSA',
    platform: 'LPU',
    date: 'Aug–Dec 2024',
  },
];

function AchievementRow({ item, idx }) {
  return (
    <div
      className={`acRow reveal ${item.highlight ? 'acRowHighlight' : ''}`}
      data-reveal
      style={{ '--reveal-delay': `${160 + idx * 80}ms` }}
    >
      <div className="acRowLeft">
        {item.highlight && (
          <span className="acSpark" aria-hidden="true">✦</span>
        )}
        <div>
          <h3 className="acRowTitle">{item.title}</h3>
          <div className={`acRowPlatform mono ${item.highlight ? 'acRowPlatformAccent' : ''}`}>
            {item.platform}
          </div>
        </div>
      </div>
      {item.date && (
        <span className="acDateBadge mono">{item.date}</span>
      )}
    </div>
  );
}

function CertificateRow({ item, idx }) {
  return (
    <div
      className="acRow reveal"
      data-reveal
      style={{ '--reveal-delay': `${160 + idx * 80}ms` }}
    >
      <div className="acRowLeft">
        <div>
          <h3 className="acRowTitle">{item.title}</h3>
          <div className="acRowPlatform mono">{item.platform}</div>
        </div>
      </div>
      {item.date && (
        <span className="acDateBadge mono">{item.date}</span>
      )}
    </div>
  );
}

export default function Certificates() {
  return (
    <section id="certificates" className="certificates section">
      <div className="container">

        {/* ── Achievements subsection ──────────────── */}
        <div className="acSubsection acAchievements">
          <h2 className="sectionTitle reveal" data-reveal style={{ '--reveal-delay': '60ms' }}>
            Achievements
          </h2>
          <div className="acList">
            {achievements.map((a, i) => (
              <AchievementRow key={a.title} item={a} idx={i} />
            ))}
          </div>
        </div>

        {/* ── Chapter break divider ──────────────── */}
        <div className="acChapterBreak" aria-hidden="true">
          <hr className="acChapterLine" />
          <span className="acChapterStar">✦</span>
        </div>

        {/* ── Certificates subsection ─────────────── */}
        <div className="acSubsection acCerts">
          <h2 className="sectionTitle reveal" data-reveal style={{ '--reveal-delay': '60ms' }}>
            Certificates
          </h2>
          <div className="acList">
            {certificates.map((c, i) => (
              <CertificateRow key={c.title} item={c} idx={i} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
