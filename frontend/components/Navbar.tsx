import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Experience', href: '#experience' },
  { name: 'Skills', href: '#skills' },
];

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 w-full z-50 flex justify-center pt-6 px-4 pointer-events-none">
      <div 
        className={`pointer-events-auto transition-all duration-500 flex items-center justify-between px-6 py-3 rounded-full border ${
          isScrolled 
            ? 'bg-zinc-900/70 backdrop-blur-xl border-white/10 shadow-lg shadow-black/50 w-full max-w-3xl' 
            : 'bg-transparent border-transparent w-full max-w-6xl'
        }`}
      >
        <a href="#" className="font-mono font-bold text-xl tracking-tighter text-zinc-100 hover:text-accent transition-colors">
          BV<span className="text-accent">.</span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className="text-sm font-medium text-zinc-400 hover:text-zinc-100 transition-colors"
            >
              {link.name}
            </a>
          ))}
          <a 
            href="#contact"
            className="px-4 py-2 rounded-full bg-white/5 text-zinc-100 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all text-sm font-medium"
          >
            Contact
          </a>
        </nav>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-zinc-400 hover:text-zinc-100"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Nav Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-zinc-950/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 pointer-events-auto">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-2xl font-medium text-zinc-400 hover:text-zinc-100 transition-colors"
            >
              {link.name}
            </a>
          ))}
          <a 
            href="#contact"
            onClick={() => setIsMobileMenuOpen(false)}
            className="mt-4 px-8 py-3 rounded-full bg-accent text-zinc-950 font-semibold transition-all"
          >
            Contact Me
          </a>
        </div>
      )}
    </header>
  );
};