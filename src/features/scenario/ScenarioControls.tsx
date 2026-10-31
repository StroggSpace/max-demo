import { ArrowPathIcon, PauseIcon, PlayIcon } from '@heroicons/react/24/solid';
import { Button, Flex, IconButton, Typography } from '@maxhub/max-ui';

import { useDemoStore } from '@/store/demo';
import type { ScenarioControlsApi, ScenarioStatus } from './useSectionScenario';
import styles from './ScenarioControls.module.css';

const LABELS: Record<ScenarioStatus, string> = {
  off: 'Сценарий выключен',
  playing: 'Сценарий играет',
  paused: 'Пауза',
  done: 'Сценарий завершён',
};

const DOT_COLOR: Record<ScenarioStatus, string> = {
  off: 'var(--text-tertiary)',
  playing: 'var(--text-positive)',
  paused: 'var(--text-neutral-themed)',
  done: 'var(--text-themed)',
};

export function ScenarioControls({ scenario }: { scenario: ScenarioControlsApi }) {
  const autoplay = useDemoStore((s) => s.autoplay);
  const speed = useDemoStore((s) => s.speed);
  const setSpeed = useDemoStore((s) => s.setSpeed);

  if (!autoplay) return null;

  return (
    <Flex
      align="center"
      gap={6}
      className={styles.root}
      data-scenario-controls
    >
      <span className={styles.dot} style={{ background: DOT_COLOR[scenario.status] }} />
      <Typography.Label variant="small-strong" style={{ color: 'var(--text-secondary)' }}>
        {LABELS[scenario.status]}
      </Typography.Label>

      <IconButton
        size="small"
        mode="secondary"
        onClick={scenario.toggle}
        aria-label={scenario.status === 'playing' ? 'Пауза' : 'Продолжить'}
      >
        {scenario.status === 'playing' ? (
          <PauseIcon style={{ width: 14, height: 14 }} />
        ) : (
          <PlayIcon style={{ width: 14, height: 14 }} />
        )}
      </IconButton>

      <IconButton
        size="small"
        mode="secondary"
        onClick={scenario.start}
        aria-label="Заново"
      >
        <ArrowPathIcon style={{ width: 14, height: 14 }} />
      </IconButton>

      <Button
        size="small"
        mode="tertiary"
        onClick={() => setSpeed(speed === 1 ? 2 : speed === 2 ? 4 : 1)}
      >
        ×{speed}
      </Button>
    </Flex>
  );
}
