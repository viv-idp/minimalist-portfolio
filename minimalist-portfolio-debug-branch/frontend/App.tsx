import React, { useState, useEffect, useCallback } from 'react';
import { Navbar } from './components/Navbar.tsx';
import { Hero } from './components/Hero.tsx';
import { Skills } from './components/Skills.tsx';
import { Experience } from './components/Experience.tsx';
import { Projects } from './components/Projects.tsx';
import { Highlights } from './components/Highlights.tsx';
import { Certifications } from './components/Certifications.tsx';
import { Contact } from './components/Contact.tsx';
import { Footer } from './components/Footer.tsx';
import { Cursor } from './components/Cursor.tsx';
import { Loader } from './components/Loader.tsx';
import { ParticleBackground } from './components/ParticleBackground.tsx';
import { ScrollProgress } from './components/ScrollProgress.tsx';
import { ArrowUp } from 'lucide-react';

const BackToTop: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={`back-to-top ${visible ? 'visible' : ''}`}
      aria-label="Back to top"
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
};

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  const handleLoaderComplete = useCallback(() => {
    setLoading(false);
  }, []);

  return (
    <>
      {/* Cursor is ALWAYS rendered — never unmounted during loader/content transition */}
      <Cursor />

      {loading ? (
        <Loader onComplete={handleLoaderComplete} />
      ) : (
        <div className="min-h-screen font-sans content-enter">
          <ParticleBackground />
          <ScrollProgress />
          <Navbar />
          <BackToTop />
          
          <main>
            <Hero />
            <Experience />
            <Skills />
            <Projects />
            <Highlights />
            <Certifications />
            <Contact />
          </main>

          <Footer />
        </div>
      )}
    </>
  );
};

export default App;