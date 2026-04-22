import React from 'react';
import { portfolioData } from '../data.ts';
import { Reveal } from './Reveal.tsx';
import { LinkedinIcon, GithubIcon } from './Icons.tsx';
import { Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  const { personal } = portfolioData;
  
  return (
    <footer id="contact" className="py-20 border-t border-white/5 relative overflow-hidden">
      {/* Subtle bottom glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent blur-sm"></div>
      
      <div className="max-w-5xl mx-auto px-6 flex flex-col items-center text-center">
        <Reveal>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-zinc-100 mb-6">
            Let's Connect
          </h2>
        </Reveal>
        
        <Reveal delay={100}>
          <p className="text-zinc-400 max-w-md mb-10 text-sm md:text-base">
            I'm currently looking for new opportunities. My inbox is always open for discussions regarding DevOps, Cloud, or just to say hi.
          </p>
        </Reveal>
        
        <Reveal delay={200}>
          <a 
            href={`mailto:${personal.email}`}
            className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-zinc-100 text-zinc-950 font-semibold hover:bg-accent hover:text-zinc-950 transition-all duration-300 mb-16"
          >
            Say Hello
          </a>
        </Reveal>

        <Reveal delay={300}>
          <div className="flex items-center gap-8 mb-12">
            <a href={`https://${personal.linkedin}`} target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-zinc-100 transition-colors">
              <LinkedinIcon className="w-5 h-5" />
              <span className="sr-only">LinkedIn</span>
            </a>
            <a href={`mailto:${personal.email}`} className="text-zinc-500 hover:text-zinc-100 transition-colors">
              <Mail className="w-5 h-5" />
              <span className="sr-only">Email</span>
            </a>
            <a href="#" className="text-zinc-500 hover:text-zinc-100 transition-colors">
              <GithubIcon className="w-5 h-5" />
              <span className="sr-only">GitHub</span>
            </a>
          </div>
        </Reveal>
        
        <Reveal delay={400}>
          <p className="text-zinc-600 text-xs font-mono">
            Designed & Built by {personal.name} <br className="md:hidden" />
            <span className="hidden md:inline"> • </span> 
            &copy; {new Date().getFullYear()}
          </p>
        </Reveal>
      </div>
    </footer>
  );
};