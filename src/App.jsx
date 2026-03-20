import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Projects from './components/Projects.jsx';
import Certificates from './components/Certificates.jsx';
import Education from './components/Education.jsx';
import Footer from './components/Footer.jsx';

function PortfolioLayout() {
  return (
    <>
      <Navbar />
      <main className="page" aria-label="Portfolio content">
        <Hero />
        <About />
        <Projects />
        <Certificates />
        <Education />
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  const location = useLocation();

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const revealNodes = Array.from(document.querySelectorAll('[data-reveal]'));

    if (prefersReducedMotion) {
      revealNodes.forEach((n) => n.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '-10% 0px -10% 0px' },
    );

    revealNodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const pathToId = {
      '/': 'top',
      '/about': 'about',
      '/projects': 'projects',
      '/certificates': 'certificates',
      '/education': 'education',
    };

    const id = pathToId[location.pathname] ?? 'top';
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [location.pathname]);

  return (
    <Routes>
      <Route path="/" element={<PortfolioLayout />} />
      <Route path="/about" element={<PortfolioLayout />} />
      <Route path="/projects" element={<PortfolioLayout />} />
      <Route path="/certificates" element={<PortfolioLayout />} />
      <Route path="/education" element={<PortfolioLayout />} />
    </Routes>
  );
}

