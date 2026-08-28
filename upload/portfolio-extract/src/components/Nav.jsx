const items = [
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
];

function scrollToId(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export default function Nav() {
  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 10,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1.25rem 1.5rem',
      pointerEvents: 'none',
    }}>
      <span className="eyebrow" style={{ pointerEvents: 'auto' }}>LC</span>
      <div style={{ display: 'flex', gap: '1.5rem', pointerEvents: 'auto' }}>
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollToId(item.id)}
            className="eyebrow"
            style={{ background: 'none', border: 'none', color: 'var(--text-dim)', padding: 0 }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-dim)')}
          >
            {item.label}
          </button>
        ))}
      </div>
    </nav>
  );
}
