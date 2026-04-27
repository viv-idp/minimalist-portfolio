import React, { useEffect, useRef, useState } from 'react';
import { portfolioData } from '../data.ts';
import { Reveal } from './Reveal.tsx';
import { Tilt } from './Tilt.tsx';
import { Calendar } from 'lucide-react';

export const Experience: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalScrollable = rect.height + windowHeight;
      const scrolled = windowHeight - rect.top;
      let progress = scrolled / totalScrollable;
      progress = Math.max(0, Math.min(1, progress));
      setScrollProgress(progress * 1.5);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="py-32 px-6 relative">
      <div className="max-w-4xl mx-auto">
        <Reveal>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-zinc-100 mb-20 flex items-center gap-4">
            Experience<span className="text-accent">.</span>
            <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent ml-4"></div>
          </h2>
        </Reveal>

        <div className="space-y-16 relative">
          {/* Desktop Timeline Line */}
          <div className="hidden md:block absolute left-[24.5%] top-8 bottom-0 w-px bg-zinc-800/50 overflow-hidden">
            <div
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-accent via-emerald-400 to-transparent transition-transform duration-100 ease-out"
              style={{ height: '100%', transform: `translateY(${scrollProgress * 100 - 100}%)` }}
            ></div>
          </div>

          {/* Mobile Timeline Line */}
          <div className="md:hidden absolute left-4 top-8 bottom-0 w-px bg-zinc-800/50 overflow-hidden">
            <div
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-accent via-emerald-400 to-transparent transition-transform duration-100 ease-out"
              style={{ height: '100%', transform: `translateY(${scrollProgress * 100 - 100}%)` }}
            ></div>
          </div>

          {portfolioData.experience.map((job, index) => (
            <Reveal key={index} delay={index * 100}>
              <div className="group relative grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-4 md:gap-8 items-baseline pl-10 md:pl-0">
                {/* Period & Company */}
                <div className="text-left md:text-right md:pr-8 relative">
                  {/* Desktop Timeline Dot */}
                  <div className="hidden md:block absolute right-[-5px] top-2 w-2.5 h-2.5 rounded-full bg-zinc-800 border border-zinc-600 group-hover:bg-accent group-hover:border-accent group-hover:shadow-[0_0_10px_rgba(16,185,129,0.5)] transition-all duration-300 z-10 ring-4 ring-zinc-950"></div>
                  {/* Mobile Timeline Dot */}
                  <div className="md:hidden absolute -left-10 top-2 w-2.5 h-2.5 rounded-full bg-zinc-800 border border-zinc-600 group-hover:bg-accent group-hover:border-accent group-hover:shadow-[0_0_10px_rgba(16,185,129,0.5)] transition-all duration-300 z-10 ring-4 ring-zinc-950"></div>

                  <div className="inline-flex items-center gap-2 text-sm font-mono text-accent mb-1">
                    <Calendar className="w-3 h-3 md:hidden" />
                    {job.period}
                  </div>
                  <p className="text-base font-medium text-zinc-300">{job.company}</p>
                </div>

                {/* Content Card */}
                <Tilt>
                  <div className="glow-card bg-zinc-900/40 backdrop-blur-sm rounded-2xl p-6 md:p-8 transition-shadow duration-500 hover:shadow-2xl hover:shadow-accent/10">
                    <h3 className="text-xl font-bold text-zinc-100 mb-4">{job.title}</h3>
                    <ul className="space-y-3">
                      {job.responsibilities.map((resp, i) => (
                        <li key={i} className="text-zinc-400 text-sm leading-relaxed flex items-start gap-3 group/item">
                          <span className="text-accent/50 mt-1.5 text-[10px] group-hover/item:text-accent transition-colors">■</span>
                          <span className="group-hover/item:text-zinc-300 transition-colors">{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Tilt>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
