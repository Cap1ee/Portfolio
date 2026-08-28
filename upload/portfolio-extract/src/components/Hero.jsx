import { Suspense, useEffect, useState } from 'react';
import Scene from './Scene';

export default function Hero() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 720);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <header style={{ position: 'relative', height: '100vh', minHeight: 560, overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0 }}>
        <Suspense fallback={<div style={{ color: 'var(--text-dim)', padding: '2rem', fontFamily: 'var(--font-mono)' }}>Loading scene…</div>}>
          <Scene isMobile={isMobile} />
        </Suspense>
      </div>

      <div
        className="container"
        style={{
          position: 'relative',
          zIndex: 2,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          paddingBottom: '4.5rem',
          pointerEvents: 'none',
        }}
      >
        <p className="eyebrow" style={{ marginBottom: '0.75rem' }}>Computer Science — Web Development</p>
        <h1 style={{ fontSize: 'clamp(2.2rem, 6vw, 4.2rem)', maxWidth: 720 }}>
          Lishan Chamod
        </h1>
        <p style={{ marginTop: '1rem', maxWidth: 480, fontSize: '1.05rem', color: 'var(--text-dim)' }}>
          I build systems that touch both hardware and the web — from
          embedded vision pipelines to the dashboards that monitor them.
        </p>
        <p className="eyebrow" style={{ marginTop: '2rem', color: 'var(--text-dim)', opacity: 0.7 }}>
          Click an object on the desk to explore ↑
        </p>
      </div>
    </header>
  );
}
