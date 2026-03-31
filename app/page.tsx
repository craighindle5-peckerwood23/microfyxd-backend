import Hero from './components/Hero';
import Operator from './components/Operator';
import Creator from './components/Creator';
import '../styles/hero.css';
import '../styles/operator.css';
import '../styles/creator.css';
import '../styles/animations.css';

export default function HomePage() {
  return (
    <main className="site-root">
      <Hero />
      <Operator />
      <Creator />
    </main>
  );
}
