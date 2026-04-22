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
          onComplete();
        }, 800); // Brief pause before revealing app
      }
    }, 150); // Speed of logs appearing

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[100] bg-zinc-950 flex flex-col items-center justify-center p-6 font-terminal text-accent">
      <div className="w-full max-w-2xl">
        <div className="mb-4 flex items-center justify-between text-sm opacity-50">
          <span>SYSTEM BOOT SEQUENCE</span>
          <span>v1.0.0</span>
        </div>
        
        <div className="h-64 overflow-hidden flex flex-col justify-end mb-8">
          {logs.map((log, i) => (
            <div key={i} className="text-sm md:text-base mb-1 opacity-80">
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
            className="h-full bg-accent transition-all duration-150 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="mt-2 text-right text-xs opacity-50">
          {progress}%
        </div>
      </div>
    </div>
  );
};