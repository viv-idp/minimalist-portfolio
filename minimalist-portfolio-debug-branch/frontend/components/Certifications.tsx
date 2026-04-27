import React from 'react';
import { portfolioData } from '../data.ts';
import { GraduationCap, Award, ExternalLink } from 'lucide-react';
import { Reveal } from './Reveal.tsx';

export const Certifications: React.FC = () => {
  return (
    <section id="certifications" className="py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <Reveal>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-zinc-100 mb-20 flex items-center gap-4">
            Credentials<span className="text-accent">.</span>
            <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent ml-4"></div>
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Certifications */}
          <div>
            <Reveal delay={100}>
              <h3 className="text-xl font-semibold text-zinc-200 mb-8 flex items-center gap-3">
                <Award className="w-5 h-5 text-accent/70" />
                Certifications
              </h3>
            </Reveal>
            <div className="space-y-4">
              {portfolioData.certifications.map((cert, index) => (
                <Reveal key={`cert-${index}`} delay={(index + 1) * 100}>
                  <div className={`glow-card p-5 rounded-xl bg-zinc-900/40 backdrop-blur-sm border transition-all duration-300 group ${(cert as any).expired ? 'border-red-500/10 hover:border-red-500/30' : 'border-white/5 hover:border-accent/20'}`}>
                    <div className="flex justify-between items-start gap-4 mb-3">
                      <div className="flex-1">
                        <h4 className="text-base font-bold text-zinc-200 group-hover:text-zinc-100 transition-colors">{cert.name}</h4>
                        {(cert as any).expired ? (
                          <span className="inline-flex items-center gap-1 mt-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/20">Expired</span>
                        ) : (
                          <span className="inline-flex items-center gap-1 mt-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-accent/10 text-accent border border-accent/20">Active</span>
                        )}
                      </div>
                      {cert.link && (
                        <a href={cert.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs font-mono text-zinc-500 hover:text-accent transition-colors shrink-0">
                          <span>Verify</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-zinc-500">{cert.issuer}</span>
                      <span className={`font-mono text-xs ${(cert as any).expired ? 'text-red-400/60' : 'text-accent/80'}`}>{cert.date}</span>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <Reveal delay={100}>
              <h3 className="text-xl font-semibold text-zinc-200 mb-8 flex items-center gap-3">
                <GraduationCap className="w-5 h-5 text-accent/70" />
                Education
              </h3>
            </Reveal>
            <div className="space-y-4">
              {portfolioData.education.map((edu, index) => (
                <Reveal key={`edu-${index}`} delay={(index + 1) * 100}>
                  <div className="glow-card p-5 rounded-xl bg-zinc-900/40 backdrop-blur-sm border border-white/5 hover:border-accent/20 transition-all duration-300 group">
                    <h4 className="text-base font-bold text-zinc-200 group-hover:text-zinc-100 transition-colors mb-1">{edu.degree}</h4>
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