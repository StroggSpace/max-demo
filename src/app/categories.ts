import type { ComponentType } from 'react';
import {
  ChatBubbleLeftRightIcon,
  ShoppingBagIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';

export type CategoryId = 'retention' | 'sales' | 'service';

export interface Category {
  id: CategoryId;
  title: string;
  subtitle: string;
  Icon: ComponentType<{ className?: string; style?: React.CSSProperties }>;
  gradient: string;
  stub?: boolean;
  tabs?: { to: string; label: string }[];
}

export const categories: Category[] = [
  {
    id: 'retention',
    title: 'Удержание / геймификация',
    subtitle: 'Сезоны, задания, достижения, профиль',
    Icon: SparklesIcon,
    gradient: 'linear-gradient(135deg, #0a63ff, #7c5cff)',
    tabs: [
      { to: 'season', label: 'Сезон' },
      { to: 'tasks', label: 'Задания' },
      { to: 'achievements', label: 'Достижения' },
      { to: 'profile', label: 'Профиль' },
    ],
  },
  {
    id: 'sales',
    title: 'Продажи',
    subtitle: 'Витрина, промокоды, розыгрыши',
    Icon: ShoppingBagIcon,
    gradient: 'linear-gradient(135deg, #12b76a, #0a63ff)',
    stub: true,
  },
  {
    id: 'service',
    title: 'Сервис / коммуникация',
    subtitle: 'Личный кабинет, бот-сценарии, QR',
    Icon: ChatBubbleLeftRightIcon,
    gradient: 'linear-gradient(135deg, #f79009, #f04438)',
    stub: true,
  },
];

export const categoryById = (id: string) => categories.find((category) => category.id === id);
