import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { Button, CellSimple, Flex, IconButton, Switch, Typography } from '@maxhub/max-ui';

import { Card, ListCard, Section } from '@/shared/ui/kit';
import { useDemoStore, type DemoStateMode } from '@/store/demo';
import styles from './Settings.module.css';

const states: { id: DemoStateMode; title: string }[] = [
  { id: 'normal', title: 'Обычное' },
  { id: 'loading', title: 'Загрузка' },
  { id: 'empty', title: 'Пусто' },
  { id: 'error', title: 'Ошибка' },
];

export function SettingsPage() {
  const navigate = useNavigate();
  const theme = useDemoStore((s) => s.theme);
  const setTheme = useDemoStore((s) => s.setTheme);
  const autoplay = useDemoStore((s) => s.autoplay);
  const setAutoplay = useDemoStore((s) => s.setAutoplay);
  const demoState = useDemoStore((s) => s.demoState);
  const setDemoState = useDemoStore((s) => s.setDemoState);
  const resetAll = useDemoStore((s) => s.resetAll);

  return (
    <div className={styles.page}>
      <div className={styles.top}>
        <IconButton
          size="medium"
          mode="tertiary"
          aria-label="Назад"
          onClick={() => navigate(-1)}
        >
          <ArrowLeftIcon className={styles.icon} />
        </IconButton>
        <div>
          <Typography.Title variant="large-strong">Настройки</Typography.Title>
          <Typography.Body variant="small" className={styles.subtitle}>
            Демо-режим
          </Typography.Body>
        </div>
      </div>

      <Section title="Оформление">
        <Card>
          <Typography.Label variant="small-caps" className={styles.label}>
            Тема
          </Typography.Label>
          <Flex gap={6}>
            {(['light', 'dark'] as const).map((value) => (
              <Button
                key={value}
                size="small"
                mode={theme === value ? 'primary' : 'secondary'}
                stretched
                onClick={() => setTheme(value)}
              >
                {value === 'light' ? 'Светлая' : 'Тёмная'}
              </Button>
            ))}
          </Flex>
        </Card>
      </Section>

      <Section title="Сценарии">
        <ListCard>
          <CellSimple
            title="Автопроигрывание"
            subtitle="Сценарий запускается при входе в раздел"
            after={
              <Switch
                checked={autoplay}
                onChange={(event) => setAutoplay(event.target.checked)}
              />
            }
          />
        </ListCard>
      </Section>

      <Section title="Состояние интерфейса">
        <Card>
          <Typography.Body variant="small" className={styles.hint}>
            Показывает, как выглядят состояния на экранах.
          </Typography.Body>
          <div className={styles.states}>
            {states.map((state) => (
              <Button
                key={state.id}
                size="small"
                mode={demoState === state.id ? 'primary' : 'secondary'}
                onClick={() => setDemoState(state.id)}
              >
                {state.title}
              </Button>
            ))}
          </div>
        </Card>
      </Section>

      <Section title="Данные">
        <Button
          size="medium"
          mode="secondary"
          appearance="negative"
          stretched
          onClick={resetAll}
        >
          Сбросить данные демо
        </Button>
      </Section>
    </div>
  );
}
