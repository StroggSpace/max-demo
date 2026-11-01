import { motion } from 'motion/react';

import { useMotionControls } from '@/shared/motion/useMotionControls';
import styles from './kit.module.css';

interface ProgressProps {
  value: number;
  height?: 's' | 'm';
  tone?: 'accent' | 'contrast';
}

export function Progress({ value, height = 'm', tone = 'accent' }: ProgressProps) {
  const { enabled } = useMotionControls();
  const safe = Math.max(0, Math.min(100, value));

  return (
    <div
      className={[styles.progress, height === 's' ? styles.progressS : ''].join(' ')}
      role="progressbar"
      aria-valuenow={Math.round(safe)}
      aria-valuemin={0}
      aria-valuemax={100}
      data-tone={tone}
    >
      <motion.div
        className={styles.progressBar}
        data-tone={tone}
        initial={enabled ? { width: 0 } : false}
        animate={{ width: `${safe}%` }}
        transition={enabled ? { duration: 0.4, ease: [0.22, 1, 0.36, 1] } : { duration: 0 }}
      />
    </div>
  );
}
