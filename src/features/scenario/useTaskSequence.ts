import { useEffect } from 'react';

import { useDemoStore } from '@/store/demo';

/**
 * Последовательное выполнение заданий:
 * задание → модалка промокода → закрытие (авто или вручную) → следующее задание.
 */
export function useTaskSequence() {
  const autoplay = useDemoStore((s) => s.autoplay);
  const demoState = useDemoStore((s) => s.demoState);
  const enabled = autoplay && demoState === 'normal';

  useEffect(() => {
    if (!enabled) return;

    let cancelled = false;
    useDemoStore.getState().resetTasks();

    const sleep = (ms: number) => new Promise<void>((resolve) => window.setTimeout(resolve, ms));

    const waitModalClose = () =>
      new Promise<void>((resolve) => {
        const unsubscribe = useDemoStore.subscribe((state) => {
          if (!state.activePromo) {
            unsubscribe();
            resolve();
          }
        });
      });

    const run = async () => {
      const total = useDemoStore.getState().tasks.length;

      for (let index = 0; index < total; index += 1) {
        if (cancelled) return;
        await sleep(700);
        if (cancelled) return;

        const state = useDemoStore.getState();
        const task = state.tasks[index];
        if (!task || task.done) continue;

        state.completeTask(index);
        state.pushHistory('Вы', `выполнили задание «${task.title}»`, 'task');

        if (useDemoStore.getState().activePromo) {
          await waitModalClose();
        }
        if (cancelled) return;

        await sleep(500);
      }
    };

    void run();

    return () => {
      cancelled = true;
      useDemoStore.getState().closePromo();
    };
  }, [enabled]);
}
