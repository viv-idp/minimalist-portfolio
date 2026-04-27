import React, { useState } from 'react';
import { portfolioData } from '../data.ts';
import { Reveal } from './Reveal.tsx';
import { Mail, Phone, MapPin, Send, ArrowUpRight } from 'lucide-react';
import { LinkedinIcon, GithubIcon } from './Icons.tsx';

export const Contact: React.FC = () => {
  const { personal } = portfolioData;
  const [terminalLines, setTerminalLines] = useState<string[]>([
    '$ ssh connect@bandi-venkatesh.dev',
    'Connection established.',
    'Welcome! Pick a channel below to reach me.',
    ''
  ]);

  const handleChannelClick = (channel: string) => {
    setTerminalLines(prev => [
      ...prev,
      `$ open --channel ${channel}`,
      `Opening ${channel}... ✓`
    ]);
  };

  const contactChannels = [
    {
      label: 'Email',
      value: personal.email,
      href: `mailto:${personal.email}`,
      icon: <Mail className="w-5 h-5" />,
      color: 'hover:border-emerald-500/50 hover:shadow-emerald-500/10',
    },
    {
      label: 'Phone',
      value: personal.phone,
      href: `tel:${personal.phone}`,
      icon: <Phone className="w-5 h-5" />,
      color: 'hover:border-blue-500/50 hover:shadow-blue-500/10',
    },
    {
      label: 'LinkedIn',
      value: 'Bandi Venkatesh',
      href: `https://${personal.linkedin}`,
      icon: <LinkedinIcon className="w-5 h-5" />,
      color: 'hover:border-sky-500/50 hover:shadow-sky-500/10',
    },
    {
      label: 'GitHub',
      value: 'Bandi-Events',
      href: `https://${personal.github}`,
      icon: <GithubIcon className="w-5 h-5" />,
      color: 'hover:border-purple-500/50 hover:shadow-purple-500/10',
    },
    {
      label: 'Resume',
      value: 'Download CV',
      href: personal.resumeUrl,
      icon: <Send className="w-5 h-5" />,
      color: 'hover:border-amber-500/50 hover:shadow-amber-500/10',
    },
    {
      label: 'Location',
      value: personal.location,
      href: '#',
      icon: <MapPin className="w-5 h-5" />,
      color: 'hover:border-orange-500/50 hover:shadow-orange-500/10',
    },
  ];

  return (
    <section id="contact" className="py-32 px-6 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/[0.02] to-transparent pointer-events-none"></div>
      
      <div className="max-w-5xl mx-auto relative z-10">
        <Reveal>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-zinc-100 mb-6 flex items-center gap-4">
            Get In Touch<span className="text-accent">.</span>
            <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent ml-4"></div>
          </h2>
        </Reveal>

        <Reveal delay={100}>
          <p className="text-zinc-400 max-w-2xl mb-16 text-sm md:text-base">
            I'm currently open to new opportunities. Whether you want to discuss DevOps, cloud architecture, or just want to say hello — let's connect!
          </p>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Terminal */}
          <Reveal delay={200}>
            <div className="bg-zinc-950/80 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-zinc-900/50">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                </div>
                <div className="mx-auto flex items-center gap-2 text-xs text-zinc-500 font-mono">
                  <Send className="w-3 h-3" />
                  contact-terminal
                </div>
              </div>
              <div className="p-5 font-terminal text-sm text-zinc-300 min-h-[200px]">
                {terminalLines.map((line, i) => (
                  <div key={i} className={`mb-1.5 ${line.startsWith('$') ? 'text-accent' : line.includes('✓') ? 'text-emerald-400' : 'text-zinc-400'}`}>
                    {line || '\u00A0'}
                  </div>
                ))}
                <div className="flex items-center text-accent mt-2">
                  <span>$</span>
                  <span className="w-2 h-4 bg-accent ml-2 animate-blink"></span>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Contact Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {contactChannels.map((channel, index) => (
              <Reveal key={channel.label} delay={300 + index * 100}>
                <a
                  href={channel.href}
                  target={channel.href.startsWith('http') ? '_blank' : undefined}
                  rel={channel.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  onClick={() => handleChannelClick(channel.label.toLowerCase())}
                  className={`group glow-card flex flex-col gap-3 p-5 rounded-xl bg-zinc-900/40 backdrop-blur-sm border border-white/5 transition-all duration-300 hover:shadow-xl ${channel.color}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="text-zinc-500 group-hover:text-accent transition-colors">
                      {channel.icon}
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-zinc-700 group-hover:text-zinc-400 transition-colors group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transform duration-300" />
                  </div>
                  <div>
                    <p className="text-xs font-mono text-zinc-500 mb-1">{channel.label}</p>
                    <p className="text-sm text-zinc-300 group-hover:text-zinc-100 transition-colors truncate">
                      {channel.value}
                    </p>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
