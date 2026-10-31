import { useState } from 'react';

import { AppHeader } from '@/widgets/AppHeader';
import { ScenarioControls } from '@/features/scenario/ScenarioControls';
import { useSectionScenario } from '@/features/scenario/useSectionScenario';
import { scenarios } from '@/scenarios';
import { useDemoStore } from '@/store/demo';
import { platform } from '@/platform';

const achievements = [
  { title: 'Первый вход', icon: '★', hint: 'Открыть приложение' },
  { title: 'Первые задания', icon: '✓', hint: 'Выполнить 2 задания' },
  { title: 'Участник розыгрыша', icon: '🎁', hint: 'Подать заявку' },
  { title: 'Первый выигрыш', icon: '🏆', hint: 'Выиграть приз' },
  { title: 'Первый обмен', icon: '🛍', hint: 'Обменять баллы' },
  { title: 'Активный пользователь', icon: '⚡️', hint: 'Заходить 7 дней подряд' },
];

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
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div>
      <AppHeader title="Профиль" subtitle="Личный кабинет участника" />

      <section className="card">
        <div className="row">
          <div className="avatar">{user.firstName.slice(0, 1)}</div>
          <div className="grow">
            <div style={{ fontSize: 18, fontWeight: 750, letterSpacing: '-0.02em' }}>
              {user.firstName} {user.lastName}
            </div>
            <div className="small muted" style={{ marginTop: 3 }}>
              Уровень {level} · {balance.toLocaleString('ru-RU')} баллов
            </div>
          </div>
          <span className="chip chip--accent">MAX ID</span>
        </div>
      </section>

      <section className="section">
        <div className="stats">
          <div className="stat">
            <div className="stat__value">{completed}</div>
            <div className="stat__label">заданий</div>
          </div>
          <div className="stat">
            <div className="stat__value">{unlocked.length}</div>
            <div className="stat__label">достижений</div>
          </div>
          <div className="stat">
            <div className="stat__value">{level}</div>
            <div className="stat__label">уровень</div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section__head">
          <h2 className="section__title">Приглашение</h2>
        </div>

        <div className="card">
          <div className="small muted">Ваш код</div>
          <div className="row row--between" style={{ marginTop: 8 }}>
            <span style={{ fontSize: 18, fontWeight: 750, letterSpacing: '0.02em' }}>{code}</span>
            <button
              type="button"
              className="chip chip--accent"
              style={{ border: 0, cursor: 'pointer', height: 30 }}
              onClick={copy}
            >
              {copied ? 'Скопировано' : 'Копировать'}
            </button>
          </div>
          <div className="tiny muted" style={{ marginTop: 10 }}>
            За каждого друга — 150 баллов после первого входа.
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section__head">
          <h2 className="section__title">Достижения</h2>
          <span className="tiny muted">
            {unlocked.length} из {achievements.length}
          </span>
        </div>

        <div className="feed" style={{ gap: 8 }}>
          {achievements.map((item) => {
            const isUnlocked = unlocked.includes(item.title);
            return (
              <div
                className="achievement"
                key={item.title}
                style={{ opacity: isUnlocked ? 1 : 0.55 }}
              >
                <span className="achievement__icon" style={{
                  background: isUnlocked ? undefined : 'var(--surface-2)',
                  color: isUnlocked ? undefined : 'var(--muted)',
                }}>
                  {item.icon}
                </span>
                <div className="grow">
                  <div style={{ fontWeight: 650 }}>{item.title}</div>
                  <div className="tiny muted">{item.hint}</div>
                </div>
                <span className="tiny muted">{isUnlocked ? 'открыто' : 'закрыто'}</span>
              </div>
            );
          })}
        </div>
      </section>

      <ScenarioControls scenario={scenario} />
    </div>
  );
}
