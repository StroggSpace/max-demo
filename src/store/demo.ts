import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Theme = 'light' | 'dark';
export type DemoStateMode = 'normal' | 'loading' | 'empty' | 'error';
export type SectionId = 'home' | 'tasks' | 'giveaways' | 'shop' | 'profile';
export type GiveawayPhase = 'idle' | 'lobby' | 'countdown' | 'result';
export type GiveawayResult = 'win' | 'lose' | null;
export type FeedKind = 'win' | 'reward';

export interface Task {
  id: string;
  title: string;
  subtitle: string;
  reward: number;
  progress: number;
  goal: number;
  done: boolean;
}

export interface FeedItem {
  id: string;
  name: string;
  action: string;
  time: string;
  kind?: FeedKind;
}

export interface Reward {
  id: string;
  title: string;
  subtitle: string;
  price: number;
  emoji: string;
  owned: boolean;
}

interface DemoState {
  theme: Theme;
  autoplay: boolean;
  demoState: DemoStateMode;

  balance: number;
  level: number;
  xp: number;
  xpMax: number;

  tasks: Task[];
  feed: FeedItem[];
  rewards: Reward[];
  achievements: string[];

  giveaway: {
    phase: GiveawayPhase;
    secondsLeft: number;
    participants: number;
    joined: boolean;
    result: GiveawayResult;
    prize: string;
  };

  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  setAutoplay: (value: boolean) => void;
  setDemoState: (value: DemoStateMode) => void;

  resetHome: () => void;
  resetTasks: () => void;
  resetGiveaway: () => void;
  resetShop: () => void;
  resetProfile: () => void;
  resetAll: () => void;

  addPoints: (value: number) => void;
  addXp: (value: number) => void;
  pushFeed: (name: string, action: string, kind?: FeedKind) => void;
  advanceTask: (index: number, by?: number) => void;
  completeTask: (index: number) => void;
  setGiveaway: (patch: Partial<DemoState['giveaway']>) => void;
  buyReward: (id: string) => void;
  unlock: (title: string) => void;
}

const initialTasks: Task[] = [
  {
    id: 't1',
    title: 'Подписаться на канал бренда',
    subtitle: 'Проверяем автоматически',
    reward: 50,
    progress: 0,
    goal: 1,
    done: false,
  },
  {
    id: 't2',
    title: 'Пригласить друга',
    subtitle: 'Начисляем после первого входа',
    reward: 150,
    progress: 0,
    goal: 1,
    done: false,
  },
  {
    id: 't3',
    title: 'Сделать 3 покупки',
    subtitle: 'Любая сумма, засчитываем чек',
    reward: 200,
    progress: 0,
    goal: 3,
    done: false,
  },
  {
    id: 't4',
    title: 'Заполнить профиль',
    subtitle: 'Имя и телефон уже есть',
    reward: 30,
    progress: 0,
    goal: 1,
    done: false,
  },
];

const initialRewards: Reward[] = [
  { id: 'r1', title: 'Кофе в подарок', subtitle: 'Партнёр рядом с вами', price: 300, emoji: '☕️', owned: false },
  { id: 'r2', title: 'Скидка 15%', subtitle: 'На следующий заказ', price: 500, emoji: '🏷️', owned: false },
  { id: 'r3', title: 'Сертификат 1000 ₽', subtitle: 'Магазин партнёра', price: 1200, emoji: '🎁', owned: false },
  { id: 'r4', title: 'Доставка бесплатно', subtitle: 'Один заказ', price: 400, emoji: '🚀', owned: false },
  { id: 'r5', title: 'Мерч бренда', subtitle: 'Ограниченная серия', price: 2000, emoji: '🧢', owned: false },
  { id: 'r6', title: 'Билет на событие', subtitle: 'Закрытый показ', price: 3000, emoji: '🎟️', owned: false },
];

const initialFeed: FeedItem[] = [
  { id: 'f1', name: 'Анна', action: 'получила 200 баллов за покупку', time: '5 мин' },
  { id: 'f2', name: 'Игорь', action: 'выиграл сертификат 1000 ₽', time: '18 мин', kind: 'win' },
  { id: 'f3', name: 'Марафон', action: 'новый сезон «Весенний марафон»', time: '1 ч' },
];

const baseGiveaway: DemoState['giveaway'] = {
  phase: 'idle',
  secondsLeft: 42,
  participants: 128,
  joined: false,
  result: null,
  prize: 'Сертификат 1000 ₽',
};

export const useDemoStore = create<DemoState>()(
  persist(
    (set, get) => ({
      theme: 'light',
      autoplay: true,
      demoState: 'normal',

      balance: 1240,
      level: 3,
      xp: 140,
      xpMax: 300,

      tasks: initialTasks,
      feed: initialFeed,
      rewards: initialRewards,
      achievements: [],
      giveaway: baseGiveaway,

      setTheme: (theme) => set({ theme }),
      toggleTheme: () => set({ theme: get().theme === 'light' ? 'dark' : 'light' }),
      setAutoplay: (autoplay) => set({ autoplay }),
      setDemoState: (demoState) => set({ demoState }),

      resetHome: () => set({ balance: 1240, level: 3, xp: 140, xpMax: 300, feed: initialFeed }),
      resetTasks: () => set({ tasks: initialTasks.map((t) => ({ ...t })) }),
      resetGiveaway: () => set({ giveaway: { ...baseGiveaway } }),
      resetShop: () => set({ rewards: initialRewards.map((r) => ({ ...r })), balance: 1240 }),
      resetProfile: () => set({ achievements: [] }),

      resetAll: () =>
        set({
          balance: 1240,
          level: 3,
          xp: 140,
          xpMax: 300,
          tasks: initialTasks.map((t) => ({ ...t })),
          feed: initialFeed,
          rewards: initialRewards.map((r) => ({ ...r })),
          achievements: [],
          giveaway: { ...baseGiveaway },
        }),

      addPoints: (value) => set((s) => ({ balance: Math.max(0, s.balance + value) })),
      addXp: (value) =>
        set((s) => {
          const total = s.xp + value;
          if (total >= s.xpMax) {
            return { xp: total - s.xpMax, level: s.level + 1 };
          }
          return { xp: total };
        }),
      pushFeed: (name, action, kind) =>
        set((s) => ({
          feed: [
            {
              id: `f-${Date.now()}-${Math.random().toString(16).slice(2)}`,
              name,
              action,
              time: 'только что',
              kind,
            },
            ...s.feed,
          ].slice(0, 12),
        })),

      advanceTask: (index, by = 1) =>
        set((s) => ({
          tasks: s.tasks.map((task, i) => {
            if (i !== index) return task;
            const progress = Math.min(task.goal, task.progress + by);
            return { ...task, progress, done: progress >= task.goal };
          }),
        })),
      completeTask: (index) =>
        set((s) => {
          const task = s.tasks[index];
          if (!task || task.done) return {};
          const tasks = s.tasks.map((t, i) =>
            i === index ? { ...t, progress: t.goal, done: true } : t,
          );
          return { tasks, balance: s.balance + task.reward, xp: s.xp + Math.round(task.reward / 2) };
        }),

      setGiveaway: (patch) => set((s) => ({ giveaway: { ...s.giveaway, ...patch } })),

      buyReward: (id) =>
        set((s) => {
          const reward = s.rewards.find((r) => r.id === id);
          if (!reward || reward.owned || s.balance < reward.price) return {};
          return {
            balance: s.balance - reward.price,
            rewards: s.rewards.map((r) => (r.id === id ? { ...r, owned: true } : r)),
          };
        }),

      unlock: (title) =>
        set((s) => (s.achievements.includes(title) ? {} : { achievements: [...s.achievements, title] })),
    }),
    {
      name: 'max-demo',
      partialize: (s) => ({ theme: s.theme, autoplay: s.autoplay, demoState: s.demoState }),
    },
  ),
);
