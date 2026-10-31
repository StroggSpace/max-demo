import type { ReactNode } from 'react';

import styles from './kit.module.css';

interface BalanceProps {
  value: number;
  caption?: ReactNode;
  size?: 'm' | 'l';
}

export function Balance({ value, caption = 'баллов', size = 'l' }: BalanceProps) {
  return (
    <div className={[styles.balance, size === 'm' ? styles.balanceM : ''].join(' ')}>
      {value.toLocaleString('ru-RU')}
      <small>{caption}</small>
    </div>
  );
}
