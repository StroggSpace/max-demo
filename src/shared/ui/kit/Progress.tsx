import styles from './kit.module.css';

interface ProgressProps {
  value: number;
  height?: 's' | 'm';
}

export function Progress({ value, height = 'm' }: ProgressProps) {
  const safe = Math.max(0, Math.min(100, value));

  return (
    <div
      className={[styles.progress, height === 's' ? styles.progressS : ''].join(' ')}
      role="progressbar"
      aria-valuenow={Math.round(safe)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div className={styles.progressBar} style={{ width: `${safe}%` }} />
    </div>
  );
}
