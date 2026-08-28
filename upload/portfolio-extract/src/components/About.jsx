export default function About() {
  return (
    <section id="about">
      <div className="container" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1.4fr)', gap: '3rem' }}>
        <div>
          <p className="eyebrow">About</p>
          <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', marginTop: '0.75rem' }}>
            Studying Computer Science,<br />building at the hardware edge.
          </h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
          <p>
            I'm a Computer Science / Software Engineering student who likes working
            where software meets physical systems — cameras, sensors, and the
            microcontrollers that tie them together. Most of my coursework and
            side projects sit at that intersection rather than purely in the browser.
          </p>
          <p>
            My biggest project so far is a Smart Parking System built with a
            university team, using a Raspberry Pi 4 for automatic number-plate
            recognition, servo-controlled gate access, and a live Flask
            dashboard. It was a group build — my own focus was the system's
            reliability layer: a heartbeat monitor for the recognition pipeline,
            and debugging the dashboard's live data and whitelist logic.
          </p>
          <p>
            I'm still early in specializing, and genuinely curious about where
            that leads — deeper into embedded systems, full-stack web, or
            wherever the next project pulls me.
          </p>
        </div>
      </div>
    </section>
  );
}
