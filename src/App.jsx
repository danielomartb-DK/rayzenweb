import ParticleBackground from './components/ParticleBackground';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Roadmap from './components/Roadmap';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import BackgroundMusic from './components/BackgroundMusic';

export default function App() {
  return (
    <div className="relative min-h-screen" style={{ background: '#0a0a1a' }}>
      <CustomCursor />
      <BackgroundMusic />
      <ParticleBackground />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <Features />
        <Roadmap />
        <Footer />
      </main>
    </div>
  );
}
