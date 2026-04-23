import React, { useState } from 'react';
import { Navbar } from './components/Navbar.tsx';
import { Hero } from './components/Hero.tsx';
import { Skills } from './components/Skills.tsx';
import { Experience } from './components/Experience.tsx';
import { Projects } from './components/Projects.tsx';
import { Stats } from './components/Stats.tsx';
import { Highlights } from './components/Highlights.tsx';
import { Footer } from './components/Footer.tsx';
import { Cursor } from './components/Cursor.tsx';
import { Loader } from './components/Loader.tsx';
import { ThemeProvider } from './components/ThemeContext.tsx';
import { ThemeToggle } from './components/ThemeToggle.tsx';
import { ParticleBackground } from './components/ParticleBackground.tsx';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  return (
    <ThemeProvider>
      <div className="min-h-screen font-sans animate-[fadeIn_1s_ease-out]">
        <Cursor />
        <ThemeToggle />
        <ParticleBackground />

        {loading ? (
          <Loader onComplete={() => setLoading(false)} />
        ) : (
          <>
            <Navbar />

            <main>
              <Hero />
              <Stats />
              <Experience />
              <Skills />
              <Projects />
              <Highlights />
            </main>

            <Footer />
          </>
        )}
      </div>
    </ThemeProvider>
  );
};

export default App;