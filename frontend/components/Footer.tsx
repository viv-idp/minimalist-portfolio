import React from 'react';
import { portfolioData } from '../data.ts';
import { Reveal } from './Reveal.tsx';
import { LinkedinIcon, GithubIcon } from './Icons.tsx';
import { Mail, Heart, Code2 } from 'lucide-react';

export const Footer: React.FC = () => {
  const { personal } = portfolioData;
  
  const techStack = ['React', 'TypeScript', 'Tailwind CSS', 'Vite'];

  return (
    <footer className="py-20 border-t border-white/5 relative overflow-hidden">
      {/* Animated gradient divider */}
      <div className="absolute top-0 left-0 right-0 section-divider"></div>
      
      {/* Subtle bottom glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent blur-sm"></div>
      
      <div className="max-w-5xl mx-auto px-6 flex flex-col items-center text-center">
        <Reveal>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-zinc-100 mb-6">
            Let's Build Together
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
            className="group inline-flex items-center justify-center px-8 py-4 rounded-full bg-zinc-100 text-zinc-950 font-semibold hover:bg-accent hover:text-zinc-950 transition-all duration-300 mb-16 hover:scale-105 hover:shadow-[0_0_30px_rgba(16,185,129,0.3)]"
          >
            Say Hello
            <Mail className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </a>
        </Reveal>

        <Reveal delay={300}>
          <div className="flex items-center gap-8 mb-12">
            <a href={`https://${personal.linkedin}`} target="_blank" rel="noopener noreferrer" className="group text-zinc-500 hover:text-zinc-100 transition-colors p-2 rounded-full hover:bg-white/5">
              <LinkedinIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="sr-only">LinkedIn</span>
            </a>
            <a href={`mailto:${personal.email}`} className="group text-zinc-500 hover:text-zinc-100 transition-colors p-2 rounded-full hover:bg-white/5">
              <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="sr-only">Email</span>
            </a>
            <a href={`https://${personal.github}`} target="_blank" rel="noopener noreferrer" className="group text-zinc-500 hover:text-zinc-100 transition-colors p-2 rounded-full hover:bg-white/5">
              <GithubIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="sr-only">GitHub</span>
            </a>
          </div>
        </Reveal>

        {/* Built with badges */}
        <Reveal delay={400}>
          <div className="flex items-center gap-2 mb-8 flex-wrap justify-center">
            <span className="text-zinc-600 text-xs font-mono flex items-center gap-1">
              <Code2 className="w-3 h-3" /> Built with
            </span>
            {techStack.map((tech) => (
              <span key={tech} className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-zinc-900/50 border border-white/5 text-zinc-500 hover:text-accent hover:border-accent/30 transition-all">
                {tech}
              </span>
            ))}
          </div>
        </Reveal>
        
        <Reveal delay={500}>
          <p className="text-zinc-600 text-xs font-mono flex items-center gap-1 flex-wrap justify-center">
            Designed & Built with <Heart className="w-3 h-3 text-red-500/50" /> by {personal.name}
            <span className="hidden md:inline"> • </span>
            <br className="md:hidden" />
            &copy; {new Date().getFullYear()}
          </p>
        </Reveal>
      </div>
    </footer>
  );
};