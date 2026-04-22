import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from './ThemeContext.tsx';
import { Magnetic } from './Magnetic.tsx';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Magnetic>
      <button
        onClick={toggleTheme}
        className="fixed top-6 right-6 z-50 p-3 rounded-full bg-zinc-900/80 backdrop-blur-md border border-white/10 text-zinc-400 hover:text-accent hover:border-accent/50 hover:bg-accent/10 transition-all duration-300 shadow-lg hover:shadow-accent/20"
        aria-label="Toggle theme"
      >
        {theme === 'dark' ? (
          <Sun className="w-5 h-5" />
        ) : (
          <Moon className="w-5 h-5" />
        )}
      </button>
    </Magnetic>
  );
};