import { motion } from 'motion/react';
import { NavLink, useLocation } from 'react-router-dom';

import { useMotionControls } from '@/shared/motion/useMotionControls';
import styles from './CategoryTabBar.module.css';

interface Props {
  categoryId: string;
  tabs: { to: string; label: string; Icon: React.ComponentType<{ className?: string }> }[];
}

export function CategoryTabBar({ categoryId, tabs }: Props) {
  const { pathname } = useLocation();
  const { tap } = useMotionControls();

  return (
    <nav className={styles.bar} aria-label="Разделы категории">
      <div
        className={styles.inner}
        style={{ gridTemplateColumns: `repeat(${tabs.length}, minmax(0, 1fr))` }}
      >
        {tabs.map(({ to, label, Icon }) => {
          const href = `/category/${categoryId}/${to}`;
          const active = pathname.startsWith(href);

          return (
            <NavLink
              key={to}
              to={href}
              className={active ? `${styles.item} ${styles.active}` : styles.item}
            >
              <motion.span className={styles.tab} {...tap}>
                <span className={styles.iconWrap}>
                  <Icon className={styles.icon} />
                </span>
                <span className={`${styles.label} type-tab`}>{label}</span>
              </motion.span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
