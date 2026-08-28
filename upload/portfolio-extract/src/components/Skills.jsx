// NOTE for Lishan: I drafted this list from what's actually evidenced in your
// Smart Parking work (Python, SQL, Git, Linux, Flask). Add/remove anything
// that isn't accurate — don't leave skills here you can't speak to in an interview.
const groups = [
  {
    label: 'Languages',
    items: ['Python', 'JavaScript', 'SQL', 'HTML/CSS'],
  },
  {
    label: 'Tools & platforms',
    items: ['Git & GitHub', 'Linux (Raspberry Pi OS)', 'Flask', 'SQLite'],
  },
  {
    label: 'Currently exploring',
    items: ['React', 'Three.js', 'Computer vision (YOLO/OpenCV)'],
  },
];

export default function Skills() {
  return (
    <section id="skills">
      <div className="container">
        <p className="eyebrow">Skills</p>
        <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', marginTop: '0.75rem', marginBottom: '2.5rem' }}>
          What I work with
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2rem' }}>
          {groups.map((g) => (
            <div key={g.label}>
              <p className="eyebrow" style={{ color: 'var(--text-dim)', marginBottom: '0.9rem' }}>{g.label}</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {g.items.map((item) => (
                  <li key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <span style={{ width: 6, height: 6, background: 'var(--trace-bright)', borderRadius: '50%', flexShrink: 0 }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
