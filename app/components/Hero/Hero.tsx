"use client";
import "./Hero.css";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-overlay"></div>

      <div className="hero-inner">
        {/* SYSTEM STATUS */}
        <div className="hero-status">SYSTEM ONLINE</div>

        {/* MAIN CONTENT */}
        <div className="hero-content">
          <h1 className="hero-title">MICROFYXD IS NOW ONLINE</h1>

          <p className="hero-subtitle">
            Your autonomous AI operator — adaptive, intelligent, and ready to execute the moment you connect.
          </p>

          <div className="hero-ctas">
            <button className="hero-btn primary">&gt;&gt; INITIALIZE</button>
            <button className="hero-btn secondary">&gt;&gt; EXPLORE</button>
          </div>
        </div>

        {/* AI CORE */}
        <div className="hero-core-wrapper">
          <div className="hero-core">
            <div className="hero-core-glow"></div>

            <div className="hero-core-orbit hero-core-orbit-1">Adaptive</div>
            <div className="hero-core-orbit hero-core-orbit-2">Intelligent</div>
            <div className="hero-core-orbit hero-core-orbit-3">Precise</div>
            <div className="hero-core-orbit hero-core-orbit-4">Always Evolving</div>
          </div>
        </div>

        {/* METRICS */}
        <div className="hero-metrics">
          <div className="metric">
            <span className="metric-label">10K+</span>
            <span className="metric-desc">Commands Executed</span>
          </div>
          <div className="metric">
            <span className="metric-label">99.9%</span>
            <span className="metric-desc">System Uptime</span>
          </div>
          <div className="metric">
            <span className="metric-label">50ms</span>
            <span className="metric-desc">Response Latency</span>
          </div>
          <div className="metric">
            <span className="metric-label">24/7</span>
            <span className="metric-desc">Autonomous Support</span>
          </div>
        </div>

        {/* FOOTER */}
        <div className="hero-footer">
          <span className="hero-footer-text">READY FOR CONNECTION</span>
          <span className="hero-footer-line"></span>
        </div>
      </div>
    </section>
  );
}
