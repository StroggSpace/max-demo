import { Flex, Typography } from '@maxhub/max-ui';

import { achievements } from '@/app/achievements';
import { Chip, ListCard, Section, StateGate } from '@/shared/ui/kit';
import { useSectionScenario } from '@/features/scenario/useSectionScenario';
import { scenarios } from '@/scenarios';
import { useDemoStore } from '@/store/demo';
import styles from './AchievementsTab.module.css';

export function AchievementsTab() {
  useSectionScenario(scenarios.achievements);

  const unlocked = useDemoStore((s) => s.achievements);

  return (
    <div className={styles.page}>
      <StateGate emptyTitle="Достижений пока нет">
        <Section title="Достижения" after={`${unlocked.length} из ${achievements.length}`}>
          <ListCard>
            {achievements.map(({ id, title, hint, Icon }) => {
              const isUnlocked = unlocked.includes(id);
              return (
                <div className={styles.row} key={id}>
                  <span className={styles.badge} data-unlocked={isUnlocked ? 'true' : undefined}>
                    <Icon className={styles.icon} />
                  </span>

                  <Flex direction="column" gap={2} className={styles.body}>
                    <Typography.Title variant="small-strong">{title}</Typography.Title>
                    <Typography.Body variant="small" className={styles.hint}>
                      {hint}
                    </Typography.Body>
                  </Flex>

                  <Chip tone={isUnlocked ? 'success' : 'muted'}>
                    {isUnlocked ? 'Открыто' : 'Закрыто'}
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
