import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Theme = 'light' | 'dark';
export type DemoStateMode = 'normal' | 'loading' | 'empty' | 'error';
export type HistoryKind = 'task' | 'promo' | 'level' | 'achievement' | 'points';

export interface Task {
  id: string;
  title: string;
  subtitle: string;
  reward: number;
  progress: number;
  goal: number;
  done: boolean;
}

export interface Promo {
  id: string;
  code: string;
  title: string;
  description: string;
  /** Сколько заданий нужно выполнить, чтобы открыть промокод */
  threshold: number;
}

export interface SeasonLevel {
  level: number;
  title: string;
  reward: string;
}

export interface HistoryItem {
  id: string;
  name: string;
  action: string;
  time: string;
  kind: HistoryKind;
}

interface DemoState {
  theme: Theme;
  autoplay: boolean;
  motionEnabled: boolean;
  demoState: DemoStateMode;

  balance: number;
  level: number;
  xp: number;
  xpMax: number;

  tasks: Task[];
  promos: Promo[];
  unlockedPromos: string[];
  seasonLevels: SeasonLevel[];
  achievements: string[];
  history: HistoryItem[];
  activePromo: Promo | null;

  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  setAutoplay: (value: boolean) => void;
  setMotionEnabled: (value: boolean) => void;
  setDemoState: (value: DemoStateMode) => void;

  addPoints: (value: number) => void;
  addXp: (value: number) => void;
  advanceTask: (index: number, by?: number) => void;
  completeTask: (index: number) => void;
  unlockAchievement: (id: string) => void;
  pushHistory: (name: string, action: string, kind: HistoryKind) => void;
  openPromo: (promo: Promo) => void;
  closePromo: () => void;

  resetTasks: () => void;
  resetSeason: () => void;
  resetAchievements: () => void;
  resetProfile: () => void;
  resetAll: () => void;
}

export const seasonLevels: SeasonLevel[] = [
  { level: 1, title: 'Новичок', reward: 'Базовые задания' },
  { level: 2, title: 'Участник', reward: 'Участие в розыгрышах' },
  { level: 3, title: 'Активный', reward: 'Кэшбэк 5%' },
  { level: 4, title: 'Привилегированный', reward: 'Промокод 500 ₽' },
  { level: 5, title: 'Амбассадор', reward: 'Скидка 15% и статус' },
];

export const promos: Promo[] = [
  {
    id: 'p1',
    code: 'START10',
    title: 'Скидка 10%',
    description: 'На первый заказ у партнёра.',
    threshold: 1,
  },
  {
    id: 'p2',
    code: 'BONUS500',
    title: '500 баллов',
    description: 'Зачисляются на баланс сразу после активации.',
    threshold: 2,
  },
  {
    id: 'p3',
    code: 'FREESHIP',
    title: 'Бесплатная доставка',
    description: 'Один заказ без стоимости доставки.',
    threshold: 3,
  },
  {
    id: 'p4',
    code: 'VIP15',
    title: 'Скидка 15% и статус',
    description: 'Особые условия на весь сезон.',
    threshold: 4,
  },
];

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

const initialHistory: HistoryItem[] = [
  { id: 'h1', name: 'Вы', action: 'активировали промокод START10', time: '1 ч', kind: 'promo' },
  { id: 'h2', name: 'Вы', action: 'получили 120 баллов за вход', time: '2 ч', kind: 'points' },
  { id: 'h3', name: 'Вы', action: 'вошли в приложение', time: '3 ч', kind: 'points' },
];

export const useDemoStore = create<DemoState>()(
  persist(
    (set, get) => ({
      theme: 'light',
      autoplay: true,
      motionEnabled: true,
      demoState: 'normal',

      balance: 1240,
      level: 1,
      xp: 120,
      xpMax: 300,

      tasks: initialTasks,
      promos,
      unlockedPromos: [],
      seasonLevels,
      achievements: [],
      history: initialHistory,
      activePromo: null,

      setTheme: (theme) => set({ theme }),
      toggleTheme: () => set({ theme: get().theme === 'light' ? 'dark' : 'light' }),
      setAutoplay: (autoplay) => set({ autoplay }),
      setMotionEnabled: (motionEnabled) => set({ motionEnabled }),
      setDemoState: (demoState) => set({ demoState }),

      addPoints: (value) => set((s) => ({ balance: Math.max(0, s.balance + value) })),

      addXp: (value) =>
        set((s) => {
          const total = s.xp + value;
          if (total >= s.xpMax) {
            const nextLevel = Math.min(5, s.level + 1);
            const leveled = s.level < 5;
            return {
              xp: leveled ? total - s.xpMax : s.xpMax,
              level: nextLevel,
            };
          }
          return { xp: total };
        }),

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
          const doneCount = tasks.filter((t) => t.done).length;

          // Промокод открывается по числу выполненных заданий.
          const newlyUnlocked = s.promos.filter(
            (promo) => promo.threshold <= doneCount && !s.unlockedPromos.includes(promo.id),
          );
          const unlockedPromos = [...s.unlockedPromos, ...newlyUnlocked.map((promo) => promo.id)];
          const activePromo = newlyUnlocked[0] ?? null;

          return {
            tasks,
            balance: s.balance + task.reward,
            xp: s.xp + Math.round(task.reward / 2),
            unlockedPromos,
            activePromo,
          };
        }),

      unlockAchievement: (id) =>
        set((s) =>
          s.achievements.includes(id) ? {} : { achievements: [...s.achievements, id] },
        ),

      pushHistory: (name, action, kind) =>
        set((s) => ({
          history: [
            {
              id: `h-${Date.now()}-${Math.random().toString(16).slice(2)}`,
              name,
              action,
              time: 'только что',
              kind,
            },
            ...s.history,
          ].slice(0, 20),
        })),

      openPromo: (promo) => set({ activePromo: promo }),
      closePromo: () => set({ activePromo: null }),

      resetTasks: () =>
        set({ tasks: initialTasks.map((t) => ({ ...t })), unlockedPromos: [], activePromo: null }),
      resetSeason: () => set({ level: 1, xp: 120, xpMax: 300 }),
      resetAchievements: () => set({ achievements: [] }),
      resetProfile: () => set({ history: initialHistory }),

      resetAll: () =>
        set({
          balance: 1240,
          level: 1,
          xp: 120,
          xpMax: 300,
          tasks: initialTasks.map((t) => ({ ...t })),
          unlockedPromos: [],
          achievements: [],
          history: initialHistory,
          activePromo: null,
        }),
    }),
    {
      name: 'max-demo',
      partialize: (s) => ({
        theme: s.theme,
        autoplay: s.autoplay,
        motionEnabled: s.motionEnabled,
        demoState: s.demoState,
      }),
    },
  ),
);
