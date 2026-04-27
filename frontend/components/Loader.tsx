import React, { useState, useEffect } from 'react';

const bootLogs = [
  "Initializing kernel...",
  "Loading core modules... OK",
  "Mounting file systems... OK",
  "Starting Docker daemon... OK",
  "Connecting to Kubernetes API server...",
  "Authentication successful.",
  "Fetching cluster state...",
  "Deploying Bandi_Venkatesh_Portfolio_v1.0...",
  "Provisioning ingress controller...",
  "Allocating IP address...",
  "Running health checks... 100% passing",
  "System ready. Welcome."
];

export const Loader: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [logs, setLogs] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    let currentIndex = 0;
    
    const interval = setInterval(() => {
      if (currentIndex < bootLogs.length) {
        setLogs(prev => [...prev, bootLogs[currentIndex]]);
        setProgress(Math.floor(((currentIndex + 1) / bootLogs.length) * 100));
        currentIndex++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setIsExiting(true);
          setTimeout(() => onComplete(), 600);
        }, 800);
      }
    }, 150);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 z-[100] bg-zinc-950 flex flex-col items-center justify-center p-6 font-terminal text-accent ${isExiting ? 'loader-exit' : ''}`}>
      <div className="w-full max-w-2xl">
        {/* Glitch title */}
        <div className="mb-8 text-center">
          <h1 className="glitch text-2xl md:text-3xl font-bold tracking-widest" data-text="BV.PORTFOLIO">
            BV<span className="text-accent">.</span>PORTFOLIO
          </h1>
        </div>

        <div className="mb-4 flex items-center justify-between text-sm opacity-50">
          <span>SYSTEM BOOT SEQUENCE</span>
          <span>v1.0.0</span>
        </div>
        
        <div className="h-64 overflow-hidden flex flex-col justify-end mb-8">
          {logs.map((log, i) => (
            <div key={i} className="text-sm md:text-base mb-1 opacity-80 animate-slideUp" style={{ animationDelay: `${i * 50}ms` }}>
              <span className="text-zinc-500 mr-4">[{new Date().toISOString().split('T')[1].slice(0, -1)}]</span>
              {log}
            </div>
          ))}
          <div className="text-sm md:text-base mt-1">
            <span className="text-zinc-500 mr-4">[{new Date().toISOString().split('T')[1].slice(0, -1)}]</span>
            <span className="animate-blink">_</span>
          </div>
        </div>

        <div className="w-full h-1 bg-zinc-900 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-accent via-emerald-400 to-accent transition-all duration-150 ease-out"
            style={{ width: `${progress}%`, backgroundSize: '200% 100%', animation: 'shimmer 1.5s linear infinite' }}
          ></div>
        </div>
        <div className="mt-2 text-right text-xs opacity-50">
          {progress}%
        </div>
      </div>
    </div>
  );
};