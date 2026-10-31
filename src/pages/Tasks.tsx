import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { Flex, Panel, Typography } from '@maxhub/max-ui';

import { AppHeader } from '@/widgets/AppHeader';
import { ScenarioControls } from '@/features/scenario/ScenarioControls';
import { useSectionScenario } from '@/features/scenario/useSectionScenario';
import { scenarios } from '@/scenarios';
import { useDemoStore } from '@/store/demo';

const cardStyle = {
  padding: 16,
  borderRadius: 'var(--size-border-radius-semantic-border-radius-card)',
  background: 'var(--background-surface-card)',
} as const;

export function TasksPage() {
  const scenario = useSectionScenario(scenarios.tasks);
  const tasks = useDemoStore((s) => s.tasks);

  const done = tasks.filter((task) => task.done).length;
  const earned = tasks.filter((task) => task.done).reduce((sum, task) => sum + task.reward, 0);

  return (
    <div>
      <AppHeader title="Задания" subtitle="Выполняйте и получайте баллы" />

      <Panel style={cardStyle}>
        <Flex align="center" gap={12}>
          <Flex direction="column" gap={2} style={{ flex: 1 }}>
            <Typography.Body variant="small" style={{ color: 'var(--text-secondary)' }}>
              Выполнено
            </Typography.Body>
            <div className="balance" style={{ fontSize: 26 }}>
              {done}
              <small>из {tasks.length}</small>
            </div>
          </Flex>

          <Flex direction="column" gap={2} style={{ alignItems: 'flex-end' }}>
            <Typography.Body variant="small" style={{ color: 'var(--text-secondary)' }}>
              Заработано
            </Typography.Body>
            <div className="balance" style={{ fontSize: 26 }}>
              +{earned}
              <small>баллов</small>
            </div>
          </Flex>
        </Flex>
      </Panel>

      <Flex direction="column" gap={10} style={{ marginTop: 16 }}>
        {tasks.map((task) => {
          const percent = Math.round((task.progress / task.goal) * 100);
          return (
            <Panel
              key={task.id}
              style={{
                ...cardStyle,
                background: 'var(--background-surface-card)',
              }}
            >
              <Flex justify="space-between" align="flex-start" gap={12}>
                <Flex direction="column" gap={2} style={{ flex: 1, minWidth: 0 }}>
                  <Typography.Title variant="small-strong">{task.title}</Typography.Title>
                  <Typography.Body variant="small" style={{ color: 'var(--text-secondary)' }}>
                    {task.subtitle}
                  </Typography.Body>
                </Flex>

                {task.done ? (
                  <CheckCircleIcon
                    style={{
                      width: 26,
                      height: 26,
                      color: 'var(--icon-positive)',
                      flex: 'none',
                    }}
                  />
                ) : (
                  <Typography.Label
                    variant="small-strong"
                    style={{ color: 'var(--text-themed)', whiteSpace: 'nowrap' }}
                  >
                    +{task.reward}
                  </Typography.Label>
                )}
              </Flex>

              <div className="progress" style={{ marginTop: 12 }}>
                <div className="progress__bar" style={{ width: `${percent}%` }} />
              </div>

              <Flex justify="space-between" style={{ marginTop: 8 }}>
                <Typography.Label variant="small-caps" style={{ color: 'var(--text-tertiary)' }}>
                  {Math.min(task.progress, task.goal)} / {task.goal}
                </Typography.Label>
                <Typography.Label variant="small-caps" style={{ color: 'var(--text-tertiary)' }}>
                  {task.done ? 'Зачислено' : 'В процессе'}
                </Typography.Label>
              </Flex>
            </Panel>
          );
        })}
      </Flex>

      <ScenarioControls scenario={scenario} />
    </div>
  );
}
