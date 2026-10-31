import { useEffect } from 'react';

import { useDemoStore } from '@/store/demo';

/**
 * Обратный отсчёт розыгрыша в демо-времени.
 * Работает только в фазе отсчёта и ускоряется вместе со сценарием.
 */
export function useGiveawayTicker() {
  const phase = useDemoStore((s) => s.giveaway.phase);
  const speed = useDemoStore((s) => s.speed);

  useEffect(() => {
    if (phase !== 'countdown') return;

    const timer = window.setInterval(() => {
      const current = useDemoStore.getState().giveaway;
      if (current.phase !== 'countdown' || current.secondsLeft <= 0) return;
      useDemoStore.getState().setGiveaway({ secondsLeft: current.secondsLeft - 1 });
    }, 1000 / speed);

    return () => window.clearInterval(timer);
  }, [phase, speed]);
}
