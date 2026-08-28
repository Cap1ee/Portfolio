const stack = ['Raspberry Pi 4', 'YOLO11n (NCNN)', 'EasyOCR', 'Flask', 'SQLite', 'Cloudflare Tunnel'];

export default function Projects() {
  return (
    <section id="projects">
      <div className="container">
        <p className="eyebrow">Projects</p>
        <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', marginTop: '0.75rem', marginBottom: '2.5rem' }}>
          Featured build
        </h2>

        <div style={{
          border: '1px solid var(--line)',
          borderRadius: '8px',
          padding: 'clamp(1.5rem, 4vw, 2.5rem)',
          background: 'var(--bg-raised)',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.4rem' }}>Smart Parking System</h3>
            <span className="eyebrow" style={{ color: 'var(--text-dim)' }}>Team project — KDU University</span>
          </div>

          <p style={{ maxWidth: 680, marginBottom: '1.5rem' }}>
            An automated parking system for university faculty and staff.
            A Raspberry Pi 4 with a camera module watches the entry gate,
            detects and reads number plates with a fine-tuned YOLO11n model
            and EasyOCR, then checks the plate against a whitelist database
            before opening a servo-controlled barrier and assigning a parking
            slot by faculty zone. A live web dashboard tracks slot occupancy,
            entry logs, and system health, deployed publicly via a Cloudflare
            Tunnel on a custom domain.
          </p>

          <div style={{
            borderLeft: `2px solid var(--solder)`,
            paddingLeft: '1rem',
            marginBottom: '1.5rem',
            maxWidth: 680,
          }}>
            <p className="eyebrow" style={{ color: 'var(--solder)', marginBottom: '0.5rem' }}>My contribution</p>
            <p>
              This was a group build. I was responsible for the ANPR
              pipeline's <strong style={{ color: 'var(--text)' }}>heartbeat monitoring system</strong> —
              reporting live online/offline state to the dashboard — and for
              finding and fixing three production bugs in the Flask dashboard
              (a database constraint mismatch, a SQLite locking issue under
              concurrent writes, and a misleading error response on invalid
              whitelist input).
            </p>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {stack.map((s) => (
              <span key={s} className="eyebrow" style={{
                border: '1px solid var(--line)',
                borderRadius: '4px',
                padding: '0.3rem 0.6rem',
                color: 'var(--trace-bright)',
              }}>
                {s}
              </span>
            ))}
          </div>
        </div>

        <p style={{ marginTop: '1.5rem', fontSize: '0.9rem' }}>
          More projects coming soon.
        </p>
      </div>
    </section>
  );
}
