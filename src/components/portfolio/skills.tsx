'use client';

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
    <section id="skills" className="portfolio-section">
      <div className="portfolio-container">
        <p className="eyebrow">Skills</p>
        <h2
          className="font-semibold leading-[1.1] tracking-tight mt-3 mb-14"
          style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', color: 'var(--p-text)' }}
        >
          What I work with
        </h2>

        <div
          className="grid gap-12"
          style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}
        >
          {groups.map((g) => (
            <div key={g.label}>
              <p className="eyebrow mb-5" style={{ color: 'var(--p-text-dim)' }}>
                {g.label}
              </p>
              <ul className="flex flex-col gap-3.5" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {g.items.map((item) => (
                  <li key={item} className="flex items-center gap-2.5">
                    <span
                      className="shrink-0 rounded-full"
                      style={{
                        width: 6,
                        height: 6,
                        background: 'var(--p-trace-bright)',
                      }}
                    />
                    <span style={{ color: 'var(--p-text-dim)' }}>{item}</span>
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
