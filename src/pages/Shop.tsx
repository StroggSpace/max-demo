import { Button, Flex, Grid, Typography } from '@maxhub/max-ui';

import { Lottie } from '@/shared/ui/Lottie';
import { Balance, Card, Section, StateGate } from '@/shared/ui/kit';
import { useSectionScenario } from '@/features/scenario/useSectionScenario';
import { scenarios } from '@/scenarios';
import { useDemoStore } from '@/store/demo';
import { platform } from '@/platform';
import { toast } from '@/shared/ui/toast/toastStore';
import styles from './Shop.module.css';

export function ShopPage() {
  useSectionScenario(scenarios.shop);
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

  const owned = rewards.filter((item) => item.owned).length;

  return (
    <div className={styles.page}>
      <StateGate emptyTitle="Наград пока нет" emptyText="Партнёрские награды появятся к старту акции.">
        <Card>
          <Flex justify="space-between" align="center">
            <Flex direction="column" gap={4}>
              <Typography.Body variant="small" className={styles.muted}>
                Ваш баланс
              </Typography.Body>
              <Balance value={balance} size="m" />
            </Flex>
            <Lottie src="/lottie/coins.lottie" className={styles.coins} />
          </Flex>
        </Card>

        <Section title="Награды" after={`${owned} получено`}>
          <Grid cols={2} gap={8}>
            {rewards.map((reward) => {
              const affordable = balance >= reward.price;

              return (
                <Card key={reward.id} className={styles.tile}>
                  <Flex
                    direction="column"
                    align="stretch"
                    gap={6}
                    className={[styles.tileBody, reward.owned ? styles.owned : '']
                      .filter(Boolean)
                      .join(' ')}
                  >
                    <span className={styles.emoji}>{reward.emoji}</span>

                    <Typography.Title variant="small-strong">{reward.title}</Typography.Title>
                    <Typography.Body variant="small" className={styles.muted}>
                      {reward.subtitle}
                    </Typography.Body>

                    <div className={styles.spacer} />

                    <Typography.Label
                      variant="small-strong"
                      className={reward.owned ? styles.priceMuted : styles.price}
                    >
                      {reward.owned
                        ? 'Получено'
                        : `${reward.price.toLocaleString('ru-RU')} баллов`}
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
                </Card>
              );
            })}
          </Grid>
        </Section>
      </StateGate>
    </div>
  );
}
