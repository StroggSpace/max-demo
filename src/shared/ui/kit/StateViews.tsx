import type { ReactNode } from 'react';
import { ExclamationTriangleIcon, InboxIcon } from '@heroicons/react/24/outline';
import { Button, Spinner, Typography } from '@maxhub/max-ui';

import { useDemoStore } from '@/store/demo';
import styles from './StateViews.module.css';

interface StateProps {
  title: string;
  text?: string;
  icon?: ReactNode;
  action?: ReactNode;
}

function StateLayout({ title, text, icon, action }: StateProps) {
  return (
    <div className={styles.state} role="status">
      {icon ? <div className={styles.icon}>{icon}</div> : null}
      <Typography.Title variant="medium-strong">{title}</Typography.Title>
      {text ? (
        <Typography.Body variant="small" className={styles.text}>
          {text}
        </Typography.Body>
      ) : null}
      {action}
    </div>
  );
}

export function LoadingState({ title = 'Загружаем данные' }: { title?: string }) {
  return (
    <div className={styles.state} role="status">
      <Spinner size={28} appearance="themed" />
      <Typography.Body variant="small" className={styles.text}>
        {title}
      </Typography.Body>
    </div>
  );
}

export function EmptyState({
  title = 'Пока ничего нет',
  text = 'Здесь появятся данные, как только начнётся акция.',
}: {
  title?: string;
  text?: string;
}) {
  return (
    <StateLayout
      title={title}
      text={text}
      icon={<InboxIcon className={styles.iconGlyph} />}
    />
  );
}

export function ErrorState({
  title = 'Не удалось загрузить',
  text = 'Проверьте соединение и попробуйте снова.',
}: {
  title?: string;
  text?: string;
}) {
  const setDemoState = useDemoStore((s) => s.setDemoState);

  return (
    <StateLayout
      title={title}
      text={text}
      icon={<ExclamationTriangleIcon className={styles.iconGlyph} />}
      action={
        <Button size="small" mode="secondary" onClick={() => setDemoState('normal')}>
          Попробовать снова
        </Button>
      }
    />
  );
}

/**
 * Показывает выбранное в настройках состояние вместо контента страницы.
 */
export function StateGate({
  children,
  emptyTitle,
  emptyText,
}: {
  children: ReactNode;
  emptyTitle?: string;
  emptyText?: string;
}) {
  const demoState = useDemoStore((s) => s.demoState);

  if (demoState === 'loading') return <LoadingState />;
  if (demoState === 'empty') return <EmptyState title={emptyTitle} text={emptyText} />;
  if (demoState === 'error') return <ErrorState />;
  return <>{children}</>;
}
