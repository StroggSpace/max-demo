import type { ReactNode } from 'react';
import { Typography } from '@maxhub/max-ui';

import styles from './kit.module.css';

interface StatProps {
  value: ReactNode;
  label: string;
}

export function Stat({ value, label }: StatProps) {
  return (
    <div className={styles.stat}>
      <Typography.Title variant="large-strong">{value}</Typography.Title>
      <Typography.Body variant="small" className={styles.statLabel}>
        {label}
      </Typography.Body>
    </div>
  );
}
