export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-inner">
        <div className="hero-copy">
          <h1>Microfyxd</h1>
          <p>Operator-grade AI systems that think, adapt, and execute.</p>
          <button className="hero-cta">Start building</button>
        </div>

        <div className="hero-visual">
          <div className="hero-core-bg" />
          <img
            src="/hero-core.png"
            alt="AI Core"
            className="hero-core-img"
          />
        </div>
      </div>
    </section>
  );
}
