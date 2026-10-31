import { useCallback, useEffect } from 'react';

import { useDemoStore } from '@/store/demo';
import type { Scenario } from '@/scenarios/types';

/**
 * Проигрывает сценарий раздела в демо-времени.
 * Включается только в обычном состоянии при включённом автоплее.
 */
export function useSectionScenario(scenario: Scenario) {
  const autoplay = useDemoStore((s) => s.autoplay);
  const demoState = useDemoStore((s) => s.demoState);
  const enabled = autoplay && demoState === 'normal';

  const start = useCallback(() => {
    scenario.reset();

    const startedAt = performance.now();
    const done = new Set<number>();
    let raf = 0;

    const loop = () => {
      const elapsed = performance.now() - startedAt;

      scenario.steps.forEach((step, index) => {
        if (elapsed >= step.at && !done.has(index)) {
          done.add(index);
          step.run();
        }
      });

      if (done.size === scenario.steps.length) return;
      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [scenario]);

  useEffect(() => {
    if (!enabled) return;
    return start();
  }, [enabled, start]);
}
