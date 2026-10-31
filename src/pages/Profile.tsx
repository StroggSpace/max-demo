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
  CellHeader,
  CellList,
  CellSimple,
  Flex,
  Grid,
  Panel,
  Typography,
} from '@maxhub/max-ui';

import { AppHeader } from '@/widgets/AppHeader';
import { ScenarioControls } from '@/features/scenario/ScenarioControls';
import { useSectionScenario } from '@/features/scenario/useSectionScenario';
import { scenarios } from '@/scenarios';
import { useDemoStore } from '@/store/demo';
import { platform } from '@/platform';
import { toast } from '@/shared/ui/toast/toastStore';

const achievements = [
  { title: 'Первый вход', hint: 'Открыть приложение', Icon: StarIcon },
  { title: 'Первые задания', hint: 'Выполнить 2 задания', Icon: ClipboardDocumentCheckIcon },
  { title: 'Участник розыгрыша', hint: 'Подать заявку', Icon: GiftIcon },
  { title: 'Первый выигрыш', hint: 'Выиграть приз', Icon: TrophyIcon },
  { title: 'Первый обмен', hint: 'Обменять баллы', Icon: ShoppingBagIcon },
  { title: 'Активный пользователь', hint: 'Заходить 7 дней подряд', Icon: BoltIcon },
];

const cardStyle = {
  padding: 14,
  borderRadius: 'var(--size-border-radius-semantic-border-radius-card)',
  background: 'var(--background-surface-card)',
} as const;

export function ProfilePage() {
  const scenario = useSectionScenario(scenarios.profile);
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
    <div>
      <AppHeader title="Профиль" subtitle="Личный кабинет участника" />

      <Panel style={{ ...cardStyle, marginTop: 12, padding: 16 }}>
        <Flex align="center" gap={12}>
          <Avatar.Container size={56} form="circle">
            <Avatar.Image src="" fallback={user.firstName.slice(0, 1)} fallbackGradient="blue" />
          </Avatar.Container>

          <Flex direction="column" gap={2} style={{ flex: 1, minWidth: 0 }}>
            <Typography.Title variant="medium-strong">
              {user.firstName} {user.lastName}
            </Typography.Title>
            <Typography.Body variant="small" style={{ color: 'var(--text-secondary)' }}>
              Уровень {level} · {balance.toLocaleString('ru-RU')} баллов
            </Typography.Body>
          </Flex>

          <Typography.Label
            variant="small-caps"
            style={{
              padding: '4px 8px',
              borderRadius: 8,
              background: 'var(--background-accent-themed)',
              color: 'var(--text-contrast-static)',
            }}
          >
            MAX ID
          </Typography.Label>
        </Flex>
      </Panel>

      <Grid cols={3} gap={8} style={{ marginTop: 12 }}>
        {[
          { value: completed, label: 'заданий' },
          { value: unlocked.length, label: 'достижений' },
          { value: level, label: 'уровень' },
        ].map((stat) => (
          <Panel key={stat.label} style={{ ...cardStyle, textAlign: 'center' }}>
            <Typography.Title variant="large-strong">{stat.value}</Typography.Title>
            <Typography.Body variant="small" style={{ color: 'var(--text-secondary)' }}>
              {stat.label}
            </Typography.Body>
          </Panel>
        ))}
      </Grid>

      <CellHeader style={{ marginTop: 20 }}>Приглашение</CellHeader>
      <CellList mode="island" filled>
        <CellSimple
          title={code}
          subtitle="За каждого друга — 150 баллов после первого входа"
          after={
            <Button size="small" mode={copied ? 'secondary' : 'primary'} onClick={copy}>
              {copied ? 'Готово' : 'Копировать'}
            </Button>
          }
        />
      </CellList>

      <CellHeader
        after={`${unlocked.length} из ${achievements.length}`}
        style={{ marginTop: 20 }}
      >
        Достижения
      </CellHeader>
      <CellList mode="island" filled>
        {achievements.map(({ title, hint, Icon }) => {
          const isUnlocked = unlocked.includes(title);
          return (
            <CellSimple
              key={title}
              title={title}
              subtitle={hint}
              before={
                <Icon
                  style={{
                    width: 22,
                    height: 22,
                    color: isUnlocked ? 'var(--icon-themed)' : 'var(--icon-tertiary)',
                  }}
                />
              }
              after={
                <Typography.Label
                  variant="small-caps"
                  style={{ color: isUnlocked ? 'var(--text-positive)' : 'var(--text-tertiary)' }}
                >
                  {isUnlocked ? 'открыто' : 'закрыто'}
                </Typography.Label>
              }
              disabled={!isUnlocked}
            />
          );
        })}
      </CellList>

      <ScenarioControls scenario={scenario} />
    </div>
  );
}
