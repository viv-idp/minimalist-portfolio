import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  width?: 'fit-content' | '100%';
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  duration?: number;
}

export const Reveal: React.FC<RevealProps> = ({
  children,
  delay = 0,
  className = '',
  width = '100%',
  direction = 'up',
  duration = 0.8
}) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
    rootMargin: '0px 0px -50px 0px'
  });

  const getInitialPosition = () => {
    switch (direction) {
      case 'up': return { y: 30, opacity: 0 };
      case 'down': return { y: -30, opacity: 0 };
      case 'left': return { x: -30, opacity: 0 };
      case 'right': return { x: 30, opacity: 0 };
      case 'none': return { opacity: 0 };
      default: return { y: 30, opacity: 0 };
    }
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        width: width === 'fit-content' ? 'fit-content' : '100%'
      }}
      initial={getInitialPosition()}
      animate={inView ? { x: 0, y: 0, opacity: 1 } : getInitialPosition()}
      transition={{
        duration: duration,
        delay: delay,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
    >
      {children}
    </motion.div>
  );
};