'use client';

export default function Hero() {
  return (
    <header id="hero" className="portfolio-section" style={{ borderTop: 'none', paddingTop: '2rem' }}>
      <div className="portfolio-container">
        <div
          className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-10 lg:gap-16 items-center"
          style={{
            border: '1px solid var(--p-line)',
            borderRadius: 24,
            background: 'var(--p-bg-raised)',
            padding: 'clamp(2rem, 5vw, 3.5rem)',
          }}
        >
          <div>
            <p className="eyebrow mb-6">Computer Science — Web Development</p>
            <h1
              className="leading-[1.15] tracking-tight"
              style={{
                fontFamily: 'var(--font-heading), var(--font-geist-sans), sans-serif',
                fontSize: 'clamp(2.2rem, 5.5vw, 4rem)',
                color: 'var(--p-text)',
                textTransform: 'uppercase',
              }}
            >
              Lishan{' '}
              <span
                style={{
                  background: 'var(--p-trace-bright)',
                  color: '#0B1210',
                  padding: '0 0.15em',
                  boxDecorationBreak: 'clone',
                  WebkitBoxDecorationBreak: 'clone',
                }}
              >
                Chamod
              </span>
            </h1>
            <p
              className="mt-6"
              style={{
                maxWidth: 480,
                fontSize: '1.05rem',
                color: 'var(--p-text-dim)',
                lineHeight: 1.7,
              }}
            >
              I build systems that touch both hardware and the web — from
              embedded vision pipelines to the dashboards that monitor them.
            </p>
          </div>

          <div
            className="flex items-center justify-center"
            style={{
              aspectRatio: '1',
              width: '100%',
              maxWidth: 320,
              marginInline: 'auto',
              borderRadius: 20,
              background: 'var(--p-bg)',
              border: '1px solid var(--p-line)',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-heading), var(--font-geist-sans), sans-serif',
                fontSize: 'clamp(3rem, 8vw, 5rem)',
                color: 'var(--p-trace-bright)',
              }}
            >
              LC
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
