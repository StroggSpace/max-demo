import { SparklesIcon as SparklesSolid, LockClosedIcon } from '@heroicons/react/24/solid';
import { TrophyIcon } from '@heroicons/react/24/outline';
import { Flex, Typography } from '@maxhub/max-ui';

import { achievements } from '@/app/achievements';
import { Card, Progress, StateGate } from '@/shared/ui/kit';
import { useSectionScenario } from '@/features/scenario/useSectionScenario';
import { scenarios } from '@/scenarios';
import { useDemoStore } from '@/store/demo';
import styles from './AchievementsTab.module.css';

export function AchievementsTab() {
  useSectionScenario(scenarios.achievements);

  const unlocked = useDemoStore((s) => s.achievements);
  const progress = (unlocked.length / achievements.length) * 100;

  return (
    <div className={styles.page}>
      <StateGate emptyTitle="Достижений пока нет">
        <Card>
          <Flex align="center" gap={12}>
            <span className={styles.summaryIcon}>
              <TrophyIcon className={styles.summaryGlyph} />
            </span>

            <div className={styles.summaryBody}>
              <Typography.Title variant="medium-strong">
                Открыто {unlocked.length} из {achievements.length}
              </Typography.Title>
              <Typography.Body variant="small" className={styles.muted}>
                Достижения открываются за активность в сезоне
              </Typography.Body>
            </div>

            <span className={styles.summaryValue}>
              {Math.round(progress)}%
            </span>
          </Flex>

          <div className={styles.summaryProgress}>
            <Progress value={progress} height="s" />
          </div>
        </Card>

        <div className={styles.grid}>
          {achievements.map(({ id, title, hint, Icon }) => {
            const isUnlocked = unlocked.includes(id);
            return (
              <div
                key={id}
                className={styles.tile}
                data-unlocked={isUnlocked ? 'true' : undefined}
              >
                <span className={styles.tileIcon}>
                  <Icon className={styles.tileGlyph} />
                </span>

                <Typography.Title variant="small-strong">{title}</Typography.Title>
                <span className={styles.tileHint}>{hint}</span>

                <span className={styles.tileStatus}>
                  {isUnlocked ? (
                    <>
                      <SparklesSolid className={styles.statusIcon} />
                      Открыто
                    </>
                  ) : (
                    <>
                      <LockClosedIcon className={styles.statusIcon} />
                      Закрыто
                    </>
                  )}
                </span>
              </div>
            );
          })}
        </div>
      </StateGate>
    </div>
  );
}
