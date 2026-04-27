import React, { useState, useEffect, useRef, useMemo } from 'react';
import { MapPin, Mail, ArrowRight, Terminal as TerminalIcon } from 'lucide-react';
import { portfolioData } from '../data.ts';
import { Reveal } from './Reveal.tsx';
import { LinkedinIcon, GithubIcon } from './Icons.tsx';
import { Magnetic } from './Magnetic.tsx';

// Moved outside component to avoid re-creation
const terminalCommands = [
  { cmd: "kubectl get nodes", out: ["NAME                 STATUS   ROLES    AGE   VERSION", "gke-cluster-pool-1   Ready    <none>   45d   v1.27.3-gke.100"] },
  { cmd: "terraform apply -auto-approve", out: ["Apply complete! Resources: 3 added, 0 changed, 0 destroyed."] },
  { cmd: "helm upgrade prod-release ./chart", out: ["Release 'prod-release' has been upgraded. Happy Helming!"] }
];

const TerminalWindow = () => {
  const [lines, setLines] = useState<string[]>([]);

  useEffect(() => {
    let currentCmd = 0;
    const interval = setInterval(() => {
      if (currentCmd < terminalCommands.length) {
        const cmdToRun = terminalCommands[currentCmd];
        setLines(prev => [...prev, "$ " + cmdToRun.cmd, ...cmdToRun.out]);
        currentCmd++;
      } else {
        setLines([]);
        currentCmd = 0;
      }
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-[400px] bg-zinc-950/80 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden shadow-2xl shadow-accent/10 transform rotate-2 hover:rotate-0 transition-transform duration-500">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-zinc-900/50">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
        </div>
        <div className="mx-auto flex items-center gap-2 text-xs text-zinc-500 font-mono">
          <TerminalIcon className="w-3 h-3" />
          venky@devops-env:~
        </div>
      </div>
      <div className="p-4 font-terminal text-xs text-zinc-300 h-[200px] overflow-hidden flex flex-col justify-end">
        {lines.map((line, i) => (
          <div key={i} className={"mb-2 " + (line.startsWith("$") ? "text-accent" : "text-zinc-400 whitespace-pre-wrap")}>
            {line}
          </div>
        ))}
        <div className="flex items-center text-accent mt-1">
          <span>$</span>
          <span className="w-2 h-4 bg-accent ml-2 animate-blink"></span>
        </div>
      </div>
    </div>
  );
};

// Animated counter component
const AnimatedCounter: React.FC<{ target: number; suffix: string; label: string }> = ({ target, suffix, label }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let start = 0;
          const duration = 2000;
          const startTime = performance.now();
          
          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(eased * target);
            setCount(current);
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="stat-item text-center px-6 py-4 rounded-xl bg-zinc-900/30 border border-white/5 backdrop-blur-sm">
      <div className="stat-value text-3xl md:text-4xl font-extrabold text-zinc-100 font-mono transition-all duration-300">
        {count}{suffix}
      </div>
      <div className="text-xs md:text-sm text-zinc-500 font-mono mt-2">{label}</div>
    </div>
  );
};

export const Hero: React.FC = () => {
  const { personal, stats } = portfolioData;
  const roles = personal.roles || [personal.role];
  const [roleIndex, setRoleIndex] = useState(0);
  const [typedRole, setTypedRole] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = "> " + roles[roleIndex];
    
    if (!isDeleting) {
      if (typedRole.length < currentRole.length) {
        const timeout = setTimeout(() => {
          setTypedRole(currentRole.slice(0, typedRole.length + 1));
        }, 80);
        return () => clearTimeout(timeout);
      } else {
        // Pause before deleting
        const timeout = setTimeout(() => setIsDeleting(true), 2000);
        return () => clearTimeout(timeout);
      }
    } else {
      if (typedRole.length > 2) {
        const timeout = setTimeout(() => {
          setTypedRole(typedRole.slice(0, -1));
        }, 40);
        return () => clearTimeout(timeout);
      } else {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
      }
    }
  }, [typedRole, isDeleting, roleIndex, roles]);

  return (
    <section id="about" className="min-h-screen flex flex-col justify-center px-6 pt-20 relative overflow-hidden">
      
      {/* Animated Background Blobs */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[120px] animate-float pointer-events-none"></div>
      <div className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-emerald-800/20 rounded-full blur-[100px] animate-float-delayed pointer-events-none"></div>

      <div className="max-w-6xl mx-auto w-full relative z-10 flex items-center justify-between">
        
        <div className="max-w-2xl">
          <Reveal delay={100}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-mono mb-8 backdrop-blur-sm hover:bg-accent/20 transition-colors cursor-default">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
              </span>
              System Online & Ready
            </div>
          </Reveal>

          <Reveal delay={200}>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-extrabold tracking-tighter text-zinc-100 leading-[0.9] mb-6 drop-shadow-2xl">
              Bandi <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-100 via-zinc-400 to-zinc-600">
                Venkatesh
              </span>
            </h1>
          </Reveal>
          
          <Reveal delay={300}>
            <h2 className="text-xl md:text-2xl font-mono text-accent mb-8 h-8 flex items-center">
              {typedRole}
              <span className="inline-block w-2 h-6 bg-accent ml-1 animate-blink"></span>
            </h2>
          </Reveal>
          
          <Reveal delay={400}>
            <p className="text-lg md:text-xl text-zinc-400 max-w-xl leading-relaxed mb-12 font-light">
              {personal.summary}
            </p>
          </Reveal>

          <Reveal delay={500}>
            <div className="flex flex-wrap items-center gap-6 text-sm font-mono text-zinc-500 mb-12">
              <Magnetic strength={10}>
                <div className="flex items-center gap-2 hover-trigger cursor-pointer">
                  <MapPin className="w-4 h-4 text-accent/70" />
                  <span>{personal.location}</span>
                </div>
              </Magnetic>
              <Magnetic strength={10}>
                <a href={"mailto:" + personal.email} className="flex items-center gap-2 hover:text-accent transition-colors">
                  <Mail className="w-4 h-4 text-accent/70" />
                  <span>{personal.email}</span>
                </a>
              </Magnetic>
              <Magnetic strength={10}>
                <a href={"https://" + personal.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-accent transition-colors">
                  <LinkedinIcon className="w-4 h-4 text-accent/70" />
                  <span>LinkedIn</span>
                </a>
              </Magnetic>
              <Magnetic strength={10}>
                <a href={"https://" + personal.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-accent transition-colors">
                  <GithubIcon className="w-4 h-4 text-accent/70" />
                  <span>GitHub</span>
                </a>
              </Magnetic>
            </div>
          </Reveal>

          <Reveal delay={600}>
            <div className="flex items-center gap-8">
              <Magnetic strength={20}>
                <a 
                  href="#experience" 
                  className="group relative inline-flex items-center gap-2 px-8 py-4 bg-zinc-100 text-zinc-950 font-bold rounded-full overflow-hidden transition-transform hover:scale-105 active:scale-95"
                >
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-accent via-emerald-400 to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  <span className="relative flex items-center gap-2 group-hover:text-zinc-950">
                    Deploy Experience 
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </a>
              </Magnetic>
              <Magnetic strength={15}>
                <a 
                  href={personal.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-mono text-zinc-500 hover:text-zinc-300 underline decoration-zinc-700 underline-offset-4 transition-colors"
                >
                  Download_Resume.sh
                </a>
              </Magnetic>
            </div>
          </Reveal>
        </div>

        <Reveal delay={700}>
          <TerminalWindow />
        </Reveal>

      </div>

      {/* Animated Stats */}
      <Reveal delay={800}>
        <div className="max-w-4xl mx-auto w-full mt-20 grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <AnimatedCounter key={i} target={stat.value} suffix={stat.suffix} label={stat.label} />
          ))}
        </div>
      </Reveal>
    </section>
  );
};
