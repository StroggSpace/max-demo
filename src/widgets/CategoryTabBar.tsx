import { NavLink, useLocation } from 'react-router-dom';

import styles from './CategoryTabBar.module.css';

interface Props {
  categoryId: string;
  tabs: { to: string; label: string; Icon: React.ComponentType<{ className?: string }> }[];
}

export function CategoryTabBar({ categoryId, tabs }: Props) {
  const { pathname } = useLocation();

  return (
    <nav className={styles.bar} aria-label="Разделы категории">
      <div className={styles.inner}>
        {tabs.map(({ to, label, Icon }) => {
          const href = `/category/${categoryId}/${to}`;
          const active = pathname.startsWith(href);
          return (
            <NavLink
              key={to}
              to={href}
              className={active ? `${styles.item} ${styles.active}` : styles.item}
            >
              <span className={styles.iconWrap}>
                <Icon className={styles.icon} />
              </span>
              <span className={styles.label}>{label}</span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
