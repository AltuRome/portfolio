import React from 'react';

import '../styles/components/Footer.css';

function SocialIcon({ kind }) {
  const common = { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none' };

  if (kind === 'github') {
    return (
      <svg {...common} aria-hidden="true">
        <path
          d="M12 2C6.477 2 2 6.487 2 12.022c0 4.425 2.865 8.18 6.839 9.505.5.093.682-.218.682-.483 0-.237-.009-.868-.014-1.705-2.782.607-3.369-1.343-3.369-1.343-.454-1.159-1.11-1.468-1.11-1.468-.908-.62.069-.608.069-.608 1.004.071 1.532 1.05 1.532 1.05.892 1.53 2.341 1.088 2.91.832.091-.646.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.094.39-1.989 1.03-2.688-.103-.253-.447-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.56 9.56 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.748-1.026 2.748-1.026.546 1.378.202 2.397.099 2.65.64.699 1.029 1.594 1.029 2.688 0 3.847-2.339 4.695-4.566 4.943.36.312.679.92.679 1.854 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482 3.972-1.325 6.833-5.078 6.833-9.504C22 6.487 17.523 2 12 2Z"
          stroke="currentColor"
          strokeWidth="1.2"
        />
      </svg>
    );
  }

  if (kind === 'linkedin') {
    return (
      <svg {...common} aria-hidden="true">
        <path
          d="M6.94 6.5a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0Z"
          stroke="currentColor"
          strokeWidth="1.4"
        />
        <path d="M4.5 20V9H7v11H4.5Z" stroke="currentColor" strokeWidth="1.4" />
        <path
          d="M10 20V9h2.4v1.6h.04c.33-.63 1.14-1.77 2.58-1.77 2.01 0 3.01 1.32 3.01 4.07V20h-2.5v-6.09c0-1.45-.5-2.43-1.7-2.43-1.01 0-1.6.69-1.86 1.35-.08.2-.12.49-.12.77V20H10Z"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (kind === 'leetcode') {
    return (
      <svg {...common} aria-hidden="true">
        <path
          d="M7.2 20.3c.8-4 3.9-13.7 3.9-13.7l3.2 5.8 3.7-3"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9.7 9.7c-.8-.5-1.5-1.1-1.9-1.9"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <path
          d="M15.5 14.2c.7.6 1.2 1.3 1.4 2.1"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  return (
    <svg {...common} aria-hidden="true">
      <path
        d="M7 7l5-3 5 3v10l-5 3-5-3V7Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path
        d="M9.3 11.4h2.2l-2 3.2h2.2"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Footer() {
  const socialLinks = [
    { kind: 'github', href: 'https://github.com/AltuRome', label: 'GitHub' },
    { kind: 'linkedin', href: 'https://www.linkedin.com/in/aamil06/', label: 'LinkedIn' },
    { kind: 'leetcode', href: 'https://leetcode.com/u/chaffyy/', label: 'LeetCode' },
    { kind: 'codeforces', href: 'https://codeforces.com/profile/chafAL', label: 'Codeforces' },
  ];

  return (
    <footer className="footer">
      <div className="container">
        <hr className="sectionDivider footerDivider" />
        <div className="footerWatermark" aria-hidden="true">
          AA
        </div>
        <div className="footerInner">
          <div className="footerLeft">
            <div className="footerBuilt">Built by Altamash Amil</div>
            <div className="footerEmail">
              <span className="contactLabel mono">Email</span>
              <a className="underlineHover" href="mailto:altamashamilap@gmail.com">
                altamashamilap@gmail.com
              </a>
            </div>
          </div>

          <div className="footerSocial" aria-label="Social links">
            {socialLinks.map((l) => (
              <a
                key={l.href}
                className="footerSocialLink"
                href={l.href}
                target="_blank"
                rel="noreferrer"
                aria-label={l.label}
              >
                <span className="footerSocialIcon" aria-hidden="true">
                  <SocialIcon kind={l.kind} />
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

