import { CheckCircleIcon, LockClosedIcon } from '@heroicons/react/24/solid';
import { Flex, Typography } from '@maxhub/max-ui';

import { Card, Chip, ListCard, Progress, Section, StateGate } from '@/shared/ui/kit';
import { useSectionScenario } from '@/features/scenario/useSectionScenario';
import { scenarios } from '@/scenarios';
import { useDemoStore } from '@/store/demo';
import styles from './TasksTab.module.css';

export function TasksTab() {
  useSectionScenario(scenarios.tasks);

  const tasks = useDemoStore((s) => s.tasks);
  const promos = useDemoStore((s) => s.promos);
  const unlockedPromos = useDemoStore((s) => s.unlockedPromos);

  const done = tasks.filter((task) => task.done).length;
  const total = tasks.length;
  const progress = total ? (done / total) * 100 : 0;

  return (
    <div className={styles.page}>
      <StateGate emptyTitle="Заданий пока нет">
        <Card>
          <Flex justify="space-between" align="center">
            <Typography.Title variant="medium-strong">Прогресс заданий</Typography.Title>
            <Typography.Body variant="small" className={styles.muted}>
              {done} из {total}
            </Typography.Body>
          </Flex>

          <div className={styles.progressWrap}>
            <div className={styles.progress}>
              <Progress value={progress} />
            </div>

            <div className={styles.markers}>
              {promos.map((promo) => (
                <span
                  key={promo.id}
                  className={styles.marker}
                  style={{ left: `${(promo.threshold / total) * 100}%` }}
                  data-unlocked={unlockedPromos.includes(promo.id) ? 'true' : undefined}
                />
              ))}
            </div>
          </div>

          <Typography.Body variant="small" className={styles.muted}>
            Выполняйте задания — на каждом брейкпоинте открывается промокод.
          </Typography.Body>
        </Card>

        <Section title="Задания">
          <div className={styles.taskList}>
            {tasks.map((task) => (
              <Card key={task.id}>
                <Flex justify="space-between" align="flex-start" gap={12}>
                  <Flex direction="column" gap={2} className={styles.grow}>
                    <Typography.Title variant="small-strong">{task.title}</Typography.Title>
                    <Typography.Body variant="small" className={styles.muted}>
                      {task.subtitle}
                    </Typography.Body>
                  </Flex>

                  {task.done ? (
                    <CheckCircleIcon className={styles.check} />
                  ) : (
                    <Chip>+{task.reward}</Chip>
                  )}
                </Flex>

                <div className={styles.taskProgress}>
                  <Progress value={(task.progress / task.goal) * 100} height="s" />
                </div>
              </Card>
            ))}
          </div>
        </Section>

        <Section title="Промокоды">
          <ListCard>
            {promos.map((promo) => {
              const unlocked = unlockedPromos.includes(promo.id);
              return (
                <div className={styles.promoRow} key={promo.id}>
                  <span className={styles.promoIcon} data-unlocked={unlocked ? 'true' : undefined}>
                    {unlocked ? (
                      <CheckCircleIcon className={styles.promoCheck} />
                    ) : (
                      <LockClosedIcon className={styles.promoLock} />
                    )}
                  </span>

                  <div className={styles.promoBody}>
                    <div className={styles.promoTitle}>{promo.title}</div>
                    <div className={styles.promoCode}>{unlocked ? promo.code : `за ${promo.threshold} задания`}</div>
                  </div>

                  <Chip tone={unlocked ? 'success' : 'muted'}>{unlocked ? 'Открыт' : 'Закрыт'}</Chip>
                </div>
              );
            })}
          </ListCard>
        </Section>
      </StateGate>
    </div>
  );
}
