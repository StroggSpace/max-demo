import { useEffect } from 'react';
import { CheckCircleIcon, GiftIcon, InformationCircleIcon } from '@heroicons/react/24/solid';

import { useToastStore, type ToastItem } from './toastStore';
import styles from './Toaster.module.css';

const icons = {
  success: CheckCircleIcon,
  reward: GiftIcon,
  info: InformationCircleIcon,
};

function ToastCard({ item }: { item: ToastItem }) {
  const dismiss = useToastStore((state) => state.dismiss);
  const Icon = icons[item.kind];

  useEffect(() => {
    const timer = window.setTimeout(() => dismiss(item.id), 2600);
    return () => window.clearTimeout(timer);
  }, [item.id, dismiss]);

  return (
    <div className={styles.toast} role="status" onClick={() => dismiss(item.id)}>
      <span className={styles.icon} data-kind={item.kind}>
        <Icon style={{ width: 18, height: 18 }} />
      </span>
      <div className={styles.body}>
        <div className={styles.title}>{item.title}</div>
        {item.description ? <div className={styles.description}>{item.description}</div> : null}
      </div>
    </div>
  );
}

export function Toaster() {
  const items = useToastStore((state) => state.items);
  if (!items.length) return null;

  return (
    <div className={styles.root} data-scenario-controls>
      {items.map((item) => (
        <ToastCard key={item.id} item={item} />
      ))}
    </div>
  );
}
