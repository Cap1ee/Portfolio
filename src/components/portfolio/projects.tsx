'use client';

const stack = ['Raspberry Pi 4', 'YOLO11n (NCNN)', 'EasyOCR', 'Flask', 'SQLite', 'Cloudflare Tunnel'];

export default function Projects() {
  return (
    <section id="projects" className="portfolio-section">
      <div className="portfolio-container">
        <p className="eyebrow">Projects</p>
        <h2
          className="font-semibold leading-[1.1] tracking-tight mt-3 mb-14"
          style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', color: 'var(--p-text)' }}
        >
          Featured build
        </h2>

        <div
          className="rounded-lg p-8 sm:p-12 transition-colors duration-300"
          style={{
            border: '1px solid var(--p-line)',
            background: 'var(--p-bg-raised)',
          }}
        >
          <div className="flex justify-between flex-wrap gap-4 mb-8">
            <h3 className="text-xl font-semibold" style={{ color: 'var(--p-text)' }}>
              Smart Parking System
            </h3>
            <span className="eyebrow" style={{ color: 'var(--p-text-dim)' }}>
              Team project — KDU University
            </span>
          </div>

          <p className="mb-8" style={{ maxWidth: 680 }}>
            An automated parking system for university faculty and staff.
            A Raspberry Pi 4 with a camera module watches the entry gate,
            detects and reads number plates with a fine-tuned YOLO11n model
            and EasyOCR, then checks the plate against a whitelist database
            before opening a servo-controlled barrier and assigning a parking
            slot by faculty zone. A live web dashboard tracks slot occupancy,
            entry logs, and system health, deployed publicly via a Cloudflare
            Tunnel on a custom domain.
          </p>

          <div
            className="mb-8 pl-5"
            style={{
              borderLeft: '2px solid var(--p-solder)',
              maxWidth: 680,
            }}
          >
            <p className="eyebrow mb-3" style={{ color: 'var(--p-solder)' }}>
              My contribution
            </p>
            <p>
              This was a group build. I was responsible for{' '}
              <strong style={{ color: 'var(--p-text)' }}>
                - Training and improving the YOLOv11n model
              </strong>{' '}
              to raise ANPR detection accuracy — and for
              finding and fixing three production bugs in the Flask dashboard
              (a database constraint mismatch, a SQLite locking issue under
              concurrent writes, and a misleading error response on invalid
              whitelist input).
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {stack.map((s) => (
              <span
                key={s}
                className="eyebrow rounded"
                style={{
                  border: '1px solid var(--p-line)',
                  padding: '0.4rem 0.75rem',
                  color: 'var(--p-trace-bright)',
                }}
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        <p className="mt-8" style={{ fontSize: '0.9rem', color: 'var(--p-text-dim)' }}>
          More projects coming soon.
        </p>
      </div>
    </section>
  );
}