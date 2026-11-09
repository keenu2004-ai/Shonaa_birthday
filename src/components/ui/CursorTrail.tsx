import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TrailParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
}

const COLORS = ['#E08798', '#D4AF37', '#DE6F84', '#F3BCC7'];

export const CursorTrail: React.FC = () => {
  const [particles, setParticles] = useState<TrailParticle[]>([]);
  const [isEnabled, setIsEnabled] = useState(true);

  useEffect(() => {
    // Disable on touch devices or if user prefers reduced motion
    if (window.matchMedia('(pointer: coarse)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsEnabled(false);
      return;
    }

    let id = 0;
    let throttleTimeout: any = null;

    const handleMouseMove = (e: MouseEvent) => {
      if (throttleTimeout) return;
      throttleTimeout = setTimeout(() => {
        throttleTimeout = null;
      }, 50);

      const newParticle: TrailParticle = {
        id: id++,
        x: e.clientX,
        y: e.clientY,
        size: Math.random() * 8 + 4,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      };

      setParticles((prev) => [...prev.slice(-15), newParticle]);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (throttleTimeout) clearTimeout(throttleTimeout);
    };
  }, []);

  if (!isEnabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden" aria-hidden="true">
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0.8, scale: 1, x: p.x - p.size / 2, y: p.y - p.size / 2 }}
            animate={{ opacity: 0, scale: 0.2, y: p.y - 25 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="absolute rounded-full"
            style={{
              width: p.size,
              height: p.size,
              backgroundColor: p.color,
              boxShadow: `0 0 8px ${p.color}`,
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

