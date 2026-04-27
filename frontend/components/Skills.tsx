import React from 'react';
import { portfolioData } from '../data.ts';
import { Reveal } from './Reveal.tsx';

export const Skills: React.FC = () => {
  const allSkills = portfolioData.skills.flatMap(s => s.items);
  const row1 = allSkills.slice(0, Math.ceil(allSkills.length / 2));
  const row2 = allSkills.slice(Math.ceil(allSkills.length / 2));

  const MarqueeRow = ({ items, reverse = false }: { items: string[], reverse?: boolean }) => (
    <div className="marquee-container flex overflow-hidden whitespace-nowrap w-full relative py-4">
      <div className={`flex gap-4 w-max ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'}`}>
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex gap-4">
            {items.map((item, j) => (
              <div key={`${i}-${j}`} className="px-6 py-3 text-lg font-mono rounded-full bg-zinc-900/50 border border-white/5 text-zinc-400 hover:text-accent hover:border-accent/50 hover:bg-accent/10 hover:shadow-[0_0_20px_rgba(16,185,129,0.2)] transition-all duration-300 cursor-default whitespace-nowrap">
                {item}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <section id="skills" className="py-32 bg-zinc-900/20 border-y border-white/5 relative overflow-hidden">
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-zinc-950 to-transparent z-10 pointer-events-none"></div>
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-zinc-950 to-transparent z-10 pointer-events-none"></div>
      <div className="max-w-6xl mx-auto px-6 relative z-20 mb-16">
        <Reveal>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-zinc-100 flex items-center gap-4">
            Tech Stack<span className="text-accent">.</span>
            <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent ml-4"></div>
          </h2>
        </Reveal>
      </div>
      <div className="flex flex-col gap-4 transform -rotate-2 scale-105">
        <MarqueeRow items={row1} />
        <MarqueeRow items={row2} reverse={true} />
      </div>
      <div className="max-w-5xl mx-auto px-6 mt-20 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {portfolioData.skills.map((cat, i) => (
            <Reveal key={i} delay={i * 80}>
              <div className="group text-center p-4 rounded-xl bg-zinc-900/30 border border-white/5 hover:border-accent/20 transition-all duration-300 hover:bg-accent/5">
                <div className="text-2xl mb-2 group-hover:scale-110 transition-transform duration-300">{cat.icon}</div>
                <p className="text-xs font-mono text-zinc-500 group-hover:text-zinc-300 transition-colors">{cat.category}</p>
                <p className="text-[10px] text-zinc-600 mt-1 font-mono">{cat.items.length} skills</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};