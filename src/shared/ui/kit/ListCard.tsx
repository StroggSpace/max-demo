import type { ReactNode } from 'react';

import { Card } from './Card';
import styles from './kit.module.css';

/**
 * Карточка-список: ячейки MAX UI без двойных отступов и с разделителями.
 */
export function ListCard({ children }: { children: ReactNode }) {
  return <Card className={styles.listCard}>{children}</Card>;
}
