import { useNavigate } from 'react-router-dom';
import { Button, CellSimple, Flex, Typography } from '@maxhub/max-ui';

import { Lottie } from '@/shared/ui/Lottie';
import { Balance, Card, Chip, Hero, ListCard, Progress, Section, StateGate, kit } from '@/shared/ui/kit';
import { useSectionScenario } from '@/features/scenario/useSectionScenario';
import { useGiveawayTicker } from '@/features/giveaway/useGiveawayTicker';
import { scenarios } from '@/scenarios';
import { useDemoStore } from '@/store/demo';
import styles from './Home.module.css';

function formatTime(total: number) {
  const safe = Math.max(0, total);
  const minutes = Math.floor(safe / 60);
  const seconds = safe % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

export function HomePage() {
  const navigate = useNavigate();
  useSectionScenario(scenarios.home);
  useGiveawayTicker();

  const balance = useDemoStore((s) => s.balance);
  const level = useDemoStore((s) => s.level);
  const xp = useDemoStore((s) => s.xp);
  const xpMax = useDemoStore((s) => s.xpMax);
  const feed = useDemoStore((s) => s.feed);
  const giveaway = useDemoStore((s) => s.giveaway);

  const progress = (xp / xpMax) * 100;

  return (
    <div className={styles.page}>
      <StateGate emptyTitle="Пока нет активности" emptyText="Как только начнётся акция, здесь появятся баллы и события.">
        <Card>
          <Flex direction="column" align="stretch" gap={12}>
            <Flex justify="space-between" align="center">
              <Typography.Body variant="small" className={styles.muted}>
                Ваш баланс
              </Typography.Body>
              <Chip tone="accent">Уровень {level}</Chip>
            </Flex>

            <div className={styles.balanceRow}>
              <Balance value={balance} />
              <Lottie src="/lottie/coins.lottie" className={styles.coins} />
            </div>

            <Progress value={progress} />

            <Flex justify="space-between">
              <Typography.Body variant="small" className={styles.muted}>
                {xp} из {xpMax} XP
              </Typography.Body>
              <Typography.Body variant="small" className={styles.muted}>
                до уровня {level + 1}
              </Typography.Body>
            </Flex>
          </Flex>
        </Card>

        <Hero>
          <div className={kit.heroLabel}>Активный розыгрыш</div>
          <p className={kit.heroPrize}>{giveaway.prize}</p>

          <Flex align="flex-end" justify="space-between" className={styles.heroBottom}>
            <div>
              <div className={kit.heroTimer}>{formatTime(giveaway.secondsLeft)}</div>
              <Typography.Body variant="small" className={kit.heroMeta}>
                до конца приёма заявок
              </Typography.Body>
            </div>
            <Typography.Body variant="small" className={kit.heroMeta}>
              {giveaway.participants} участников
            </Typography.Body>
          </Flex>

          <Button
            mode="primary"
            appearance="contrast-static"
            stretched
            className={styles.heroButton}
            onClick={() => navigate('/giveaways')}
          >
            Открыть розыгрыш
          </Button>
        </Hero>

        <Section title="Лента" after="обновляется вживую">
          <ListCard>
            {feed.map((item) => (
              <CellSimple
                key={item.id}
                before={
                  <span
                    className={styles.feedDot}
                    data-accent={item.accent ? 'true' : undefined}
                  />
                }
                title={item.text}
              />
            ))}
          </ListCard>
        </Section>
      </StateGate>
    </div>
  );
}
