import {
  BoltIcon,
  CheckCircleIcon,
  FireIcon,
  StarIcon,
  TicketIcon,
  TrophyIcon,
} from '@heroicons/react/24/outline';
import {
  BoltIcon as BoltSolid,
  CheckCircleIcon as CheckSolid,
  GiftIcon as GiftSolid,
  SparklesIcon as SparklesSolid,
  StarIcon as StarSolid,
} from '@heroicons/react/24/solid';
import { Avatar, Flex, Typography } from '@maxhub/max-ui';

import { Card, Chip, Progress, Section, StateGate } from '@/shared/ui/kit';
import { useSectionScenario } from '@/features/scenario/useSectionScenario';
import { scenarios } from '@/scenarios';
import { platform } from '@/platform';
import { useDemoStore, type HistoryKind } from '@/store/demo';
import styles from './ProfileTab.module.css';

const kindIcon: Record<HistoryKind, { Icon: typeof StarSolid; tone: string }> = {
  task: { Icon: CheckSolid, tone: 'positive' },
  promo: { Icon: GiftSolid, tone: 'themed' },
  level: { Icon: BoltSolid, tone: 'themed' },
  achievement: { Icon: SparklesSolid, tone: 'themed' },
  points: { Icon: StarSolid, tone: 'positive' },
};

export function ProfileTab() {
  useSectionScenario(scenarios.profile);

  const tasks = useDemoStore((s) => s.tasks);
  const achievements = useDemoStore((s) => s.achievements);
  const unlockedPromos = useDemoStore((s) => s.unlockedPromos);
  const balance = useDemoStore((s) => s.balance);
  const level = useDemoStore((s) => s.level);
  const xp = useDemoStore((s) => s.xp);
  const xpMax = useDemoStore((s) => s.xpMax);
  const history = useDemoStore((s) => s.history);

  const done = tasks.filter((task) => task.done).length;
  const user = platform.user;

  const stats = [
    { label: 'заданий', value: `${done}/${tasks.length}`, Icon: CheckCircleIcon },
    { label: 'достижений', value: achievements.length, Icon: TrophyIcon },
    { label: 'уровень', value: level, Icon: BoltIcon },
    { label: 'баллов', value: balance.toLocaleString('ru-RU'), Icon: StarIcon },
    { label: 'промокодов', value: `${unlockedPromos.length}/4`, Icon: TicketIcon },
    { label: 'дней подряд', value: 5, Icon: FireIcon },
  ];

  return (
    <div className={styles.page}>
      <StateGate emptyTitle="Статистика пустая">
        <Card>
          <Flex align="center" gap={12}>
            <Avatar.Container size={56} form="circle">
              <Avatar.Image src="" fallback={user.firstName.slice(0, 1)} fallbackGradient="blue" />
            </Avatar.Container>

            <Flex direction="column" gap={2} className={styles.grow}>
              <Typography.Title variant="medium-strong">
                {user.firstName} {user.lastName}
              </Typography.Title>
              <Typography.Body variant="small" className={styles.muted}>
                {balance.toLocaleString('ru-RU')} баллов на балансе
              </Typography.Body>
            </Flex>

            <Chip tone="accent">Уровень {level}</Chip>
          </Flex>

          <div className={styles.xp}>
            <Progress value={(xp / xpMax) * 100} height="s" />
            <Flex justify="space-between">
              <span className={styles.xpText}>{xp} XP</span>
              <span className={styles.xpText}>до уровня {Math.min(5, level + 1)}</span>
            </Flex>
          </div>
        </Card>

        <Section title="Статистика">
          <div className={styles.stats}>
            {stats.map(({ label, value, Icon }) => (
              <div className={styles.stat} key={label}>
                <span className={styles.statIcon}>
                  <Icon className={styles.statGlyph} />
                </span>
                <span className={styles.statValue}>{value}</span>
                <span className={styles.statLabel}>{label}</span>
              </div>
            ))}
          </div>
        </Section>

        <Section title="История действий">
          <div className={styles.history}>
            {history.map((item) => {
              const { Icon, tone } = kindIcon[item.kind] ?? kindIcon.points;
              return (
                <div className={styles.historyRow} key={item.id}>
                  <div className={styles.historyRail}>
                    <span className={styles.historyIcon} data-tone={tone}>
                      <Icon className={styles.historyGlyph} />
                    </span>
                  </div>

                  <div className={styles.historyBody}>
                    <span className={styles.historyName}>{item.name}</span>
                    <span className={styles.historyAction}>{item.action}</span>
                  </div>

                  <span className={styles.historyTime}>{item.time}</span>
                </div>
              );
            })}
          </div>
        </Section>
      </StateGate>
    </div>
  );
}
