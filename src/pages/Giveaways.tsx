import { AppHeader } from '@/widgets/AppHeader';
import { ScenarioControls } from '@/features/scenario/ScenarioControls';
import { useSectionScenario } from '@/features/scenario/useSectionScenario';
import { useGiveawayTicker } from '@/features/giveaway/useGiveawayTicker';
import { scenarios } from '@/scenarios';
import { useDemoStore } from '@/store/demo';
import styles from './Giveaways.module.css';

function formatTime(total: number) {
  const safe = Math.max(0, total);
  const minutes = Math.floor(safe / 60);
  const seconds = safe % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

export function GiveawaysPage() {
  const scenario = useSectionScenario(scenarios.giveaways);
  useGiveawayTicker();

  const giveaway = useDemoStore((s) => s.giveaway);
  const setGiveaway = useDemoStore((s) => s.setGiveaway);
  const pushFeed = useDemoStore((s) => s.pushFeed);
  const balance = useDemoStore((s) => s.balance);

  const join = () => {
    if (giveaway.joined) return;
    setGiveaway({ joined: true });
    pushFeed('Вы участвуете в розыгрыше', true);
  };

  const phase = giveaway.phase;

  return (
    <div>
      <AppHeader title="Розыгрыши" subtitle={`Баланс: ${balance.toLocaleString('ru-RU')} баллов`} />

      <section className="hero">
        <div className={styles.label}>Приз</div>
        <p className="hero__prize">{giveaway.prize}</p>

        <div className={styles.timerRow}>
          <div>
            <div className="hero__timer">
              {phase === 'idle' ? '—:—' : formatTime(giveaway.secondsLeft)}
            </div>
            <div className="tiny" style={{ opacity: 0.8, marginTop: 4 }}>
              {phase === 'idle' ? 'розыгрыш ещё не начался' : 'до конца приёма заявок'}
            </div>
          </div>

          <div className={styles.participants}>
            <div className={styles.participantsValue}>{giveaway.participants}</div>
            <div className="tiny" style={{ opacity: 0.8 }}>
              участников
            </div>
          </div>
        </div>

        <button
          type="button"
          className={styles.cta}
          onClick={join}
          disabled={giveaway.joined || phase === 'result'}
        >
          {giveaway.joined ? 'Вы участвуете' : 'Участвовать'}
        </button>
      </section>

      {phase === 'result' ? (
        <section className="card" style={{ marginTop: 14 }}>
          {giveaway.result === 'win' ? (
            <>
              <div className={styles.resultBadge} data-kind="win">
                🎉
              </div>
              <div className={styles.resultTitle}>Вы выиграли</div>
              <div className="small muted" style={{ marginTop: 4 }}>
                {giveaway.prize} уже в вашем профиле
              </div>
            </>
          ) : (
            <>
              <div className={styles.resultBadge}>🙂</div>
              <div className={styles.resultTitle}>В этот раз не выиграли</div>
              <div className="small muted" style={{ marginTop: 4 }}>
                Следующий розыгрыш — через неделю
              </div>
            </>
          )}
        </section>
      ) : (
        <section className="card" style={{ marginTop: 14 }}>
          <div className="row row--between">
            <span className="small muted">Ваше участие</span>
            <span className={`chip ${giveaway.joined ? 'chip--success' : ''}`}>
              {giveaway.joined ? 'Заявка принята' : 'Не участвуете'}
            </span>
          </div>

          <div className="progress" style={{ marginTop: 12 }}>
            <div
              className="progress__bar"
              style={{ width: giveaway.joined ? '100%' : '0%' }}
            />
          </div>

          <div className="tiny muted" style={{ marginTop: 8 }}>
            Условия: один аккаунт — одна заявка. Баллы не списываются.
          </div>
        </section>
      )}

      <section className="section">
        <div className="section__head">
          <h2 className="section__title">Скоро</h2>
          <span className="tiny muted">ещё 2 розыгрыша</span>
        </div>

        <div className="feed" style={{ gap: 10 }}>
          {[
            { title: 'Кофе на месяц', meta: 'старт через 2 дня · 480 участников' },
            { title: 'Мерч бренда', meta: 'старт 1 мая · 213 участников' },
          ].map((item) => (
            <div className="card" key={item.title} style={{ padding: 14 }}>
              <div className="row row--between">
                <div>
                  <div style={{ fontWeight: 650, fontSize: 14 }}>{item.title}</div>
                  <div className="tiny muted" style={{ marginTop: 3 }}>
                    {item.meta}
                  </div>
                </div>
                <span className="chip">скоро</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <ScenarioControls scenario={scenario} />
    </div>
  );
}
