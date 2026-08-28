const links = [
  { label: 'Email', value: 'lishankithulgoda@gmail.com', href: 'mailto:lishankithulgoda@gmail.com' },
  { label: 'GitHub', value: 'github.com/Cap1ee', href: 'https://github.com/Cap1ee' },
  { label: 'LinkedIn', value: 'linkedin.com/in/lishan-chamod', href: 'https://www.linkedin.com/in/lishan-chamod-345a64235/' },
];

export default function Contact() {
  return (
    <section id="contact">
      <div className="container">
        <p className="eyebrow">Contact</p>
        <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', marginTop: '0.75rem', marginBottom: '2.5rem', maxWidth: 520 }}>
          Open to internships, collaborations, and interesting problems.
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: 480 }}>
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target={l.href.startsWith('http') ? '_blank' : undefined}
              rel={l.href.startsWith('http') ? 'noreferrer' : undefined}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '1rem 1.25rem',
                border: '1px solid var(--line)',
                borderRadius: '6px',
                transition: 'border-color 0.15s, background 0.15s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--solder)'; e.currentTarget.style.background = 'var(--bg-raised)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--line)'; e.currentTarget.style.background = 'transparent'; }}
            >
              <span className="eyebrow" style={{ color: 'var(--text-dim)' }}>{l.label}</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem' }}>{l.value}</span>
            </a>
          ))}
        </div>

        <p style={{ marginTop: '3rem', fontSize: '0.8rem', fontFamily: 'var(--font-mono)' }}>
          © {new Date().getFullYear()} Lishan Chamod
        </p>
      </div>
    </section>
  );
}
