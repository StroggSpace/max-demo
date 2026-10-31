import { useCallback, useEffect, useRef, useState } from 'react';

import { useDemoStore } from '@/store/demo';
import type { Scenario } from '@/scenarios/types';

export type ScenarioStatus = 'off' | 'playing' | 'paused' | 'done';

export interface ScenarioControlsApi {
  status: ScenarioStatus;
  start: () => void;
  pause: () => void;
  resume: () => void;
  toggle: () => void;
}

/**
 * Проигрывает сценарий раздела в демо-времени.
 * Останавливается при уходе с экрана, паузе, скрытой вкладке и действии пользователя.
 */
export function useSectionScenario(scenario: Scenario): ScenarioControlsApi {
  const autoplay = useDemoStore((s) => s.autoplay);
  const speed = useDemoStore((s) => s.speed);
  const disabled = useDemoStore((s) => s.disabled[scenario.id] ?? false);

  const [status, setStatus] = useState<ScenarioStatus>('off');
  const [runId, setRunId] = useState(0);

  const offsetRef = useRef(0);
  const elapsedRef = useRef(0);
  const doneRef = useRef<Set<number>>(new Set());
  const speedRef = useRef(speed);
  const totalRef = useRef(Math.max(...scenario.steps.map((step) => step.at), 1000) + 600);

  useEffect(() => {
    speedRef.current = speed;
  }, [speed]);

  const start = useCallback(() => {
    scenario.reset();
    offsetRef.current = 0;
    elapsedRef.current = 0;
    doneRef.current = new Set();
    setStatus('playing');
    setRunId((value) => value + 1);
  }, [scenario]);

  const pause = useCallback(() => {
    offsetRef.current = elapsedRef.current;
    setStatus('paused');
  }, []);

  const resume = useCallback(() => setStatus('playing'), []);

  // Автостарт: выключен глобально или для раздела — сценарий не играет.
  useEffect(() => {
    if (!autoplay || disabled) {
      setStatus('off');
      return;
    }
    if (status === 'off') start();
  }, [autoplay, disabled, status, start]);

  // Демо-часы: шаги выполняются по ускоренному времени.
  useEffect(() => {
    if (status !== 'playing') return;

    const begin = performance.now() - offsetRef.current / speedRef.current;
    let raf = 0;

    const loop = () => {
      const elapsed = (performance.now() - begin) * speedRef.current;
      elapsedRef.current = elapsed;

      scenario.steps.forEach((step, index) => {
        if (elapsed >= step.at && !doneRef.current.has(index)) {
          doneRef.current.add(index);
          step.run();
        }
      });

      if (doneRef.current.size === scenario.steps.length && elapsed >= totalRef.current) {
        setStatus('done');
        return;
      }

      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [status, runId, scenario]);

  // Пользователь тронул экран — сценарий уступает управление.
  useEffect(() => {
    if (status !== 'playing') return;

    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.closest('[data-scenario-controls]')) return;
      pause();
    };
    const onKeyDown = () => pause();
    const onVisibility = () => {
      if (document.hidden) pause();
    };

    window.addEventListener('pointerdown', onPointerDown, { capture: true });
    window.addEventListener('keydown', onKeyDown);
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      window.removeEventListener('pointerdown', onPointerDown, { capture: true });
      window.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [status, pause]);

  const toggle = useCallback(() => {
    if (status === 'playing') pause();
    else if (status === 'paused') resume();
    else start();
  }, [status, pause, resume, start]);

  return { status, start, pause, resume, toggle };
}
