export default function Operator() {
  return (
    <section className="operator">
      <div className="operator-inner">
        <div className="operator-visual">
          <div className="operator-scanlines" />
          <img
            src="/operator-head.png"
            alt="Microfyxd Operator"
            className="operator-head-img"
          />
        </div>

        <div className="operator-copy">
          <h2>Meet your operator</h2>
          <p>
            A holographic AI assistant tuned for precision, context, and
            execution. Built to understand your systems, not just your prompts.
          </p>
          <ul>
            <li>Real-time reasoning</li>
            <li>Adaptive memory</li>
            <li>Operator-grade workflows</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
