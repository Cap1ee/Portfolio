'use client';

import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

const items = [
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
];

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function useScrolled() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return scrolled;
}

export default function Nav() {
  const scrolled = useScrolled();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[var(--p-bg)]/80 backdrop-blur-md border-b border-[var(--p-line)]'
          : 'bg-transparent'
      }`}
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1.25rem 2rem',
      }}
    >
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="eyebrow"
        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
      >
        LC
      </button>

      {/* Desktop links */}
      <div className="hidden sm:flex items-center gap-6">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollToId(item.id)}
            className="eyebrow transition-colors duration-200 hover:text-[var(--p-trace-bright)]"
            style={{ background: 'none', border: 'none', color: 'var(--p-text-dim)', padding: 0, cursor: 'pointer' }}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Mobile menu button */}
      <div className="flex sm:hidden items-center gap-3">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--p-text)' }}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="absolute top-full left-0 right-0 sm:hidden border-b border-[var(--p-line)]"
          style={{ background: 'var(--p-bg)', padding: '1rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}
        >
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => { scrollToId(item.id); setMenuOpen(false); }}
              className="eyebrow text-left"
              style={{ background: 'none', border: 'none', color: 'var(--p-text-dim)', padding: '0.5rem 0', cursor: 'pointer' }}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
