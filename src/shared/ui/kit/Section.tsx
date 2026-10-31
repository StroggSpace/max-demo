import type { ReactNode } from 'react';
import { CellHeader } from '@maxhub/max-ui';

import styles from './kit.module.css';

interface SectionProps {
  title: string;
  after?: ReactNode;
  children: ReactNode;
  className?: string;
}

export function Section({ title, after, children, className }: SectionProps) {
  return (
    <section className={[styles.section, className].filter(Boolean).join(' ')}>
      <CellHeader after={after}>{title}</CellHeader>
      <div className={styles.sectionBody}>{children}</div>
    </section>
  );
}
