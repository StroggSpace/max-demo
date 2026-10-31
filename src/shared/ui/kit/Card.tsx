import type { ReactNode } from 'react';
import { Panel } from '@maxhub/max-ui';

import styles from './kit.module.css';

interface CardProps {
  children: ReactNode;
  className?: string;
  tone?: 'default' | 'muted';
}

export function Card({ children, className, tone = 'default' }: CardProps) {
  return (
    <Panel
      className={[styles.card, tone === 'muted' ? styles.cardMuted : '', className]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </Panel>
  );
}
