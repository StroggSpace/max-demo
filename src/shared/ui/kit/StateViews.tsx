import type { ReactNode } from 'react';
import { motion } from 'motion/react';
import { ExclamationTriangleIcon, InboxIcon } from '@heroicons/react/24/outline';
import { Button, Typography } from '@maxhub/max-ui';

import { useDemoStore } from '@/store/demo';
import { useMotionControls } from '@/shared/motion/useMotionControls';
import styles from './StateViews.module.css';

function Skeleton({ className }: { className?: string }) {
  const { enabled } = useMotionControls();

  return (
    <span className={[styles.skeleton, className].filter(Boolean).join(' ')}>
      {enabled ? (
        <motion.span
          className={styles.shimmer}
          initial={{ x: '-100%' }}
          animate={{ x: '100%' }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'linear' }}
        />
      ) : null}
    </span>
  );
}

export function LoadingState() {
  return (
    <div className={styles.skeletonPage} role="status" aria-label="Загружаем">
      <Skeleton className={styles.skTitle} />
      <Skeleton className={styles.skBalance} />
      <Skeleton className={styles.skHero} />
      <div className={styles.skRows}>
        <Skeleton className={styles.skRow} />
        <Skeleton className={styles.skRow} />
        <Skeleton className={styles.skRow} />
      </div>
    </div>
  );
}

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

export function EmptyState({
  title = 'Пока ничего нет',
  text = 'Здесь появятся данные, как только начнётся акция.',
}: {
  title?: string;
  text?: string;
}) {
  return (
    <StateLayout title={title} text={text} icon={<InboxIcon className={styles.iconGlyph} />} />
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
