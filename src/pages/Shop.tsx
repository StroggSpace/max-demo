import { Button, Flex, Grid, Panel, Typography } from '@maxhub/max-ui';

import { AppHeader } from '@/widgets/AppHeader';
import { Lottie } from '@/shared/ui/Lottie';
import { ScenarioControls } from '@/features/scenario/ScenarioControls';
import { useSectionScenario } from '@/features/scenario/useSectionScenario';
import { scenarios } from '@/scenarios';
import { useDemoStore } from '@/store/demo';
import { platform } from '@/platform';
import { toast } from '@/shared/ui/toast/toastStore';
import styles from './Shop.module.css';

const cardStyle = {
  padding: 14,
  borderRadius: 'var(--size-border-radius-semantic-border-radius-card)',
  background: 'var(--background-surface-card)',
} as const;

export function ShopPage() {
  const scenario = useSectionScenario(scenarios.shop);
  const balance = useDemoStore((s) => s.balance);
  const rewards = useDemoStore((s) => s.rewards);
  const buyReward = useDemoStore((s) => s.buyReward);
  const pushFeed = useDemoStore((s) => s.pushFeed);

  const buy = (id: string) => {
    const reward = rewards.find((item) => item.id === id);
    if (!reward || reward.owned || balance < reward.price) return;
    platform.haptic('light');
    buyReward(id);
    pushFeed(`Вы обменяли баллы на «${reward.title}»`, true);
    toast.reward('Награда ваша', reward.title);
  };

  return (
    <div>
      <AppHeader title="Магазин" subtitle={`Доступно ${balance.toLocaleString('ru-RU')} баллов`} />

      <Panel style={{ ...cardStyle, marginTop: 12, padding: 16 }}>
        <Flex justify="space-between" align="center">
          <Flex direction="column" gap={4}>
            <Typography.Body variant="small" style={{ color: 'var(--text-secondary)' }}>
              Ваш баланс
            </Typography.Body>
            <div className="balance" style={{ fontSize: 30 }}>
              {balance.toLocaleString('ru-RU')}
              <small>баллов</small>
            </div>
          </Flex>
          <Lottie src="/lottie/coins.lottie" className={styles.coins} />
        </Flex>
      </Panel>

      <Flex justify="space-between" align="center" style={{ margin: '20px 4px 10px' }}>
        <Typography.Title variant="small-strong">Награды</Typography.Title>
        <Typography.Body variant="small" style={{ color: 'var(--text-tertiary)' }}>
          {rewards.filter((item) => item.owned).length} получено
        </Typography.Body>
      </Flex>

      <Grid cols={2} gap={10}>
        {rewards.map((reward) => {
          const affordable = balance >= reward.price;
          return (
            <Panel
              key={reward.id}
              style={{
                ...cardStyle,
                minHeight: 172,
                background: reward.owned
                  ? 'var(--background-surface-secondary)'
                  : 'var(--background-surface-card)',
              }}
            >
              <Flex direction="column" gap={6} style={{ height: '100%' }}>
                <span className={styles.emoji}>{reward.emoji}</span>
                <Typography.Title variant="small-strong">{reward.title}</Typography.Title>
                <Typography.Body variant="small" style={{ color: 'var(--text-secondary)' }}>
                  {reward.subtitle}
                </Typography.Body>

                <div style={{ flex: 1 }} />

                <Typography.Label
                  variant="small-strong"
                  style={{
                    color: reward.owned ? 'var(--text-tertiary)' : 'var(--text-themed)',
                  }}
                >
                  {reward.owned ? 'Получено' : `${reward.price.toLocaleString('ru-RU')} баллов`}
                </Typography.Label>

                <Button
                  size="small"
                  mode={reward.owned || !affordable ? 'secondary' : 'primary'}
                  stretched
                  disabled={reward.owned || !affordable}
                  onClick={() => buy(reward.id)}
                >
                  {reward.owned ? 'В инвентаре' : affordable ? 'Обменять' : 'Не хватает'}
                </Button>
              </Flex>
            </Panel>
          );
        })}
      </Grid>

      <ScenarioControls scenario={scenario} />
    </div>
  );
}
