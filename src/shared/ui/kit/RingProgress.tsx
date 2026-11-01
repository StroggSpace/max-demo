import type { ReactNode } from 'react';

import styles from './kit.module.css';

interface RingProgressProps {
  value: number;
  size?: number;
  children?: ReactNode;
}

export function RingProgress({ value, size = 88, children }: RingProgressProps) {
  const safe = Math.max(0, Math.min(100, value));
  const deg = (safe / 100) * 360;

  return (
    <div
      className={styles.ring}
      style={{
        width: size,
        height: size,
        background: `conic-gradient(var(--background-accent-themed) ${deg}deg, var(--background-surface-tertiary) 0)`,
      }}
      role="progressbar"
      aria-valuenow={Math.round(safe)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div className={styles.ringInner}>{children}</div>
    </div>
  );
}
