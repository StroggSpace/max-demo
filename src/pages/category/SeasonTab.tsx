import { Typography } from '@maxhub/max-ui';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { Flex } from '@maxhub/max-ui';

import { Card, Chip, ListCard, Progress, Section, StateGate } from '@/shared/ui/kit';
import { useSectionScenario } from '@/features/scenario/useSectionScenario';
import { scenarios } from '@/scenarios';
import { useDemoStore } from '@/store/demo';
import styles from './SeasonTab.module.css';

export function SeasonTab() {
  useSectionScenario(scenarios.season);

  const level = useDemoStore((s) => s.level);
  const xp = useDemoStore((s) => s.xp);
  const xpMax = useDemoStore((s) => s.xpMax);
  const seasonLevels = useDemoStore((s) => s.seasonLevels);

  const progress = (xp / xpMax) * 100;

  return (
    <div className={styles.page}>
      <StateGate emptyTitle="Сезон ещё не начался">
        <Card>
          <Flex justify="space-between" align="center">
            <Typography.Title variant="medium-strong">Сезон «Весенний марафон»</Typography.Title>
            <Chip tone="accent">Уровень {level}</Chip>
          </Flex>

          <div className={styles.progressBlock}>
            <Progress value={progress} />
          </div>

          <Flex justify="space-between">
            <Typography.Body variant="small" className={styles.muted}>
              {xp} из {xpMax} XP
            </Typography.Body>
            <Typography.Body variant="small" className={styles.muted}>
              до уровня {Math.min(5, level + 1)}
            </Typography.Body>
          </Flex>
        </Card>

        <Section title="Уровни и награды">
          <ListCard>
            {seasonLevels.map((item) => {
              const reached = item.level <= level;
              const current = item.level === level;

              return (
                <div className={styles.levelRow} key={item.level}>
                  <span
                    className={styles.levelBadge}
                    data-current={current ? 'true' : undefined}
                  >
                    {reached && !current ? (
                      <CheckCircleIcon className={styles.levelCheck} />
                    ) : (
                      item.level
                    )}
                  </span>

                  <div className={styles.levelBody}>
                    <div className={styles.levelTitle}>{item.title}</div>
                    <div className={styles.levelReward}>{item.reward}</div>
                  </div>

                  <Chip tone={current ? 'accent' : reached ? 'success' : 'muted'}>
                    {current ? 'Текущий' : reached ? 'Открыт' : 'Закрыт'}
                  </Chip>
                </div>
              );
            })}
          </ListCard>
        </Section>
      </StateGate>
    </div>
  );
}
