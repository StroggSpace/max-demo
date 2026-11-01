import {
  BanknotesIcon,
  GiftIcon,
  SparklesIcon,
  TrophyIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';
import { Flex, Typography } from '@maxhub/max-ui';

import { Card, Chip, Section, StateGate } from '@/shared/ui/kit';
import { useSectionScenario } from '@/features/scenario/useSectionScenario';
import { scenarios } from '@/scenarios';
import { useDemoStore } from '@/store/demo';
import styles from './SeasonTab.module.css';

const levelIcons = [SparklesIcon, UserGroupIcon, BanknotesIcon, GiftIcon, TrophyIcon];

export function SeasonTab() {
  useSectionScenario(scenarios.season);

  const level = useDemoStore((s) => s.level);
  const xp = useDemoStore((s) => s.xp);
  const xpMax = useDemoStore((s) => s.xpMax);
  const seasonLevels = useDemoStore((s) => s.seasonLevels);

  const progress = Math.min(100, (xp / xpMax) * 100);
  const currentReward = seasonLevels[level - 1]?.reward ?? seasonLevels[0].reward;
  const nextLevel = Math.min(5, level + 1);

  return (
    <div className={styles.page}>
      <StateGate emptyTitle="Сезон ещё не начался">
        <div className={styles.hero}>
          <span className={styles.heroGlow} />

          <Flex justify="space-between" align="center">
            <span className={styles.heroBadge}>Сезон 1</span>
            <span className={styles.heroLevel}>Уровень {level}</span>
          </Flex>

          <h2 className={styles.heroTitle}>Весенний марафон</h2>

          <div className={styles.heroBar}>
            <div className={styles.heroBarFill} style={{ width: `${progress}%` }} />
          </div>

          <Flex justify="space-between">
            <span className={styles.heroMeta}>
              {xp} из {xpMax} XP
            </span>
            <span className={styles.heroMeta}>до уровня {nextLevel}</span>
          </Flex>
        </div>

        <Card>
          <Flex align="center" gap={12}>
            <span className={styles.rewardTile}>
              <GiftIcon className={styles.rewardIcon} />
            </span>
            <div className={styles.rewardBody}>
              <Typography.Body variant="small" className={styles.muted}>
                Награда уровня {level}
              </Typography.Body>
              <Typography.Title variant="small-strong">{currentReward}</Typography.Title>
            </div>
            <Chip tone="accent">Активна</Chip>
          </Flex>
        </Card>

        <Section title="Уровни сезона" after={`${Math.min(level, 5)} из 5`}>
          <div className={styles.roadmap}>
            {seasonLevels.map((item, index) => {
              const reached = item.level < level;
              const current = item.level === level;
              const Icon = levelIcons[index] ?? SparklesIcon;

              return (
                <div
                  key={item.level}
                  className={styles.step}
                  data-current={current ? 'true' : undefined}
                >
                  <div className={styles.rail}>
                    <span
                      className={styles.dot}
                      data-state={current ? 'current' : reached ? 'reached' : 'locked'}
                    >
                      <Icon className={styles.dotIcon} />
                    </span>
                  </div>

                  <div className={styles.stepBody}>
                    <Flex justify="space-between" align="center" gap={8}>
                      <span className={styles.stepTitle}>
                        {item.level}. {item.title}
                      </span>
                      <Chip tone={current ? 'accent' : reached ? 'success' : 'muted'}>
                        {current ? 'Сейчас' : reached ? 'Открыт' : 'Закрыт'}
                      </Chip>
                    </Flex>
                    <Typography.Body variant="small" className={styles.stepReward}>
                      {item.reward}
                    </Typography.Body>
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
