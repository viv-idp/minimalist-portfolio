import React from 'react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { Award, Code, Users, Zap } from 'lucide-react';
import { Reveal } from './Reveal.tsx';

const stats = [
  {
    icon: Code,
    value: 50,
    suffix: '+',
    label: 'Projects Deployed',
    description: 'Kubernetes & Cloud Projects'
  },
  {
    icon: Award,
    value: 3,
    suffix: '',
    label: 'Certifications',
    description: 'GCP, CKA & More'
  },
  {
    icon: Users,
    value: 15,
    suffix: '+',
    label: 'Teams Supported',
    description: 'Cross-functional Collaboration'
  },
  {
    icon: Zap,
    value: 99.9,
    suffix: '%',
    label: 'Uptime Achieved',
    description: 'Production Reliability'
  }
];

export const Stats: React.FC = () => {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  return (
    <section ref={ref} className="py-32 bg-gradient-to-br from-zinc-900/50 to-zinc-950/50 border-y border-white/5 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(16,185,129,0.1),transparent_50%)] opacity-50"></div>

      <div className="max-w-6xl mx-auto px-6 relative z-20">
        <Reveal>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-zinc-100 mb-4">
              Impact <span className="text-accent">Metrics</span>
            </h2>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
              Key achievements and measurable results from DevOps initiatives
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <Reveal key={index} delay={index * 0.1}>
              <div className="group p-6 rounded-2xl bg-zinc-900/30 border border-white/5 hover:border-accent/30 hover:bg-accent/5 transition-all duration-500 hover:shadow-[0_0_30px_rgba(16,185,129,0.1)]">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-accent/10 text-accent mb-4 group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="w-6 h-6" />
                </div>
                <div className="text-3xl font-bold text-zinc-100 mb-2">
                  {inView && (
                    <CountUp
                      end={stat.value}
                      duration={2}
                      suffix={stat.suffix}
                      separator=","
                    />
                  )}
                </div>
                <h3 className="text-lg font-semibold text-zinc-300 mb-1">{stat.label}</h3>
                <p className="text-zinc-500 text-sm">{stat.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};