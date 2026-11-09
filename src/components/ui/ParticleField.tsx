import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

export const ParticleField: React.FC = () => {
  // Generate random stable particles
  const particles = useMemo(() => {
    return Array.from({ length: 24 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // percentage across screen
      y: Math.random() * 100,
      size: Math.random() * 8 + 4,
      duration: Math.random() * 12 + 10,
      delay: Math.random() * 5,
      type: i % 4 === 0 ? 'petal' : i % 4 === 1 ? 'sparkle' : 'heart',
      opacity: Math.random() * 0.4 + 0.15,
    }));
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-20 overflow-hidden" aria-hidden="true">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: ['0vh', '-25vh', '0vh'],
            x: ['0px', `${(p.id % 2 === 0 ? 1 : -1) * 20}px`, '0px'],
            rotate: [0, 180, 360],
            opacity: [p.opacity, p.opacity * 1.5, p.opacity],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {p.type === 'heart' && (
            <svg viewBox="0 0 24 24" fill="#E08798" opacity={p.opacity}>
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          )}

          {p.type === 'petal' && (
            <div
              className="w-full h-full rounded-full bg-rose-vintage/30 blur-[0.5px]"
              style={{
                borderRadius: '60% 40% 70% 30% / 50% 60% 40% 50%',
              }}
            />
          )}

          {p.type === 'sparkle' && (
            <div className="w-full h-full rounded-full bg-champagne/40 blur-[0.5px] animate-pulse" />
          )}
        </motion.div>
      ))}
    </div>
  );
};
