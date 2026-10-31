import { FaceSmileIcon, TrophyIcon } from '@heroicons/react/24/outline';
import { Button, CellHeader, CellList, CellSimple, Flex, Panel, Typography } from '@maxhub/max-ui';

import { AppHeader } from '@/widgets/AppHeader';
import { Lottie } from '@/shared/ui/Lottie';
import { ScenarioControls } from '@/features/scenario/ScenarioControls';
import { useSectionScenario } from '@/features/scenario/useSectionScenario';
import { useGiveawayTicker } from '@/features/giveaway/useGiveawayTicker';
import { scenarios } from '@/scenarios';
import { useDemoStore } from '@/store/demo';
import { toast } from '@/shared/ui/toast/toastStore';

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

export function GiveawaysPage() {
  const scenario = useSectionScenario(scenarios.giveaways);
  useGiveawayTicker();

  const giveaway = useDemoStore((s) => s.giveaway);
  const setGiveaway = useDemoStore((s) => s.setGiveaway);
  const pushFeed = useDemoStore((s) => s.pushFeed);
  const balance = useDemoStore((s) => s.balance);

  const join = () => {
    if (giveaway.joined) return;
    setGiveaway({ joined: true });
    pushFeed('Вы участвуете в розыгрыше', true);
    toast.success('Заявка принята', 'Результат придёт в этот чат');
  };

  const phase = giveaway.phase;
  const isWin = phase === 'result' && giveaway.result === 'win';

  return (
    <div>
      <AppHeader title="Розыгрыши" subtitle={`Баланс: ${balance.toLocaleString('ru-RU')} баллов`} />

      {isWin ? (
        <Lottie src="/lottie/confetti.lottie" className="confetti-layer" loop={false} />
      ) : null}

      <div className="hero" style={{ marginTop: 12 }}>
        <div className="hero__label">Приз</div>
        <p className="hero__prize">{giveaway.prize}</p>

        <Flex align="flex-end" justify="space-between" style={{ marginTop: 14 }}>
          <div>
            <div className="hero__timer">
              {phase === 'idle' ? '—:—' : formatTime(giveaway.secondsLeft)}
            </div>
            <Typography.Body variant="small" style={{ opacity: 0.8 }}>
              {phase === 'idle' ? 'розыгрыш ещё не начался' : 'до конца приёма заявок'}
            </Typography.Body>
          </div>

          <Flex direction="column" gap={2} style={{ alignItems: 'flex-end' }}>
            <Typography.Title variant="large-strong">{giveaway.participants}</Typography.Title>
            <Typography.Body variant="small" style={{ opacity: 0.8 }}>
              участников
            </Typography.Body>
          </Flex>
        </Flex>

        <Button
          mode="primary"
          appearance="contrast-static"
          stretched
          style={{ marginTop: 16 }}
          disabled={giveaway.joined || phase === 'result'}
          onClick={join}
        >
          {giveaway.joined ? 'Вы участвуете' : 'Участвовать'}
        </Button>
      </div>

      {phase === 'result' ? (
        <Panel style={{ ...cardStyle, marginTop: 14 }}>
          <Flex align="center" gap={12}>
            <span
              style={{
                width: 56,
                height: 56,
                borderRadius: '50%',
                display: 'grid',
                placeItems: 'center',
                flex: 'none',
                background: isWin
                  ? 'var(--background-accent-positive)'
                  : 'var(--background-surface-tertiary)',
                color: isWin ? 'var(--icon-contrast-static)' : 'var(--icon-secondary)',
              }}
            >
              {isWin ? (
                <TrophyIcon style={{ width: 28, height: 28 }} />
              ) : (
                <FaceSmileIcon style={{ width: 28, height: 28 }} />
              )}
            </span>
            <Flex direction="column" gap={2} style={{ flex: 1 }}>
              <Typography.Title variant="medium-strong">
                {isWin ? 'Вы выиграли' : 'В этот раз не выиграли'}
              </Typography.Title>
              <Typography.Body variant="small" style={{ color: 'var(--text-secondary)' }}>
                {isWin ? `${giveaway.prize} уже на вашем балансе` : 'Следующий розыгрыш — через неделю'}
              </Typography.Body>
            </Flex>
          </Flex>
        </Panel>
      ) : (
        <Panel style={{ ...cardStyle, marginTop: 14 }}>
          <Flex justify="space-between" align="center">
            <Typography.Body variant="small" style={{ color: 'var(--text-secondary)' }}>
              Ваше участие
            </Typography.Body>
            <Typography.Label
              variant="small-strong"
              style={{
                padding: '4px 10px',
                borderRadius: 999,
                background: giveaway.joined
                  ? 'var(--background-accent-positive)'
                  : 'var(--background-surface-tertiary)',
                color: giveaway.joined
                  ? 'var(--text-contrast-static)'
                  : 'var(--text-secondary)',
              }}
            >
              {giveaway.joined ? 'Заявка принята' : 'Не участвуете'}
            </Typography.Label>
          </Flex>

          <div className="progress" style={{ marginTop: 12 }}>
            <div className="progress__bar" style={{ width: giveaway.joined ? '100%' : '0%' }} />
          </div>

          <Typography.Body variant="small" style={{ color: 'var(--text-tertiary)', marginTop: 8 }}>
            Один аккаунт — одна заявка. Баллы не списываются.
          </Typography.Body>
        </Panel>
      )}

      <CellHeader after="ещё 2 розыгрыша" style={{ marginTop: 20 }}>
        Скоро
      </CellHeader>
      <CellList mode="island" filled>
        <CellSimple
          title="Кофе на месяц"
          subtitle="старт через 2 дня · 480 участников"
          after={<Typography.Label variant="small-caps">скоро</Typography.Label>}
        />
        <CellSimple
          title="Мерч бренда"
          subtitle="старт 1 мая · 213 участников"
          after={<Typography.Label variant="small-caps">скоро</Typography.Label>}
        />
      </CellList>

      <ScenarioControls scenario={scenario} />
    </div>
  );
}
