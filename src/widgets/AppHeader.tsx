import { ArrowLeftIcon, Cog6ToothIcon, MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import { IconButton, Typography } from '@maxhub/max-ui';
import { useNavigate } from 'react-router-dom';

import { useDemoStore } from '@/store/demo';
import styles from './AppHeader.module.css';

interface Props {
  title: string;
  subtitle?: string;
  back?: boolean;
}

export function AppHeader({ title, subtitle, back }: Props) {
  const navigate = useNavigate();
  const theme = useDemoStore((s) => s.theme);
  const toggleTheme = useDemoStore((s) => s.toggleTheme);

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        {back ? (
          <IconButton
            size="medium"
            mode="tertiary"
            aria-label="Назад"
            onClick={() => navigate(-1)}
          >
            <ArrowLeftIcon className={styles.icon} />
          </IconButton>
        ) : null}

        <div className={styles.text}>
          <Typography.Title variant="large-strong" asChild>
            <h1 className={styles.title}>{title}</h1>
          </Typography.Title>
          {subtitle ? (
            <Typography.Body variant="small" className={styles.subtitle}>
              {subtitle}
            </Typography.Body>
          ) : null}
        </div>

        <IconButton
          size="medium"
          mode="tertiary"
          aria-label={theme === 'light' ? 'Тёмная тема' : 'Светлая тема'}
          onClick={toggleTheme}
        >
          {theme === 'light' ? (
            <MoonIcon className={styles.icon} />
          ) : (
            <SunIcon className={styles.icon} />
          )}
        </IconButton>

        {!back ? (
          <IconButton
            size="medium"
            mode="tertiary"
            aria-label="Настройки демо"
            onClick={() => navigate('/settings')}
          >
            <Cog6ToothIcon className={styles.icon} />
          </IconButton>
        ) : null}
      </div>
    </header>
  );
}
