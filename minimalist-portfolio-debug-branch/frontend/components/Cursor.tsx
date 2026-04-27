import React, { useEffect, useRef } from 'react';

export const Cursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const outlineRef = useRef<HTMLDivElement>(null);
  const isHoveringRef = useRef(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const animationIdRef = useRef<number>(0);

  useEffect(() => {
    // Only enable custom cursor on devices with a fine pointer (mouse)
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let outlineX = mouseX;
    let outlineY = mouseY;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      // Dot follows cursor instantly — no lag
      if (dotRef.current) {
        dotRef.current.style.left = `${mouseX}px`;
        dotRef.current.style.top = `${mouseY}px`;
      }
    };

    // Smooth trailing animation for the outline — faster tracking (0.25 instead of 0.15)
    const animate = () => {
      const distX = mouseX - outlineX;
      const distY = mouseY - outlineY;
      
      // Faster follow speed: 0.25 gives snappy but smooth trailing
      outlineX += distX * 0.25;
      outlineY += distY * 0.25;

      if (outlineRef.current) {
        outlineRef.current.style.left = `${outlineX}px`;
        outlineRef.current.style.top = `${outlineY}px`;
      }

      animationIdRef.current = requestAnimationFrame(animate);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = 
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[role="button"]') ||
        target.classList.contains('hover-trigger') ||
        target.closest('.hover-trigger') ||
        target.closest('.glow-card') ||
        target.closest('.project-card') ||
        target.closest('.stat-item');

      isHoveringRef.current = !!isInteractive;
      if (wrapperRef.current) {
        wrapperRef.current.className = isInteractive ? 'cursor-hover' : '';
      }
    };

    // Make cursor visible immediately on first mouse movement
    const handleMouseEnter = () => {
      if (dotRef.current) dotRef.current.style.opacity = '1';
      if (outlineRef.current) outlineRef.current.style.opacity = '1';
    };

    const handleMouseLeave = () => {
      if (dotRef.current) dotRef.current.style.opacity = '0';
      if (outlineRef.current) outlineRef.current.style.opacity = '0';
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    animationIdRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationIdRef.current);
    };
  }, []);

  // Don't render on touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <div ref={wrapperRef}>
      <div ref={dotRef} className="cursor-dot hidden md:block" style={{ opacity: 0 }}></div>
      <div ref={outlineRef} className="cursor-outline hidden md:block" style={{ opacity: 0 }}></div>
    </div>
  );
};