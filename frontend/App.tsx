import React, { useState } from 'react';
import { Navbar } from './components/Navbar.tsx';
import { Hero } from './components/Hero.tsx';
import { Skills } from './components/Skills.tsx';
import { Experience } from './components/Experience.tsx';
import { Highlights } from './components/Highlights.tsx';
import { Footer } from './components/Footer.tsx';
import { Cursor } from './components/Cursor.tsx';
import { Loader } from './components/Loader.tsx';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading ? (
        <Loader onComplete={() => setLoading(false)} />
      ) : (
        <div className="min-h-screen font-sans animate-[fadeIn_1s_ease-out]">
          <Cursor />
          <Navbar />
          
          <main>
            <Hero />
            <Experience />
            <Skills />
            <Highlights />
          </main>

          <Footer />
        </div>
      )}
    </>
  );
};

export default App;