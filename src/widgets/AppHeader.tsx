import { useRef } from 'react';

import { useDemoStore } from '@/store/demo';
import { useUiStore } from '@/app/ui';
import styles from './AppHeader.module.css';

interface Props {
  title: string;
  subtitle?: string;
  showThemeToggle?: boolean;
}

export function AppHeader({ title, subtitle, showThemeToggle = true }: Props) {
  const theme = useDemoStore((s) => s.theme);
  const toggleTheme = useDemoStore((s) => s.toggleTheme);
  const openPanel = useUiStore((s) => s.openPanel);
  const taps = useRef<number[]>([]);

  const handleSecretTap = () => {
    const now = Date.now();
    taps.current = [...taps.current.filter((time) => now - time < 700), now];
    if (taps.current.length >= 3) {
      taps.current = [];
      openPanel();
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.text}>
        <h1 className={styles.title} onClick={handleSecretTap}>
          {title}
        </h1>
        {subtitle ? <p className={styles.subtitle}>{subtitle}</p> : null}
      </div>

      {showThemeToggle ? (
        <button
          type="button"
          className={styles.button}
          onClick={toggleTheme}
          aria-label={theme === 'light' ? 'Тёмная тема' : 'Светлая тема'}
        >
          {theme === 'light' ? '☾' : '☀'}
        </button>
      ) : null}

      <button
        type="button"
        className={styles.button}
        onClick={openPanel}
        aria-label="Настройки демо"
      >
        ⋯
      </button>
    </header>
  );
}
