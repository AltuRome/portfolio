import React, { useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import '../styles/components/Navbar.css';

const navItems = [
  { to: '/about', label: 'About' },
  { to: '/projects', label: 'Projects' },
  { to: '/certificates', label: 'Achievements' },
  { to: '/education', label: 'Education' },
];

export default function Navbar() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const activeTo = useMemo(() => {
    if (location.pathname === '/') return '/';
    const match = navItems.find((i) => i.to === location.pathname);
    return match?.to ?? '/';
  }, [location.pathname]);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`navbar ${scrolled ? 'isScrolled' : ''}`}>
      <div className="container navInner">
        <Link
          to="/"
          className="brand"
          aria-label="Altamash Amil home"
          onClick={() => setOpen(false)}
        >
          <span className="brandMark" aria-hidden="true">
            AA
          </span>
        </Link>

        <button
          className="hamburger"
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="hamburgerLines" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
        </button>

        <nav className={`navLinks ${open ? 'isOpen' : ''}`} aria-label="Sections">
          {navItems.map((item) => {
            const isActive = activeTo === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`navLink ${isActive ? 'isActive' : ''}`}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}

