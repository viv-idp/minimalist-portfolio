import React from 'react';
import { portfolioData } from '../data.ts';
import { Reveal } from './Reveal.tsx';
import { ExternalLink } from 'lucide-react';

export const Highlights: React.FC = () => {
  return (
    <section id="highlights" className="py-32 px-6">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
        
        {/* Highlights */}
        <div>
          <Reveal>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-zinc-100 mb-10">
              Key Achievements
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

        {/* Education & Certs */}
        <div>
          <Reveal>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-zinc-100 mb-10">
              Education & Certs
            </h2>
          </Reveal>
          
          <div className="space-y-10">
            {/* Certs */}
            <div className="space-y-4">
              {portfolioData.certifications.map((cert, index) => (
                <Reveal key={`cert-${index}`} delay={index * 100}>
                  <div className="p-5 rounded-xl bg-zinc-900/30 border border-white/5 hover:border-white/10 transition-colors">
                    <div className="flex justify-between items-start gap-4 mb-2">
                      <h4 className="text-base font-bold text-zinc-200">{cert.name}</h4>
                      {cert.link && cert.link !== "#" && (
                        <a href={cert.link} target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-accent transition-colors">
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-zinc-500">{cert.issuer}</span>
                      <span className="font-mono text-xs text-accent/80">{cert.date}</span>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Edu */}
            <div className="space-y-4">
              {portfolioData.education.map((edu, index) => (
                <Reveal key={`edu-${index}`} delay={index * 100}>
                  <div className="p-5 rounded-xl bg-zinc-900/30 border border-white/5 hover:border-white/10 transition-colors">
                    <h4 className="text-base font-bold text-zinc-200 mb-1">{edu.degree}</h4>
                    <p className="text-sm text-zinc-400 mb-3">{edu.institution}</p>
                    <span className="font-mono text-xs text-zinc-500">{edu.period}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};