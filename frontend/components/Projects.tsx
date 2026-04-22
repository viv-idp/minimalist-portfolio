import React, { useState } from 'react';
import { ExternalLink, GitBranch, Filter } from 'lucide-react';
import { Reveal } from './Reveal.tsx';
import { Magnetic } from './Magnetic.tsx';

const projects = [
  {
    id: 1,
    title: 'Multi-Tenant GKE Platform',
    description: 'Architected and managed production GKE clusters for fintech, e-commerce, and healthcare applications with isolated namespaces and resource boundaries.',
    technologies: ['Kubernetes', 'GKE', 'Terraform', 'Helm', 'Prometheus'],
    category: 'Infrastructure',
    status: 'Production',
    github: '#',
    demo: '#',
    highlights: [
      'Managed 15+ client environments',
      '99.9% uptime SLA',
      'Automated scaling & cost optimization'
    ]
  },
  {
    id: 2,
    title: 'CI/CD Pipeline Automation',
    description: 'Built end-to-end CI/CD pipelines with integrated security scanning, automated testing, and blue-green deployments for microservices.',
    technologies: ['Jenkins', 'GitLab CI', 'Docker', 'Kubernetes', 'SonarQube'],
    category: 'DevOps',
    status: 'Production',
    github: '#',
    demo: '#',
    highlights: [
      'Reduced deployment time by 80%',
      'Zero-downtime deployments',
      'Automated security scanning'
    ]
  },
  {
    id: 3,
    title: 'Observability Stack',
    description: 'Implemented comprehensive monitoring and alerting solutions using Prometheus, Grafana, and Datadog for cloud-native applications.',
    technologies: ['Prometheus', 'Grafana', 'Datadog', 'Kubernetes', 'ELK Stack'],
    category: 'Monitoring',
    status: 'Production',
    github: '#',
    demo: '#',
    highlights: [
      'Real-time metrics & alerting',
      'Custom dashboards',
      'Performance optimization insights'
    ]
  },
  {
    id: 4,
    title: 'Infrastructure as Code',
    description: 'Developed reusable Terraform modules and Helm charts for consistent, automated provisioning of GCP resources and Kubernetes applications.',
    technologies: ['Terraform', 'Helm', 'GCP', 'Kubernetes', 'GitOps'],
    category: 'IaC',
    status: 'Production',
    github: '#',
    demo: '#',
    highlights: [
      '100% infrastructure automation',
      'Version-controlled deployments',
      'Multi-environment consistency'
    ]
  }
];

const categories = ['All', 'Infrastructure', 'DevOps', 'Monitoring', 'IaC'];

export const Projects: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter(project => project.category === activeCategory);

  return (
    <section id="projects" className="py-32 bg-zinc-950/50 border-y border-white/5 relative">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-zinc-100 mb-4">
              Featured <span className="text-accent">Projects</span>
            </h2>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
              Showcasing key DevOps initiatives and infrastructure projects that delivered measurable business impact
            </p>
          </div>
        </Reveal>

        {/* Category Filter */}
        <Reveal>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-accent text-zinc-950 shadow-lg shadow-accent/25'
                    : 'bg-zinc-900/50 text-zinc-400 hover:text-accent hover:border-accent/50 border border-white/5 hover:bg-accent/5'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project, index) => (
            <Reveal key={project.id} delay={index * 0.1}>
              <div className="group p-6 rounded-2xl bg-zinc-900/30 border border-white/5 hover:border-accent/30 hover:bg-accent/5 transition-all duration-500 hover:shadow-[0_0_30px_rgba(16,185,129,0.1)] hover:-translate-y-2">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-zinc-100 mb-2 group-hover:text-accent transition-colors">
                      {project.title}
                    </h3>
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        project.status === 'Production'
                          ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                          : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                      }`}>
                        {project.status}
                      </span>
                      <span className="text-sm text-zinc-500">{project.category}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Magnetic>
                      <a
                        href={project.github}
                        className="p-2 rounded-lg bg-zinc-800 hover:bg-accent/20 text-zinc-400 hover:text-accent transition-colors"
                        aria-label="View on GitHub"
                      >
                        <GitBranch className="w-4 h-4" />
                      </a>
                    </Magnetic>
                    <Magnetic>
                      <a
                        href={project.demo}
                        className="p-2 rounded-lg bg-zinc-800 hover:bg-accent/20 text-zinc-400 hover:text-accent transition-colors"
                        aria-label="View demo"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </Magnetic>
                  </div>
                </div>

                <p className="text-zinc-400 mb-4 leading-relaxed">
                  {project.description}
                </p>

                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-zinc-300 mb-2">Key Highlights:</h4>
                  <ul className="space-y-1">
                    {project.highlights.map((highlight, i) => (
                      <li key={i} className="text-sm text-zinc-500 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent/60"></div>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs font-medium rounded-full bg-zinc-800/50 text-zinc-400 border border-white/5"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};