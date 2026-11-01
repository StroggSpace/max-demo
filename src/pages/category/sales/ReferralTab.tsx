import { useState } from 'react';
import { motion } from 'motion/react';
import { LinkIcon, ShareIcon } from '@heroicons/react/24/outline';
import { Button, Flex, Typography } from '@maxhub/max-ui';

import { Card, Chip, ListCard, Progress, Section, StateGate } from '@/shared/ui/kit';
import { useMotionControls } from '@/shared/motion/useMotionControls';
import { useSectionScenario } from '@/features/scenario/useSectionScenario';
import { scenarios } from '@/scenarios';
import { platform } from '@/platform';
import { useSalesStore } from '@/store/sales';
import styles from './ReferralTab.module.css';

const GOAL = 5;

export function ReferralTab() {
  useSectionScenario(scenarios['sales-referral']);
  const { get } = useMotionControls();

  const code = useSalesStore((s) => s.code);
  const invites = useSalesStore((s) => s.invites);
  const [done, setDone] = useState(false);

  const joined = invites.filter((invite) => invite.status === 'joined').length;
  const progress = Math.min(100, (joined / GOAL) * 100);

  const share = async () => {
    try {
      await platform.share(`Забирай бонусы в MAX по коду ${code}`);
      setDone(true);
      window.setTimeout(() => setDone(false), 1800);
    } catch {
      // Пользователь закрыл шеринг — ничего не делаем.
    }
  };

  return (
    <div className={styles.page}>
      <StateGate emptyTitle="Приглашений пока нет" emptyText="Поделитесь кодом, чтобы получить первый бонус.">
        <Card className={styles.heroCard}>
          <div className={styles.heroLabel}>Ваш код</div>
          <div className={styles.code}>{code}</div>

          <Flex gap={8} className={styles.actions}>
            <Button mode="primary" stretched iconBefore={<ShareIcon style={{ width: 18, height: 18 }} />} onClick={share}>
              {done ? 'Отправлено' : 'Поделиться'}
            </Button>
            <Button
              mode="secondary"
              iconBefore={<LinkIcon style={{ width: 18, height: 18 }} />}
              style={{ flex: 'none' }}
              onClick={() => navigator.clipboard?.writeText(code)}
            >
              Копировать
            </Button>
          </Flex>

          <div className={styles.progressWrap}>
            <Progress value={progress} />
            <Flex justify="space-between">
              <span className={styles.meta}>{joined} из {GOAL} друзей</span>
              <span className={styles.meta}>+150 баллов за друга</span>
            </Flex>
          </div>
        </Card>

        <Section title="Приглашённые" after={`${invites.length}`}>
          <ListCard>
            {invites.map((invite, index) => (
              <motion.div
                key={invite.id}
                className={styles.row}
                {...get('listItem', index * 0.05)}
              >
                <span className={styles.avatar}>{invite.name.slice(0, 1)}</span>

                <div className={styles.body}>
                  <div className={styles.name}>{invite.name}</div>
                  <div className={styles.status}>
                    {invite.status === 'joined' ? 'Присоединился' : 'Ожидает входа'}
                  </div>
                </div>

                <Chip tone={invite.status === 'joined' ? 'success' : 'muted'}>
                  {invite.status === 'joined' ? `+${invite.reward}` : 'ожидание'}
                </Chip>
              </motion.div>
            ))}
          </ListCard>
        </Section>

        <Section title="Как это работает">
          <Card>
            <Flex direction="column" gap={10}>
              <Typography.Body variant="small" className={styles.step}>
                1. Отправьте код другу
              </Typography.Body>
              <Typography.Body variant="small" className={styles.step}>
                2. Друг входит в приложение по ссылке
              </Typography.Body>
              <Typography.Body variant="small" className={styles.step}>
                3. Вам начисляется 150 баллов, ему — приветственный бонус
              </Typography.Body>
            </Flex>
          </Card>
        </Section>
      </StateGate>
    </div>
  );
}
