import React, { useState } from 'react';
import { portfolioData } from '../data.ts';
import { Reveal } from './Reveal.tsx';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';

export const Skills: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState(0);
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const categories = portfolioData.skills;

  // Skill proficiency levels (you can customize these)
  const skillLevels = {
    'Kubernetes': 95,
    'GKE': 90,
    'Terraform': 85,
    'Docker': 90,
    'Jenkins': 88,
    'Prometheus': 82,
    'Grafana': 80,
    'Helm': 85,
    'GitLab CI/CD': 85,
    'Google Cloud Platform (GCP)': 88,
    'Ansible': 75,
    'Bash/Shell': 90,
    'Linux': 85,
    'YAML': 95,
    'RBAC': 80,
    'Network Policies': 75,
    'Resource Quotas': 80,
    'Kustomize': 70,
    'Google Cloud Build': 80,
    'DevSecOps': 75,
    'Datadog': 78,
    'Kubernetes Metrics Server': 85,
    'Compute Engine': 85,
    'Cloud SQL': 80,
    'Cloud Storage': 85,
    'Deployments': 95,
    'StatefulSets': 85
  };

  return (
    <section ref={ref} id="skills" className="py-32 bg-zinc-900/20 border-y border-white/5 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(16,185,129,0.05),transparent_70%)]"></div>

      <div className="max-w-6xl mx-auto px-6 relative z-20">
        <Reveal>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-zinc-100 mb-4">
              Technical <span className="text-accent">Expertise</span>
            </h2>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
              Deep expertise across the full DevOps and cloud infrastructure stack
            </p>
          </div>
        </Reveal>

        {/* Category Tabs */}
        <Reveal>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category, index) => (
              <button
                key={index}
                onClick={() => setActiveCategory(index)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeCategory === index
                    ? 'bg-accent text-zinc-950 shadow-lg shadow-accent/25'
                    : 'bg-zinc-900/50 text-zinc-400 hover:text-accent hover:border-accent/50 border border-white/5 hover:bg-accent/5'
                }`}
              >
                {category.category}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories[activeCategory].items.map((skill, index) => (
            <Reveal key={skill} delay={index * 0.05}>
              <div className="group p-6 rounded-2xl bg-zinc-900/30 border border-white/5 hover:border-accent/30 hover:bg-accent/5 transition-all duration-500 hover:shadow-[0_0_20px_rgba(16,185,129,0.1)]">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-zinc-100 group-hover:text-accent transition-colors">
                    {skill}
                  </h3>
                  <div className="text-2xl font-bold text-accent">
                    {inView && (
                      <CountUp
                        end={skillLevels[skill as keyof typeof skillLevels] || 80}
                        duration={1.5}
                        suffix="%"
                      />
                    )}
                  </div>
                </div>

                <div className="w-full bg-zinc-800/50 rounded-full h-2 mb-2">
                  <div
                    className="bg-gradient-to-r from-accent to-accent/60 h-2 rounded-full transition-all duration-1000 ease-out"
                    style={{
                      width: inView ? `${skillLevels[skill as keyof typeof skillLevels] || 80}%` : '0%'
                    }}
                  ></div>
                </div>

                <div className="flex justify-between text-sm text-zinc-500">
                  <span>Proficiency</span>
                  <span>{skillLevels[skill as keyof typeof skillLevels] || 80}%</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Floating Marquee (original design kept as secondary element) */}
        <div className="mt-20 opacity-30">
          <div className="flex overflow-hidden whitespace-nowrap w-full relative py-4">
            <div className="flex gap-4 w-max animate-marquee">
              {categories.flatMap(cat => cat.items).map((item, i) => (
                <div
                  key={i}
                  className="px-4 py-2 text-sm font-mono rounded-full bg-zinc-900/30 border border-white/5 text-zinc-500"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};