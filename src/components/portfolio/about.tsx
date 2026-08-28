'use client';

export default function About() {
  return (
    <section id="about" className="portfolio-section">
      <div
        className="portfolio-container grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] gap-8 md:gap-16"
      >
        <div className="min-w-0">
          <p className="eyebrow">About</p>
          <h2
            className="font-semibold leading-[1.1] tracking-tight mt-3"
            style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', color: 'var(--p-text)' }}
          >
            Studying Computer Science,
            <br />
            building at the hardware edge.
          </h2>
        </div>
        <div
          className="flex flex-col gap-5 min-w-0 rounded-lg p-6 sm:p-10"
          style={{
            border: '1px solid var(--p-line)',
            background: 'var(--p-bg-raised)',
          }}
        >
          <p>
            I&apos;m a Computer Science / Software Engineering student who likes working
            where software meets physical systems — cameras, sensors, and the
            microcontrollers that tie them together. Most of my coursework and
            side projects sit at that intersection rather than purely in the browser.
          </p>
          <p>
            My biggest project so far is a Smart Parking System built with a
            university team, using a Raspberry Pi 4 for automatic number-plate
            recognition, servo-controlled gate access, and a live Flask
            dashboard. It was a group build — my own focus was the system&apos;s
            reliability layer: a heartbeat monitor for the recognition pipeline,
            and debugging the dashboard&apos;s live data and whitelist logic.
          </p>
          <p>
            I&apos;m still early in specializing, and genuinely curious about where
            that leads — deeper into embedded systems, full-stack web, or
            wherever the next project pulls me.
          </p>
        </div>
      </div>
    </section>
  );
}