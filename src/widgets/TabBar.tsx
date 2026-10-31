import { NavLink } from 'react-router-dom';
import {
  ClipboardDocumentListIcon,
  GiftIcon,
  HomeIcon,
  ShoppingBagIcon,
  UserIcon,
} from '@heroicons/react/24/outline';

import styles from './TabBar.module.css';

const items = [
  { to: '/', label: 'Главная', Icon: HomeIcon },
  { to: '/tasks', label: 'Задания', Icon: ClipboardDocumentListIcon },
  { to: '/giveaways', label: 'Розыгрыши', Icon: GiftIcon },
  { to: '/shop', label: 'Магазин', Icon: ShoppingBagIcon },
  { to: '/profile', label: 'Профиль', Icon: UserIcon },
] as const;

export function TabBar() {
  return (
    <nav className={styles.bar} aria-label="Разделы демо">
      {items.map(({ to, label, Icon }) => (
        <NavLink
          key={to}
          to={to}
          end={to === '/'}
          className={({ isActive }) => `${styles.item} ${isActive ? styles.active : ''}`}
        >
          <Icon className={styles.icon} />
          <span>{label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
