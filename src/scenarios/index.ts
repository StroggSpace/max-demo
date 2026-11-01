import { useDemoStore } from '@/store/demo';
import { useSalesStore } from '@/store/sales';
import type { Scenario } from './types';

const s = () => useDemoStore.getState();
const sales = () => useSalesStore.getState();

export const seasonScenario: Scenario = {
  id: 'season',
  title: 'Сезон',
  reset: () => s().resetSeason(),
  steps: [
    { at: 700, run: () => s().addXp(100) },
    { at: 1500, run: () => s().pushHistory('Вы', 'получили 60 XP', 'level') },
    { at: 2300, run: () => s().addXp(100) },
    { at: 3000, run: () => s().addXp(60) },
    { at: 3600, run: () => s().pushHistory('Вы', 'получили 120 XP', 'level') },
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
    { at: 700, run: () => s().pushHistory('Вы', 'открыли сезон «Весенний марафон»', 'level') },
    { at: 1500, run: () => s().addPoints(120) },
    { at: 2200, run: () => s().pushHistory('Вы', 'получили 120 баллов', 'points') },
    { at: 2900, run: () => s().unlockAchievement('a_active') },
    { at: 3600, run: () => s().pushHistory('Вы', 'открыли достижение «Активный пользователь»', 'achievement') },
  ],
};

export const shopScenario: Scenario = {
  id: 'sales-shop',
  title: 'Витрина',
  reset: () => sales().resetShop(),
  steps: [
    { at: 500, run: () => sales().addToCart('s1') },
    { at: 1200, run: () => sales().applyPromo('START10') },
    { at: 2200, run: () => sales().placeOrder() },
  ],
};

export const salesGiveawayScenario: Scenario = {
  id: 'sales-giveaway',
  title: 'Розыгрыши',
  reset: () => sales().resetGiveaway(),
  steps: [
    { at: 400, run: () => sales().setGiveaway({ phase: 'countdown', secondsLeft: 38 }) },
    { at: 1200, run: () => sales().setGiveaway({ participants: 268 }) },
    { at: 1800, run: () => sales().setGiveaway({ joined: true }) },
    { at: 3200, run: () => sales().setGiveaway({ participants: 341 }) },
    { at: 6200, run: () => sales().setGiveaway({ phase: 'result', result: 'win', secondsLeft: 0 }) },
  ],
};

export const referralScenario: Scenario = {
  id: 'sales-referral',
  title: 'Рефералка',
  reset: () => sales().resetReferral(),
  steps: [
    { at: 700, run: () => sales().addInvite('Ольга') },
    { at: 1700, run: () => sales().addInvite('Дмитрий') },
    { at: 2700, run: () => sales().addInvite('Софья') },
  ],
};

export const scenarios: Record<string, Scenario> = {
  season: seasonScenario,
  achievements: achievementsScenario,
  profile: profileScenario,
  'sales-shop': shopScenario,
  'sales-giveaway': salesGiveawayScenario,
  'sales-referral': referralScenario,
};
