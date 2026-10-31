import { Button } from '@maxhub/max-ui';

import { AppHeader } from '@/widgets/AppHeader';
import { ScenarioControls } from '@/features/scenario/ScenarioControls';
import { useSectionScenario } from '@/features/scenario/useSectionScenario';
import { scenarios } from '@/scenarios';
import { useDemoStore } from '@/store/demo';
import { platform } from '@/platform';

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
  };

  return (
    <div>
      <AppHeader title="Магазин" subtitle={`Доступно ${balance.toLocaleString('ru-RU')} баллов`} />

      <section className="card card--flat">
        <div className="row row--between">
          <div>
            <div className="small muted">Ваш баланс</div>
            <div className="balance" style={{ fontSize: 30, marginTop: 4 }}>
              {balance.toLocaleString('ru-RU')}
              <small>баллов</small>
            </div>
          </div>
          <span className="chip chip--accent">Партнёрские награды</span>
        </div>
      </section>

      <section className="section">
        <div className="section__head">
          <h2 className="section__title">Награды</h2>
          <span className="tiny muted">{rewards.filter((item) => item.owned).length} получено</span>
        </div>

        <div className="grid">
          {rewards.map((reward) => {
            const affordable = balance >= reward.price;
            return (
              <article
                key={reward.id}
                className={`reward ${reward.owned ? 'reward--owned' : ''}`}
              >
                <div className="reward__emoji">{reward.emoji}</div>
                <div className="reward__title">{reward.title}</div>
                <div className="tiny muted">{reward.subtitle}</div>

                <div className="reward__price">
                  {reward.owned ? 'Получено' : `${reward.price.toLocaleString('ru-RU')} баллов`}
                </div>

                <Button
                  size="small"
                  mode={reward.owned || !affordable ? 'secondary' : 'primary'}
                  stretched
                  disabled={reward.owned || !affordable}
                  onClick={() => buy(reward.id)}
                >
                  {reward.owned ? 'В инвентаре' : affordable ? 'Обменять' : 'Не хватает'}
                </Button>
              </article>
            );
          })}
        </div>
      </section>

      <ScenarioControls scenario={scenario} />
    </div>
  );
}
