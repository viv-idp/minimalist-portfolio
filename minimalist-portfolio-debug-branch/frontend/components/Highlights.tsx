import React from 'react';
import { portfolioData } from '../data.ts';
import { Reveal } from './Reveal.tsx';

export const Highlights: React.FC = () => {
  return (
    <section id="highlights" className="py-32 px-6">
      <div className="max-w-4xl mx-auto">
        
        <Reveal>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-zinc-100 mb-20 flex items-center gap-4">
            Key Achievements<span className="text-accent">.</span>
            <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent ml-4"></div>
          </h2>
        </Reveal>

        <div className="space-y-6">
          {portfolioData.highlights.map((highlight, index) => (
            <Reveal key={index} delay={index * 100}>
              <div className="group flex items-start gap-4 p-4 -mx-4 rounded-xl hover:bg-zinc-900/50 transition-colors">
                <span className="text-accent font-mono text-sm mt-1 opacity-50 group-hover:opacity-100 transition-opacity">
                  {(index + 1).toString().padStart(2, '0')}
                </span>
                <p className="text-zinc-400 text-sm leading-relaxed group-hover:text-zinc-300 transition-colors">
                  {highlight}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
};