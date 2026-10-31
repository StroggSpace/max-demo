export interface RouteMeta {
  title: string;
  subtitle?: string;
  back?: boolean;
}

export const routeMeta: Record<string, RouteMeta> = {
  '/': { title: 'Главная', subtitle: 'Демо мини-приложения MAX' },
  '/tasks': { title: 'Задания', subtitle: 'Выполняйте и получайте баллы' },
  '/giveaways': { title: 'Розыгрыши', subtitle: 'Промо-механики и призы' },
  '/shop': { title: 'Магазин', subtitle: 'Награды за баллы' },
  '/profile': { title: 'Профиль', subtitle: 'Личный кабинет участника' },
  '/settings': { title: 'Настройки', subtitle: 'Демо-режим', back: true },
};
