import {
  BellIcon,
  CheckCircleIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  UserPlusIcon,
} from '@heroicons/react/24/outline';
import { CheckCircleIcon as CheckSolid, LockClosedIcon as LockSolid } from '@heroicons/react/24/solid';
import { Flex, Typography } from '@maxhub/max-ui';

import { Card, Chip, Progress, RingProgress, Section, StateGate } from '@/shared/ui/kit';
import { useTaskSequence } from '@/features/scenario/useTaskSequence';
import { useDemoStore } from '@/store/demo';
import styles from './TasksTab.module.css';

const taskIcons = [BellIcon, UserPlusIcon, ShoppingBagIcon, UserCircleIcon];

export function TasksTab() {
  useTaskSequence();

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
          <Flex align="center" gap={16}>
            <RingProgress value={progress} size={88}>
              <div className={styles.ringText}>
                <span className={styles.ringValue}>{done}</span>
                <span className={styles.ringLabel}>из {total}</span>
              </div>
            </RingProgress>

            <div className={styles.summaryBody}>
              <Typography.Title variant="medium-strong">Прогресс заданий</Typography.Title>
              <Typography.Body variant="small" className={styles.muted}>
                Открыто {unlockedPromos.length} из {promos.length} промокодов
              </Typography.Body>

              <div className={styles.breakpoints}>
                {promos.map((promo) => {
                  const unlocked = unlockedPromos.includes(promo.id);
                  return (
                    <span
                      key={promo.id}
                      className={styles.breakpoint}
                      data-unlocked={unlocked ? 'true' : undefined}
                    >
                      {unlocked ? (
                        <CheckSolid className={styles.breakpointIcon} />
                      ) : (
                        <LockSolid className={styles.breakpointIcon} />
                      )}
                    </span>
                  );
                })}
              </div>
            </div>
          </Flex>
        </Card>

        <Section title="Задания" after={`${done} из ${total}`}>
          <div className={styles.taskList}>
            {tasks.map((task, index) => {
              const Icon = taskIcons[index] ?? BellIcon;
              return (
                <Card key={task.id}>
                  <Flex align="flex-start" gap={12}>
                    <span className={styles.taskIcon} data-done={task.done ? 'true' : undefined}>
                      <Icon className={styles.taskGlyph} />
                    </span>

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
              );
            })}
          </div>
        </Section>

        <Section title="Промокоды" after={`${unlockedPromos.length} из ${promos.length}`}>
          <div className={styles.promoList}>
            {promos.map((promo) => {
              const unlocked = unlockedPromos.includes(promo.id);
              return (
                <div
                  key={promo.id}
                  className={styles.ticket}
                  data-unlocked={unlocked ? 'true' : undefined}
                >
                  <div className={styles.ticketMain}>
                    <span className={styles.ticketLabel}>{promo.title}</span>
                    <span className={styles.ticketCode}>
                      {unlocked ? promo.code : '••••••'}
                    </span>
                  </div>

                  <div className={styles.ticketSide}>
                    {unlocked ? (
                      <CheckSolid className={styles.ticketIcon} />
                    ) : (
                      <LockSolid className={styles.ticketIcon} />
                    )}
                    <span className={styles.ticketHint}>
                      {unlocked ? 'Открыт' : `${promo.threshold} задания`}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </Section>
      </StateGate>
    </div>
  );
}
