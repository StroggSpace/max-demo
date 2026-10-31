import { Button, CellSimple, Flex, Switch, Typography } from '@maxhub/max-ui';

import { Card, ListCard, Section } from '@/shared/ui/kit';
import { useDemoStore, type DemoStateMode, type SectionId } from '@/store/demo';
import styles from './Settings.module.css';

const sections: { id: SectionId; title: string }[] = [
  { id: 'home', title: 'Главная' },
  { id: 'tasks', title: 'Задания' },
  { id: 'giveaways', title: 'Розыгрыши' },
  { id: 'shop', title: 'Магазин' },
  { id: 'profile', title: 'Профиль' },
];

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
  const speed = useDemoStore((s) => s.speed);
  const setSpeed = useDemoStore((s) => s.setSpeed);
  const disabled = useDemoStore((s) => s.disabled);
  const toggleSection = useDemoStore((s) => s.toggleSection);
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

        <Card>
          <Typography.Label variant="small-caps" className={styles.label}>
            Скорость
          </Typography.Label>
          <Flex gap={6}>
            {[1, 2, 4].map((value) => (
              <Button
                key={value}
                size="small"
                mode={speed === value ? 'primary' : 'secondary'}
                stretched
                onClick={() => setSpeed(value)}
              >
                ×{value}
              </Button>
            ))}
          </Flex>
        </Card>

        <ListCard>
          {sections.map((section) => (
            <CellSimple
              key={section.id}
              title={section.title}
              after={
                <Switch
                  checked={!disabled[section.id]}
                  onChange={() => toggleSection(section.id)}
                />
              }
            />
          ))}
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

      <Section title="О демо">
        <ListCard>
          <CellSimple title="Версия" after="0.1.0" />
          <CellSimple title="Дизайн-система" after="MAX UI" />
          <CellSimple title="Иконки" after="Heroicons" />
          <CellSimple title="Анимации" after="Lottie" />
        </ListCard>
      </Section>
    </div>
  );
}
