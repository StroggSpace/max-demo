import type { ReactNode } from 'react';
import { motion } from 'motion/react';

import { useMotionControls } from '@/shared/motion/useMotionControls';
import styles from './kit.module.css';

interface RingProgressProps {
  value: number;
  size?: number;
  children?: ReactNode;
}

export function RingProgress({ value, size = 88, children }: RingProgressProps) {
  const { enabled } = useMotionControls();
  const safe = Math.max(0, Math.min(100, value));
  const deg = (safe / 100) * 360;

  return (
    <motion.div
      className={styles.ring}
      style={
        {
          width: size,
          height: size,
          '--ring-angle': '0deg',
          background:
            'conic-gradient(var(--background-accent-themed) var(--ring-angle), var(--background-surface-tertiary) 0)',
        } as React.CSSProperties
      }
      initial={enabled ? { '--ring-angle': '0deg' } : false}
      animate={{ '--ring-angle': `${deg}deg` }}
      transition={enabled ? { duration: 0.45, ease: [0.22, 1, 0.36, 1] } : { duration: 0 }}
      role="progressbar"
      aria-valuenow={Math.round(safe)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div className={styles.ringInner}>{children}</div>
    </motion.div>
  );
}
