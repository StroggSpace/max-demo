import { NavLink } from 'react-router-dom';

import styles from './TabBar.module.css';

const items = [
  { to: '/', label: 'Главная', icon: 'home' },
  { to: '/tasks', label: 'Задания', icon: 'tasks' },
  { to: '/giveaways', label: 'Розыгрыши', icon: 'gift' },
  { to: '/shop', label: 'Магазин', icon: 'shop' },
  { to: '/profile', label: 'Профиль', icon: 'user' },
] as const;

type IconName = (typeof items)[number]['icon'];

function Icon({ name }: { name: IconName }) {
  const common = {
    width: 22,
    height: 22,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };

  switch (name) {
    case 'home':
      return (
        <svg {...common}>
          <path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1z" />
        </svg>
      );
    case 'tasks':
      return (
        <svg {...common}>
          <path d="M9 6h10M9 12h10M9 18h10" />
          <path d="m3.5 6 1.5 1.5L7.5 5M3.5 12l1.5 1.5L7.5 11M3.5 18l1.5 1.5L7.5 17" />
        </svg>
      );
    case 'gift':
      return (
        <svg {...common}>
          <path d="M4 11h16v9H4z" />
          <path d="M2 7h20v4H2zM12 7v13" />
          <path d="M12 7S10.5 3 8 3a2.5 2.5 0 0 0 0 4M12 7s1.5-4 4-4a2.5 2.5 0 0 1 0 4" />
        </svg>
      );
    case 'shop':
      return (
        <svg {...common}>
          <path d="M5 8h14l-1.2 12H6.2z" />
          <path d="M9 8V6a3 3 0 0 1 6 0v2" />
        </svg>
      );
    case 'user':
      return (
        <svg {...common}>
          <circle cx="12" cy="8" r="3.6" />
          <path d="M4.5 20c1.2-3.6 4-5.4 7.5-5.4s6.3 1.8 7.5 5.4" />
        </svg>
      );
  }
}

export function TabBar() {
  return (
    <nav className={styles.bar} aria-label="Разделы демо">
      {items.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.to === '/'}
          className={({ isActive }) => `${styles.item} ${isActive ? styles.active : ''}`}
        >
          <Icon name={item.icon} />
          <span>{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
