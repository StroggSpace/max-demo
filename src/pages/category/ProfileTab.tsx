import {
  BoltIcon,
  CheckCircleIcon,
  GiftIcon,
  SparklesIcon,
  StarIcon,
} from '@heroicons/react/24/solid';
import { Grid, Typography } from '@maxhub/max-ui';

import { Card, Section, Stat, StateGate } from '@/shared/ui/kit';
import { useSectionScenario } from '@/features/scenario/useSectionScenario';
import { scenarios } from '@/scenarios';
import { useDemoStore, type HistoryKind } from '@/store/demo';
import styles from './ProfileTab.module.css';

const kindIcon: Record<HistoryKind, { Icon: typeof CheckCircleIcon; color: string }> = {
  task: { Icon: CheckCircleIcon, color: 'var(--icon-positive)' },
  promo: { Icon: GiftIcon, color: 'var(--icon-themed)' },
  level: { Icon: BoltIcon, color: 'var(--icon-themed)' },
  achievement: { Icon: SparklesIcon, color: 'var(--icon-themed)' },
  points: { Icon: StarIcon, color: 'var(--icon-positive)' },
};

export function ProfileTab() {
  useSectionScenario(scenarios.profile);

  const tasks = useDemoStore((s) => s.tasks);
  const achievements = useDemoStore((s) => s.achievements);
  const unlockedPromos = useDemoStore((s) => s.unlockedPromos);
  const balance = useDemoStore((s) => s.balance);
  const level = useDemoStore((s) => s.level);
  const history = useDemoStore((s) => s.history);

  const done = tasks.filter((task) => task.done).length;

  return (
    <div className={styles.page}>
      <StateGate emptyTitle="Статистика пустая">
        <Section title="Статистика">
          <Grid cols={2} gap={8}>
            <Stat value={done} label={`заданий из ${tasks.length}`} />
            <Stat value={achievements.length} label="достижений" />
            <Stat value={level} label="уровень" />
            <Stat value={balance.toLocaleString('ru-RU')} label="баллов" />
            <Stat value={`${unlockedPromos.length}/4`} label="промокодов" />
            <Stat value="5" label="дней подряд" />
          </Grid>
        </Section>

        <Section title="История действий">
          <Card className={styles.historyCard}>
            {history.map((item) => {
              const { Icon, color } = kindIcon[item.kind] ?? kindIcon.points;
              return (
                <div className={styles.historyRow} key={item.id}>
                  <span className={styles.historyIcon} style={{ color }}>
                    <Icon className={styles.historyGlyph} />
                  </span>

                  <div className={styles.historyBody}>
                    <span className={styles.historyName}>{item.name}</span>
                    <span className={styles.historyAction}>{item.action}</span>
                  </div>

                  <Typography.Body variant="small" className={styles.historyTime}>
                    {item.time}
                  </Typography.Body>
                </div>
              );
            })}
          </Card>
        </Section>
      </StateGate>
    </div>
  );
}
