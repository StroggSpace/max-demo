import { useEffect, useState } from 'react';
import { FaceSmileIcon, TrophyIcon } from '@heroicons/react/24/outline';
import { Button, CellSimple, Flex, Typography } from '@maxhub/max-ui';

import { Lottie } from '@/shared/ui/Lottie';
import { Card, Chip, Hero, ListCard, PageTitle, Progress, Section, StateGate, kit } from '@/shared/ui/kit';
import { useSectionScenario } from '@/features/scenario/useSectionScenario';
import { useGiveawayTicker } from '@/features/giveaway/useGiveawayTicker';
import { scenarios } from '@/scenarios';
import { useDemoStore } from '@/store/demo';
import { toast } from '@/shared/ui/toast/toastStore';
import styles from './Giveaways.module.css';

function formatTime(total: number) {
  const safe = Math.max(0, total);
  const minutes = Math.floor(safe / 60);
  const seconds = safe % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

export function GiveawaysPage() {
  useSectionScenario(scenarios.giveaways);
  useGiveawayTicker();

  const giveaway = useDemoStore((s) => s.giveaway);
  const setGiveaway = useDemoStore((s) => s.setGiveaway);
  const pushFeed = useDemoStore((s) => s.pushFeed);
  const balance = useDemoStore((s) => s.balance);

  const join = () => {
    if (giveaway.joined) return;
    setGiveaway({ joined: true });
    pushFeed('Вы', 'участвуете в розыгрыше');
    toast.success('Заявка принята', 'Результат придёт в этот чат');
  };

  const phase = giveaway.phase;
  const isWin = phase === 'result' && giveaway.result === 'win';

  const [showConfetti, setShowConfetti] = useState(false);
  useEffect(() => {
    if (!isWin) {
      setShowConfetti(false);
      return;
    }
    setShowConfetti(true);
    const timer = window.setTimeout(() => setShowConfetti(false), 3000);
    return () => window.clearTimeout(timer);
  }, [isWin]);

  return (
    <div className={styles.page}>
      <PageTitle title="Розыгрыши" subtitle="Промо-механики и призы" />
      <StateGate emptyTitle="Розыгрышей пока нет" emptyText="Следующий розыгрыш анонсируем в канале бренда.">
        {showConfetti ? (
          <Lottie src="/lottie/confetti.lottie" className={styles.confetti} loop={false} />
        ) : null}

        <Hero>
          <div className={kit.heroLabel}>Приз</div>
          <p className={kit.heroPrize}>{giveaway.prize}</p>

          <Flex align="flex-end" justify="space-between" className={styles.heroBottom}>
            <div>
              <div className={kit.heroTimer}>
                {phase === 'idle' ? '—:—' : formatTime(giveaway.secondsLeft)}
              </div>
              <Typography.Body variant="small" className={kit.heroMeta}>
                {phase === 'idle' ? 'розыгрыш ещё не начался' : 'до конца приёма заявок'}
              </Typography.Body>
            </div>
            <Flex direction="column" gap={2} className={styles.participants}>
              <Typography.Title variant="large-strong">{giveaway.participants}</Typography.Title>
              <Typography.Body variant="small" className={kit.heroMeta}>
                участников
              </Typography.Body>
            </Flex>
          </Flex>

          <Button
            mode="primary"
            appearance="contrast-static"
            stretched
            className={styles.heroButton}
            disabled={giveaway.joined || phase === 'result'}
            onClick={join}
          >
            {giveaway.joined ? 'Вы участвуете' : 'Участвовать'}
          </Button>
        </Hero>

        {phase === 'result' ? (
          <Card>
            <Flex align="center" gap={12}>
              <span className={styles.resultIcon} data-win={isWin ? 'true' : undefined}>
                {isWin ? (
                  <TrophyIcon className={styles.resultGlyph} />
                ) : (
                  <FaceSmileIcon className={styles.resultGlyph} />
                )}
              </span>
              <Flex direction="column" gap={4} className={styles.grow}>
                <Typography.Title variant="medium-strong">
                  {isWin ? 'Вы выиграли' : 'В этот раз не выиграли'}
                </Typography.Title>
                <Typography.Body variant="small" className={styles.muted}>
                  {isWin
                    ? `${giveaway.prize} уже на вашем балансе`
                    : 'Следующий розыгрыш — через неделю'}
                </Typography.Body>
              </Flex>
            </Flex>
          </Card>
        ) : (
          <Card>
            <Flex justify="space-between" align="center">
              <Typography.Body variant="small" className={styles.muted}>
                Ваше участие
              </Typography.Body>
              <Chip tone={giveaway.joined ? 'success' : 'muted'}>
                {giveaway.joined ? 'Заявка принята' : 'Не участвуете'}
              </Chip>
            </Flex>

            <div className={styles.progress}>
              <Progress value={giveaway.joined ? 100 : 0} />
            </div>

            <Typography.Body variant="small" className={styles.note}>
              Один аккаунт — одна заявка. Баллы не списываются.
            </Typography.Body>
          </Card>
        )}

        <Section title="Скоро" after="ещё 2 розыгрыша">
          <ListCard>
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
          </ListCard>
        </Section>

        <Typography.Body variant="small" className={styles.footer}>
          Баланс: {balance.toLocaleString('ru-RU')} баллов
        </Typography.Body>
      </StateGate>
    </div>
  );
}
