import { useDemoStore } from '@/store/demo';
import { toast } from '@/shared/ui/toast/toastStore';
import type { Scenario } from './types';

const s = () => useDemoStore.getState();

export const homeScenario: Scenario = {
  id: 'home',
  title: 'Главная: баллы и прогресс',
  reset: () => s().resetHome(),
  steps: [
    { at: 400, run: () => s().pushFeed('Вы открыли приложение', true) },
    { at: 900, run: () => s().addPoints(120) },
    { at: 1200, run: () => s().addXp(60) },
    { at: 1600, run: () => toast.success('+120 баллов', 'Бонус за вход в приложение') },
    { at: 2400, run: () => s().addPoints(80) },
    { at: 2800, run: () => s().addXp(70) },
    { at: 3200, run: () => s().pushFeed('Анна обменяла 500 баллов на скидку', true) },
    {
      at: 3600,
      run: () => {
        s().unlock('Первый вход');
        toast.reward('Достижение открыто', 'Первый вход');
      },
    },
  ],
};

export const tasksScenario: Scenario = {
  id: 'tasks',
  title: 'Задания: выполнение и награды',
  reset: () => s().resetTasks(),
  steps: [
    {
      at: 700,
      run: () => {
        s().completeTask(0);
        toast.success('Задание выполнено', '+50 баллов за подписку');
      },
    },
    { at: 1100, run: () => s().pushFeed('Задание «Подписаться на канал» +50') },
    {
      at: 1800,
      run: () => {
        s().completeTask(3);
        toast.success('Профиль заполнен', '+30 баллов');
      },
    },
    { at: 2100, run: () => s().pushFeed('Задание «Заполнить профиль» +30') },
    { at: 2800, run: () => s().advanceTask(2, 1) },
    { at: 3300, run: () => s().advanceTask(2, 1) },
    { at: 3800, run: () => s().advanceTask(2, 1) },
    {
      at: 4300,
      run: () => {
        s().completeTask(2);
        toast.success('Задание выполнено', '+200 баллов за покупки');
      },
    },
    { at: 4600, run: () => s().pushFeed('Задание «3 покупки» +200', true) },
    {
      at: 5200,
      run: () => {
        s().unlock('Первые задания');
        toast.reward('Достижение открыто', 'Первые задания');
      },
    },
  ],
};

export const giveawaysScenario: Scenario = {
  id: 'giveaways',
  title: 'Розыгрыш: отсчёт и результат',
  reset: () => s().resetGiveaway(),
  steps: [
    { at: 400, run: () => s().setGiveaway({ phase: 'lobby', secondsLeft: 42 }) },
    { at: 900, run: () => s().setGiveaway({ phase: 'countdown' }) },
    { at: 1600, run: () => s().setGiveaway({ participants: 240 }) },
    { at: 2200, run: () => s().setGiveaway({ joined: true }) },
    { at: 2500, run: () => toast.info('Заявка принята', 'Ожидайте результат') },
    { at: 2600, run: () => s().pushFeed('Вы участвуете в розыгрыше', true) },
    { at: 3400, run: () => s().setGiveaway({ participants: 312 }) },
    { at: 7000, run: () => s().setGiveaway({ phase: 'result', result: 'win', secondsLeft: 0 }) },
    { at: 7200, run: () => toast.reward('Вы выиграли!', 'Сертификат 1000 ₽') },
    { at: 7400, run: () => s().addPoints(1000) },
    { at: 7800, run: () => s().pushFeed('Вы выиграли сертификат 1000 ₽', true) },
    { at: 8200, run: () => s().unlock('Первый выигрыш') },
  ],
};

export const shopScenario: Scenario = {
  id: 'shop',
  title: 'Магазин: покупка за баллы',
  reset: () => s().resetShop(),
  steps: [
    {
      at: 800,
      run: () => {
        s().buyReward('r2');
        toast.reward('Награда ваша', 'Скидка 15%');
      },
    },
    { at: 1100, run: () => s().pushFeed('Вы обменяли баллы на «Скидка 15%»') },
    { at: 1900, run: () => s().addPoints(300) },
    {
      at: 2400,
      run: () => {
        s().buyReward('r1');
        toast.reward('Награда ваша', 'Кофе в подарок');
      },
    },
    { at: 2700, run: () => s().pushFeed('Вы обменяли баллы на «Кофе в подарок»', true) },
    {
      at: 3400,
      run: () => {
        s().unlock('Первый обмен');
        toast.reward('Достижение открыто', 'Первый обмен');
      },
    },
  ],
};

export const profileScenario: Scenario = {
  id: 'profile',
  title: 'Профиль: достижения и уровень',
  reset: () => s().resetProfile(),
  steps: [
    { at: 600, run: () => s().unlock('Первый вход') },
    { at: 1400, run: () => s().unlock('Участник розыгрыша') },
    {
      at: 2000,
      run: () => toast.reward('Достижение открыто', 'Участник розыгрыша'),
    },
    { at: 2200, run: () => s().addXp(120) },
    {
      at: 3000,
      run: () => {
        s().unlock('Активный пользователь');
        toast.reward('Достижение открыто', 'Активный пользователь');
      },
    },
    { at: 3800, run: () => s().pushFeed('Новое достижение: «Активный пользователь»', true) },
  ],
};

export const scenarios = {
  home: homeScenario,
  tasks: tasksScenario,
  giveaways: giveawaysScenario,
  shop: shopScenario,
  profile: profileScenario,
} satisfies Record<string, Scenario>;
