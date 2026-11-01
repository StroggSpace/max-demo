import { ArrowLeftIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { IconButton, Typography } from '@maxhub/max-ui';

import styles from './AppHeader.module.css';

interface Props {
  title: string;
  subtitle?: string;
  back?: boolean;
  hideSettings?: boolean;
}

export function AppHeader({ title, subtitle, back, hideSettings }: Props) {
  const navigate = useNavigate();

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

        {hideSettings ? null : (
          <IconButton
            size="medium"
            mode="tertiary"
            aria-label="Настройки"
            onClick={() => navigate('/settings')}
          >
            <Cog6ToothIcon className={styles.icon} />
          </IconButton>
        )}
      </div>
    </header>
  );
}
