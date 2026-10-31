import { useState } from 'react';
import {
  BoltIcon,
  ClipboardDocumentCheckIcon,
  GiftIcon,
  ShoppingBagIcon,
  StarIcon,
  TrophyIcon,
} from '@heroicons/react/24/outline';
import {
  Avatar,
  Button,
  CellSimple,
  Flex,
  Grid,
  Typography,
} from '@maxhub/max-ui';

import { Card, Chip, ListCard, Section, Stat, StateGate } from '@/shared/ui/kit';
import { useSectionScenario } from '@/features/scenario/useSectionScenario';
import { scenarios } from '@/scenarios';
import { useDemoStore } from '@/store/demo';
import { platform } from '@/platform';
import { toast } from '@/shared/ui/toast/toastStore';
import styles from './Profile.module.css';

const achievements = [
  { title: 'Первый вход', hint: 'Открыть приложение', Icon: StarIcon },
  { title: 'Первые задания', hint: 'Выполнить 2 задания', Icon: ClipboardDocumentCheckIcon },
  { title: 'Участник розыгрыша', hint: 'Подать заявку', Icon: GiftIcon },
  { title: 'Первый выигрыш', hint: 'Выиграть приз', Icon: TrophyIcon },
  { title: 'Первый обмен', hint: 'Обменять баллы', Icon: ShoppingBagIcon },
  { title: 'Активный пользователь', hint: 'Заходить 7 дней подряд', Icon: BoltIcon },
];

export function ProfilePage() {
  useSectionScenario(scenarios.profile);
  const unlocked = useDemoStore((s) => s.achievements);
  const balance = useDemoStore((s) => s.balance);
  const level = useDemoStore((s) => s.level);
  const tasks = useDemoStore((s) => s.tasks);
  const [copied, setCopied] = useState(false);

  const user = platform.user;
  const completed = tasks.filter((task) => task.done).length;
  const code = 'MAX-DEMO-2026';

  const copy = async () => {
    try {
      await navigator.clipboard?.writeText(code);
      setCopied(true);
      toast.success('Код скопирован', code);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      toast.info('Не удалось скопировать', 'Выделите код вручную');
    }
  };

  return (
    <div className={styles.page}>
      <StateGate emptyTitle="Профиль пока пустой" emptyText="Данные появятся после первого входа в акцию.">
        <Card>
          <Flex align="center" gap={12}>
            <Avatar.Container size={56} form="circle">
              <Avatar.Image src="" fallback={user.firstName.slice(0, 1)} fallbackGradient="blue" />
            </Avatar.Container>

            <Flex direction="column" gap={4} className={styles.grow}>
              <Typography.Title variant="medium-strong">
                {user.firstName} {user.lastName}
              </Typography.Title>
              <Typography.Body variant="small" className={styles.muted}>
                Уровень {level} · {balance.toLocaleString('ru-RU')} баллов
              </Typography.Body>
            </Flex>

            <Chip tone="accent">MAX ID</Chip>
          </Flex>
        </Card>

        <Grid cols={3} gap={8}>
          <Stat value={completed} label="заданий" />
          <Stat value={unlocked.length} label="достижений" />
          <Stat value={level} label="уровень" />
        </Grid>

        <Section title="Приглашение">
          <Card>
            <Flex justify="space-between" align="center" gap={12}>
              <Flex direction="column" gap={4} className={styles.grow}>
                <Typography.Title variant="small-strong">{code}</Typography.Title>
                <Typography.Body variant="small" className={styles.muted}>
                  За каждого друга — 150 баллов после первого входа
                </Typography.Body>
              </Flex>

              <Button size="small" mode={copied ? 'secondary' : 'primary'} onClick={copy}>
                {copied ? 'Готово' : 'Копировать'}
              </Button>
            </Flex>
          </Card>
        </Section>

        <Section title="Достижения" after={`${unlocked.length} из ${achievements.length}`}>
          <ListCard>
            {achievements.map(({ title, hint, Icon }) => {
              const isUnlocked = unlocked.includes(title);

              return (
                <CellSimple
                  key={title}
                  title={title}
                  subtitle={hint}
                  disabled={!isUnlocked}
                  before={
                    <Icon
                      className={isUnlocked ? styles.iconOn : styles.iconOff}
                    />
                  }
                  after={
                    <Typography.Label
                      variant="small-caps"
                      className={isUnlocked ? styles.stateOn : styles.stateOff}
                    >
                      {isUnlocked ? 'открыто' : 'закрыто'}
                    </Typography.Label>
                  }
                />
              );
            })}
          </ListCard>
        </Section>
      </StateGate>
    </div>
  );
}
