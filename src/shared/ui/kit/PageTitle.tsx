import type { ReactNode } from 'react';
import { Typography } from '@maxhub/max-ui';

import styles from './kit.module.css';

interface PageTitleProps {
  title: string;
  subtitle?: string;
  right?: ReactNode;
}

export function PageTitle({ title, subtitle, right }: PageTitleProps) {
  return (
    <div className={styles.pageTitle}>
      <div className={styles.pageTitleText}>
        <Typography.Title variant="large-strong" asChild>
          <h1 className={styles.pageTitleHeading}>{title}</h1>
        </Typography.Title>
        {subtitle ? (
          <Typography.Body variant="small" className={styles.pageTitleSubtitle}>
            {subtitle}
          </Typography.Body>
        ) : null}
      </div>
      {right ? <div className={styles.pageTitleRight}>{right}</div> : null}
    </div>
  );
}
