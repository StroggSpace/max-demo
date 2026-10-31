import { useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import {
  Button,
  CellList,
  CellSimple,
  Flex,
  IconButton,
  Switch,
  Typography,
} from '@maxhub/max-ui';

import { useDemoStore, type SectionId } from '@/store/demo';
import { useUiStore } from '@/app/ui';
import styles from './DemoPanel.module.css';

const sections: { id: SectionId; title: string }[] = [
  { id: 'home', title: 'Главная' },
  { id: 'tasks', title: 'Задания' },
  { id: 'giveaways', title: 'Розыгрыши' },
  { id: 'shop', title: 'Магазин' },
  { id: 'profile', title: 'Профиль' },
];

export function DemoPanel() {
  const open = useUiStore((s) => s.panelOpen);
  const close = useUiStore((s) => s.closePanel);

  const theme = useDemoStore((s) => s.theme);
  const setTheme = useDemoStore((s) => s.setTheme);
  const autoplay = useDemoStore((s) => s.autoplay);
  const setAutoplay = useDemoStore((s) => s.setAutoplay);
  const speed = useDemoStore((s) => s.speed);
  const setSpeed = useDemoStore((s) => s.setSpeed);
  const disabled = useDemoStore((s) => s.disabled);
  const toggleSection = useDemoStore((s) => s.toggleSection);
  const resetAll = useDemoStore((s) => s.resetAll);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, close]);

  if (!open) return null;

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true" onClick={close}>
      <div className={styles.sheet} onClick={(event) => event.stopPropagation()}>
        <Flex align="center" gap={8} style={{ padding: '4px 16px 0' }}>
          <Flex direction="column" gap={2} style={{ flex: 1 }}>
            <Typography.Title variant="medium-strong">Настройки демо</Typography.Title>
            <Typography.Body variant="small" style={{ color: 'var(--text-secondary)' }}>
              Скрытая панель · тройной тап по заголовку
            </Typography.Body>
          </Flex>
          <IconButton size="small" mode="secondary" onClick={close} aria-label="Закрыть">
            <XMarkIcon style={{ width: 18, height: 18 }} />
          </IconButton>
        </Flex>

        <div className={styles.group}>
          <Typography.Label variant="small-caps" style={{ color: 'var(--text-tertiary)' }}>
            Тема
          </Typography.Label>
          <Flex gap={6} style={{ marginTop: 8 }}>
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
        </div>

        <div className={styles.group}>
          <Typography.Label variant="small-caps" style={{ color: 'var(--text-tertiary)' }}>
            Скорость
          </Typography.Label>
          <Flex gap={6} style={{ marginTop: 8 }}>
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
        </div>

        <CellList mode="island" filled style={{ marginTop: 16 }}>
          <CellSimple
            title="Автопроигрывание"
            subtitle="Сценарии запускаются при входе в раздел"
            after={
              <Switch
                checked={autoplay}
                onChange={(event) => setAutoplay(event.target.checked)}
              />
            }
          />
        </CellList>

        <div className={styles.group}>
          <Typography.Label variant="small-caps" style={{ color: 'var(--text-tertiary)' }}>
            Сценарии по разделам
          </Typography.Label>
        </div>

        <CellList mode="island" filled>
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
        </CellList>

        <div style={{ padding: '20px 16px calc(8px + env(safe-area-inset-bottom))' }}>
          <Button
            size="medium"
            mode="secondary"
            appearance="negative"
            stretched
            onClick={() => {
              resetAll();
              close();
            }}
          >
            Сбросить данные демо
          </Button>
        </div>
      </div>
    </div>
  );
}
