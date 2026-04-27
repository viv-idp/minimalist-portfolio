import React from 'react';
import { portfolioData } from '../data.ts';
import { Reveal } from './Reveal.tsx';
import { Tilt } from './Tilt.tsx';
import { ExternalLink, Folder } from 'lucide-react';

export const Projects: React.FC = () => {
  const categoryColors: Record<string, string> = {
    'Platform Engineering': 'from-emerald-500/20 to-teal-500/20 border-emerald-500/30',
    'CI/CD': 'from-blue-500/20 to-cyan-500/20 border-blue-500/30',
    'Monitoring': 'from-purple-500/20 to-pink-500/20 border-purple-500/30',
    'IaC': 'from-orange-500/20 to-amber-500/20 border-orange-500/30',
    'Security': 'from-red-500/20 to-rose-500/20 border-red-500/30',
    'FinOps': 'from-yellow-500/20 to-lime-500/20 border-yellow-500/30',
  };

  const categoryTextColors: Record<string, string> = {
    'Platform Engineering': 'text-emerald-400',
    'CI/CD': 'text-blue-400',
    'Monitoring': 'text-purple-400',
    'IaC': 'text-orange-400',
    'Security': 'text-red-400',
    'FinOps': 'text-yellow-400',
  };

  return (
    <section id="projects" className="py-32 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-zinc-100 mb-6 flex items-center gap-4">
            Projects<span className="text-accent">.</span>
            <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent ml-4"></div>
          </h2>
        </Reveal>
        
        <Reveal delay={100}>
          <p className="text-zinc-400 max-w-2xl mb-16 text-sm md:text-base">
            A showcase of production-grade DevOps projects — from multi-tenant Kubernetes platforms to full observability stacks and GitOps pipelines.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioData.projects.map((project, index) => (
            <Reveal key={index} delay={index * 100}>
              <Tilt>
                <div className="project-card glow-card h-full bg-zinc-900/40 backdrop-blur-sm rounded-2xl p-6 border border-white/5 flex flex-col">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-2 rounded-lg bg-gradient-to-br ${categoryColors[project.category] || 'from-zinc-500/20 to-zinc-600/20 border-zinc-500/30'} border`}>
                      <Folder className="w-5 h-5 text-accent" />
                    </div>
                    <span className={`text-xs font-mono px-2 py-1 rounded-full bg-zinc-800/50 ${categoryTextColors[project.category] || 'text-zinc-400'}`}>
                      {project.category}
                    </span>
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-bold text-zinc-100 mb-3 group-hover:text-accent transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-zinc-400 text-sm leading-relaxed mb-6 flex-1">
                    {project.description}
                  </p>

                  {/* Tech tags */}
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tech.map((t, i) => (
                      <span
                        key={i}
                        className="text-xs font-mono px-2.5 py-1 rounded-full bg-zinc-800/60 text-zinc-400 border border-white/5 hover:border-accent/30 hover:text-accent transition-all duration-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
