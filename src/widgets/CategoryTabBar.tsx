import { NavLink, useLocation } from 'react-router-dom';

import styles from './CategoryTabBar.module.css';

interface Props {
  categoryId: string;
  tabs: { to: string; label: string }[];
}

export function CategoryTabBar({ categoryId, tabs }: Props) {
  const { pathname } = useLocation();

  return (
    <nav className={styles.bar} aria-label="Разделы категории">
      <div className={styles.inner}>
        {tabs.map((tab) => {
          const to = `/category/${categoryId}/${tab.to}`;
          const active = pathname.startsWith(to);
          return (
            <NavLink
              key={tab.to}
              to={to}
              className={active ? `${styles.item} ${styles.active}` : styles.item}
            >
              {tab.label}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
