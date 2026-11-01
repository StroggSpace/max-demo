import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { FaceSmileIcon, TrophyIcon } from '@heroicons/react/24/outline';
import { Button, CellSimple, Flex, Typography } from '@maxhub/max-ui';

import { Lottie } from '@/shared/ui/Lottie';
import { Card, Chip, ListCard, Progress, Section, StateGate } from '@/shared/ui/kit';
import { useMotionControls } from '@/shared/motion/useMotionControls';
import { useSectionScenario } from '@/features/scenario/useSectionScenario';
import { scenarios } from '@/scenarios';
import { useSalesStore } from '@/store/sales';
import styles from './GiveawayTab.module.css';

function formatTime(total: number) {
  const safe = Math.max(0, total);
  const minutes = Math.floor(safe / 60);
  const seconds = safe % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

export function GiveawayTab() {
  useSectionScenario(scenarios['sales-giveaway']);
  const { get } = useMotionControls();

  const giveaway = useSalesStore((s) => s.giveaway);
  const setGiveaway = useSalesStore((s) => s.setGiveaway);

  const [showConfetti, setShowConfetti] = useState(false);
  const phase = giveaway.phase;
  const isWin = phase === 'result' && giveaway.result === 'win';

  useEffect(() => {
    if (phase !== 'countdown') return;
    const timer = window.setInterval(() => {
      const current = useSalesStore.getState().giveaway;
      if (current.phase !== 'countdown' || current.secondsLeft <= 0) return;
      setGiveaway({ secondsLeft: current.secondsLeft - 1 });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [phase, setGiveaway]);

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
      <StateGate emptyTitle="Розыгрышей пока нет" emptyText="Следующий розыгрыш анонсируем в канале бренда.">
        {showConfetti ? (
          <Lottie src={`${import.meta.env.BASE_URL}lottie/confetti.lottie`} className={styles.confetti} loop={false} />
        ) : null}

        <div className={styles.hero}>
          <span className={styles.heroGlow} />
          <div className={styles.heroLabel}>Розыгрыш</div>
          <p className={styles.heroPrize}>{giveaway.prize}</p>

          <Flex align="flex-end" justify="space-between" className={styles.heroBottom}>
            <div>
              <div className={styles.heroTimer}>
                {phase === 'idle' ? '—:—' : formatTime(giveaway.secondsLeft)}
              </div>
              <Typography.Body variant="small" className={styles.heroMeta}>
                {phase === 'idle' ? 'скоро старт' : 'до конца приёма заявок'}
              </Typography.Body>
            </div>

            <Flex direction="column" gap={2} className={styles.participants}>
              <Typography.Title variant="large-strong">{giveaway.participants}</Typography.Title>
              <Typography.Body variant="small" className={styles.heroMeta}>
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
            onClick={() => setGiveaway({ joined: true })}
          >
            {giveaway.joined ? 'Вы участвуете' : 'Участвовать'}
          </Button>
        </div>

        {phase === 'result' ? (
          <motion.div {...get('pop')}>
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
                      ? `${giveaway.prize} ждёт в разделе «Профиль»`
                      : 'Следующий розыгрыш — через неделю'}
                  </Typography.Body>
                </Flex>
              </Flex>
            </Card>
          </motion.div>
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

        <Section title="Как участвовать">
          <ListCard>
            <CellSimple title="1. Откройте витрину" subtitle="Любая покупка участвует в розыгрыше" />
            <CellSimple title="2. Нажмите «Участвовать»" subtitle="Заявка создаётся автоматически" />
            <CellSimple title="3. Дождитесь результата" subtitle="Итоги — в этом разделе и в профиле" />
          </ListCard>
        </Section>
      </StateGate>
    </div>
  );
}
