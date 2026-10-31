import { useDemoStore } from '@/store/demo';
import type { ScenarioControlsApi, ScenarioStatus } from './useSectionScenario';
import styles from './ScenarioControls.module.css';

const LABELS: Record<ScenarioStatus, string> = {
  off: 'Сценарий выключен',
  playing: 'Сценарий играет',
  paused: 'Пауза',
  done: 'Сценарий завершён',
};

interface Props {
  scenario: ScenarioControlsApi;
}

export function ScenarioControls({ scenario }: Props) {
  const autoplay = useDemoStore((s) => s.autoplay);
  const speed = useDemoStore((s) => s.speed);
  const setSpeed = useDemoStore((s) => s.setSpeed);

  if (!autoplay) return null;

  return (
    <div className={styles.root} data-scenario-controls>
      <span className={styles.dot} data-status={scenario.status} />
      <span className={styles.label}>{LABELS[scenario.status]}</span>

      <button
        type="button"
        className={styles.control}
        onClick={scenario.toggle}
        aria-label={scenario.status === 'playing' ? 'Пауза' : 'Продолжить'}
      >
        {scenario.status === 'playing' ? '❚❚' : '▶'}
      </button>

      <button
        type="button"
        className={styles.control}
        onClick={scenario.start}
        aria-label="Заново"
      >
        ↻
      </button>

      <button
        type="button"
        className={styles.speed}
        onClick={() => setSpeed(speed === 1 ? 2 : speed === 2 ? 4 : 1)}
        aria-label="Скорость сценария"
      >
        ×{speed}
      </button>
    </div>
  );
}
