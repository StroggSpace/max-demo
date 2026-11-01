import { useDemoStore } from '@/store/demo';
import type { Scenario } from './types';

const s = () => useDemoStore.getState();

export const seasonScenario: Scenario = {
  id: 'season',
  title: 'Сезон',
  reset: () => s().resetSeason(),
  steps: [
    { at: 700, run: () => s().addXp(60) },
    { at: 1500, run: () => s().pushHistory('Вы', 'получили 60 XP', 'level') },
    { at: 2300, run: () => s().addXp(80) },
    { at: 3000, run: () => s().addXp(40) },
    { at: 3600, run: () => s().pushHistory('Вы', 'получили 120 XP', 'level') },
  ],
};

export const tasksScenario: Scenario = {
  id: 'tasks',
  title: 'Задания',
  reset: () => s().resetTasks(),
  steps: [
    { at: 600, run: () => s().completeTask(0) },
    { at: 900, run: () => s().pushHistory('Вы', 'выполнили задание «Подписка»', 'task') },
    { at: 1700, run: () => s().completeTask(3) },
    { at: 2000, run: () => s().pushHistory('Вы', 'выполнили задание «Профиль»', 'task') },
    { at: 2700, run: () => s().advanceTask(2, 1) },
    { at: 3200, run: () => s().advanceTask(2, 1) },
    { at: 3700, run: () => s().advanceTask(2, 1) },
    { at: 4200, run: () => s().completeTask(2) },
    { at: 4500, run: () => s().pushHistory('Вы', 'выполнили задание «3 покупки»', 'task') },
    { at: 5100, run: () => s().completeTask(1) },
    { at: 5400, run: () => s().pushHistory('Вы', 'выполнили задание «Пригласить друга»', 'task') },
  ],
};

export const achievementsScenario: Scenario = {
  id: 'achievements',
  title: 'Достижения',
  reset: () => s().resetAchievements(),
  steps: [
    { at: 600, run: () => s().unlockAchievement('a_first') },
    { at: 1500, run: () => s().unlockAchievement('a_tasks') },
    { at: 2400, run: () => s().pushHistory('Вы', 'открыли достижение «Первые задания»', 'achievement') },
    { at: 3200, run: () => s().unlockAchievement('a_promo') },
    { at: 4100, run: () => s().pushHistory('Вы', 'открыли достижение «Первый промокод»', 'achievement') },
  ],
};

export const profileScenario: Scenario = {
  id: 'profile',
  title: 'Профиль',
  reset: () => s().resetProfile(),
  steps: [
    { at: 700, run: () => s().pushHistory('Вы', 'вошли в приложение', 'points') },
    { at: 1500, run: () => s().addPoints(120) },
    { at: 2200, run: () => s().pushHistory('Вы', 'получили 120 баллов', 'points') },
    { at: 2900, run: () => s().unlockAchievement('a_active') },
    { at: 3600, run: () => s().pushHistory('Вы', 'открыли достижение «Активный пользователь»', 'achievement') },
  ],
};

export const scenarios: Record<string, Scenario> = {
  season: seasonScenario,
  tasks: tasksScenario,
  achievements: achievementsScenario,
  profile: profileScenario,
};
