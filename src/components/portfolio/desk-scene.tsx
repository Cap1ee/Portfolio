'use client';

import { Suspense, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const Scene = dynamic(() => import('./scene'), { ssr: false });

export default function DeskScene() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 720);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <section className="relative w-full overflow-hidden">
      <div style={{ height: '65vh', minHeight: 380 }}>
        <Suspense
          fallback={
            <div
              className="flex items-center justify-center w-full h-full"
              style={{ color: 'var(--p-text-dim)', fontFamily: 'var(--font-geist-mono)' }}
            >
              Loading scene…
            </div>
          }
        >
          <Scene isMobile={isMobile} />
        </Suspense>
      </div>
      <p
        className="eyebrow"
        style={{
          textAlign: 'center',
          color: 'var(--p-text-dim)',
          opacity: 0.7,
          padding: '1.25rem 0',
        }}
      >
        Click an object on the desk to explore ↑
      </p>
    </section>
  );
}
