import { Button, CellSimple, Flex, Switch, Typography } from '@maxhub/max-ui';

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
  const theme = useDemoStore((s) => s.theme);
  const setTheme = useDemoStore((s) => s.setTheme);
  const autoplay = useDemoStore((s) => s.autoplay);
  const setAutoplay = useDemoStore((s) => s.setAutoplay);
  const motionEnabled = useDemoStore((s) => s.motionEnabled);
  const setMotionEnabled = useDemoStore((s) => s.setMotionEnabled);
  const demoState = useDemoStore((s) => s.demoState);
  const setDemoState = useDemoStore((s) => s.setDemoState);
  const resetAll = useDemoStore((s) => s.resetAll);

  return (
    <div className={styles.page}>
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

      <Section title="Анимации">
        <ListCard>
          <CellSimple
            title="Анимации интерфейса"
            subtitle="Переходы, появление и закрытие экранов"
            after={
              <Switch
                checked={motionEnabled}
                onChange={(event) => setMotionEnabled(event.target.checked)}
              />
            }
          />
        </ListCard>
      </Section>

      <Section title="Сценарии">
        <ListCard>
          <CellSimple
            title="Автопроигрывание"
            subtitle="Процесс запускается при входе во вкладку"
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
