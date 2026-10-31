import type { ReactNode } from 'react';

import styles from './kit.module.css';

interface ChipProps {
  children: ReactNode;
  tone?: 'accent' | 'success' | 'muted';
}

export function Chip({ children, tone = 'muted' }: ChipProps) {
  return (
    <span
      className={[styles.chip, tone === 'accent' ? styles.chipAccent : '', tone === 'success' ? styles.chipSuccess : '']
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </span>
  );
}
