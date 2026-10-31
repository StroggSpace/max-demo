import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { Flex, Typography } from '@maxhub/max-ui';

import { Balance, Card, Chip, PageTitle, Progress, Section, StateGate } from '@/shared/ui/kit';
import { useSectionScenario } from '@/features/scenario/useSectionScenario';
import { scenarios } from '@/scenarios';
import { useDemoStore } from '@/store/demo';
import styles from './Tasks.module.css';

export function TasksPage() {
  useSectionScenario(scenarios.tasks);
  const tasks = useDemoStore((s) => s.tasks);

  const done = tasks.filter((task) => task.done).length;
  const earned = tasks.filter((task) => task.done).reduce((sum, task) => sum + task.reward, 0);

  return (
    <div className={styles.page}>
      <PageTitle title="Задания" subtitle="Выполняйте и получайте баллы" />
      <StateGate emptyTitle="Заданий пока нет" emptyText="Новые задания появятся в следующем сезоне акции.">
        <Card>
          <Flex justify="space-between" align="center">
            <Flex direction="column" gap={4}>
              <Typography.Body variant="small" className={styles.muted}>
                Выполнено
              </Typography.Body>
              <Balance value={done} caption={`из ${tasks.length}`} size="m" />
            </Flex>

            <Chip tone="accent">+{earned} баллов</Chip>
          </Flex>
        </Card>

        <Section title="Все задания" after={`${done} из ${tasks.length}`}>
          {tasks.map((task) => (
            <Card key={task.id}>
              <div className={task.done ? styles.done : undefined}>
              <Flex justify="space-between" align="flex-start" gap={12}>
                <Flex direction="column" gap={4} className={styles.grow}>
                  <Typography.Title variant="small-strong">{task.title}</Typography.Title>
                  <Typography.Body variant="small" className={styles.muted}>
                    {task.subtitle}
                  </Typography.Body>
                </Flex>

                {task.done ? (
                  <CheckCircleIcon className={styles.check} />
                ) : (
                  <Typography.Label variant="small-strong" className={styles.reward}>
                    +{task.reward}
                  </Typography.Label>
                )}
              </Flex>

              <div className={styles.progress}>
                <Progress value={(task.progress / task.goal) * 100} height="s" />
              </div>

              <Flex justify="space-between">
                <Typography.Label variant="small-caps" className={styles.meta}>
                  {Math.min(task.progress, task.goal)} / {task.goal}
                </Typography.Label>
                <Typography.Label variant="small-caps" className={styles.meta}>
                  {task.done ? 'Зачислено' : 'В процессе'}
                </Typography.Label>
              </Flex>
              </div>
            </Card>
          ))}
        </Section>
      </StateGate>
    </div>
  );
}
