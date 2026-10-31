import type { ReactNode } from 'react';

import styles from './kit.module.css';

export function Hero({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={[styles.hero, className].filter(Boolean).join(' ')}>{children}</div>
  );
}
