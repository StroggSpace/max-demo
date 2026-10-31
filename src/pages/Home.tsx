import { useNavigate } from 'react-router-dom';
import {
  Button,
  CellHeader,
  CellList,
  CellSimple,
  Flex,
  Panel,
  Typography,
} from '@maxhub/max-ui';

import { AppHeader } from '@/widgets/AppHeader';
import { Lottie } from '@/shared/ui/Lottie';
import { ScenarioControls } from '@/features/scenario/ScenarioControls';
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

const cardStyle = {
  padding: 16,
  borderRadius: 'var(--size-border-radius-semantic-border-radius-card)',
  background: 'var(--background-surface-card)',
} as const;

export function HomePage() {
  const navigate = useNavigate();
  const scenario = useSectionScenario(scenarios.home);
  useGiveawayTicker();

  const balance = useDemoStore((s) => s.balance);
  const level = useDemoStore((s) => s.level);
  const xp = useDemoStore((s) => s.xp);
  const xpMax = useDemoStore((s) => s.xpMax);
  const feed = useDemoStore((s) => s.feed);
  const giveaway = useDemoStore((s) => s.giveaway);

  const progress = Math.min(100, Math.round((xp / xpMax) * 100));

  return (
    <div>
      <AppHeader title="Главная" subtitle="Демо мини-приложения MAX" />

      <Panel style={{ ...cardStyle, marginTop: 12 }}>
        <Flex justify="space-between" align="center">
          <Typography.Body variant="small" style={{ color: 'var(--text-secondary)' }}>
            Ваш баланс
          </Typography.Body>
          <Flex
            align="center"
            gap={6}
            style={{
              padding: '4px 10px',
              borderRadius: 999,
              background: 'var(--background-accent-themed)',
              color: 'var(--text-contrast-static)',
            }}
          >
            <Typography.Label variant="small-strong">Уровень {level}</Typography.Label>
          </Flex>
        </Flex>

        <Flex align="flex-end" justify="space-between" gap={8}>
          <div className="balance" style={{ marginTop: 10 }}>
            {balance.toLocaleString('ru-RU')}
            <small>баллов</small>
          </div>
          <Lottie src="/lottie/coins.lottie" className={styles.coins} />
        </Flex>

        <div className="progress" style={{ marginTop: 16 }}>
          <div className="progress__bar" style={{ width: `${progress}%` }} />
        </div>

        <Flex justify="space-between" style={{ marginTop: 8 }}>
          <Typography.Body variant="small" style={{ color: 'var(--text-secondary)' }}>
            {xp} из {xpMax} XP
          </Typography.Body>
          <Typography.Body variant="small" style={{ color: 'var(--text-secondary)' }}>
            до уровня {level + 1}
          </Typography.Body>
        </Flex>
      </Panel>

      <div className="hero" style={{ marginTop: 16 }}>
        <div className="hero__label">Активный розыгрыш</div>
        <p className="hero__prize">{giveaway.prize}</p>

        <Flex align="flex-end" justify="space-between" style={{ marginTop: 12 }}>
          <div>
            <div className="hero__timer">{formatTime(giveaway.secondsLeft)}</div>
            <Typography.Body variant="small" style={{ opacity: 0.8 }}>
              до конца приёма заявок
            </Typography.Body>
          </div>
          <Typography.Body variant="small" style={{ opacity: 0.9 }}>
            {giveaway.participants} участников
          </Typography.Body>
        </Flex>

        <Button
          mode="primary"
          appearance="contrast-static"
          stretched
          style={{ marginTop: 16 }}
          onClick={() => navigate('/giveaways')}
        >
          Открыть розыгрыш
        </Button>
      </div>

      <CellHeader after="обновляется вживую" style={{ marginTop: 20 }}>
        Лента
      </CellHeader>
      <CellList mode="island" filled>
        {feed.map((item) => (
          <CellSimple
            key={item.id}
            before={
              <span
                className={styles.feedDot}
                style={{
                  background: item.accent
                    ? 'var(--background-accent-themed)'
                    : 'var(--background-surface-tertiary)',
                }}
              />
            }
            title={item.text}
          />
        ))}
      </CellList>

      <ScenarioControls scenario={scenario} />
    </div>
  );
}
