import type { ComponentType } from 'react';
import {
  BoltIcon,
  ClipboardDocumentCheckIcon,
  GiftIcon,
  SparklesIcon,
  StarIcon,
} from '@heroicons/react/24/outline';

export interface Achievement {
  id: string;
  title: string;
  hint: string;
  Icon: ComponentType<{ className?: string; style?: React.CSSProperties }>;
}

export const achievements: Achievement[] = [
  { id: 'a_first', title: 'Первый вход', hint: 'Открыть приложение', Icon: StarIcon },
  {
    id: 'a_tasks',
    title: 'Первые задания',
    hint: 'Выполнить 2 задания',
    Icon: ClipboardDocumentCheckIcon,
  },
  { id: 'a_promo', title: 'Первый промокод', hint: 'Открыть промокод', Icon: GiftIcon },
  { id: 'a_level', title: 'Новый уровень', hint: 'Достичь уровня 2', Icon: BoltIcon },
  {
    id: 'a_active',
    title: 'Активный пользователь',
    hint: 'Заходить 7 дней подряд',
    Icon: SparklesIcon,
  },
];
