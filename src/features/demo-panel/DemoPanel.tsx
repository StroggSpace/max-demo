import { useEffect } from 'react';

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
        <div className={styles.head}>
          <div>
            <div className={styles.title}>Настройки демо</div>
            <div className={styles.subtitle}>Скрытая панель · тройной тап по заголовку</div>
          </div>
          <button type="button" className={styles.close} onClick={close} aria-label="Закрыть">
            ✕
          </button>
        </div>

        <div className={styles.group}>
          <div className={styles.groupTitle}>Тема</div>
          <div className={styles.segmented}>
            {(['light', 'dark'] as const).map((value) => (
              <button
                key={value}
                type="button"
                className={`${styles.segment} ${theme === value ? styles.segmentActive : ''}`}
                onClick={() => setTheme(value)}
              >
                {value === 'light' ? 'Светлая' : 'Тёмная'}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.group}>
          <div className={styles.groupTitle}>Автопроигрывание</div>
          <label className={styles.switchRow}>
            <span className={styles.switchLabel}>Сценарии на разделах</span>
            <input
              type="checkbox"
              checked={autoplay}
              onChange={(event) => setAutoplay(event.target.checked)}
            />
          </label>
          <div className={styles.hint}>
            Пользователь тронул экран — сценарий встаёт на паузу.
          </div>
        </div>

        <div className={styles.group}>
          <div className={styles.groupTitle}>Скорость</div>
          <div className={styles.segmented}>
            {[1, 2, 4].map((value) => (
              <button
                key={value}
                type="button"
                className={`${styles.segment} ${speed === value ? styles.segmentActive : ''}`}
                onClick={() => setSpeed(value)}
              >
                ×{value}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.group}>
          <div className={styles.groupTitle}>Отключить сценарии</div>
          <div className={styles.toggles}>
            {sections.map((section) => {
              const isDisabled = Boolean(disabled[section.id]);
              return (
                <button
                  key={section.id}
                  type="button"
                  className={`${styles.toggle} ${isDisabled ? styles.toggleOff : ''}`}
                  onClick={() => toggleSection(section.id)}
                >
                  <span>{section.title}</span>
                  <span className={styles.toggleState}>{isDisabled ? 'выкл' : 'вкл'}</span>
                </button>
              );
            })}
          </div>
        </div>

        <button
          type="button"
          className={styles.reset}
          onClick={() => {
            resetAll();
            close();
          }}
        >
          Сбросить данные демо
        </button>
      </div>
    </div>
  );
}
