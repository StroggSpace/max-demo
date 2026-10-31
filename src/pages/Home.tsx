import { useNavigate } from 'react-router-dom';

import { AppHeader } from '@/widgets/AppHeader';
import { Lottie } from '@/shared/ui/Lottie';
import { ScenarioControls } from '@/features/scenario/ScenarioControls';
import { useSectionScenario } from '@/features/scenario/useSectionScenario';
import { useGiveawayTicker } from '@/features/giveaway/useGiveawayTicker';
import { scenarios } from '@/scenarios';
import { useDemoStore } from '@/store/demo';
import styles from './Home.module.css';

function formatTime(total: number) {
  const safe = Math.max(0, total);
  const minutes = Math.floor(safe / 60);
  const seconds = safe % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

export function HomePage() {
  const navigate = useNavigate();
  const scenario = useSectionScenario(scenarios.home);
  useGiveawayTicker();

  const balance = useDemoStore((s) => s.balance);
  const level = useDemoStore((s) => s.level);
  const xp = useDemoStore((s) => s.xp);
  const xpMax = useDemoStore((s) => s.xpMax);
  const feed = useDemoStore((s) => s.feed);
  const giveaway = useDemoStore((s) => s.giveaway);

  const progress = Math.min(100, Math.round((xp / xpMax) * 100));

  return (
    <div>
      <AppHeader title="Главная" subtitle="Демо мини-приложения MAX" />

      <section className="card">
        <div className="row row--between">
          <span className="small muted">Ваш баланс</span>
          <span className="chip chip--accent">Уровень {level}</span>
        </div>

        <div className="balance" style={{ marginTop: 10 }}>
          {balance.toLocaleString('ru-RU')}
          <small>баллов</small>
        </div>

        <div className="progress" style={{ marginTop: 16 }}>
          <div className="progress__bar" style={{ width: `${progress}%` }} />
        </div>

        <div className="row row--between small muted" style={{ marginTop: 8 }}>
          <span>
            {xp} из {xpMax} XP
          </span>
          <span>до уровня {level + 1}</span>
        </div>
      </section>

      <section className="section">
        <div className="hero">
          <Lottie src="/lottie/pulse.json" className={styles.pulse} />
          <div className={styles.heroLabel}>Активный розыгрыш</div>
          <p className="hero__prize">{giveaway.prize}</p>

          <div className={styles.heroBottom}>
            <div>
              <div className="hero__timer">{formatTime(giveaway.secondsLeft)}</div>
              <div className="tiny" style={{ opacity: 0.8, marginTop: 4 }}>
                до конца приёма заявок
              </div>
            </div>
            <div className="small" style={{ textAlign: 'right', opacity: 0.9 }}>
              {giveaway.participants} участников
            </div>
          </div>

          <button type="button" className={styles.cta} onClick={() => navigate('/giveaways')}>
            Открыть розыгрыш
          </button>
        </div>
      </section>

      <section className="section">
        <div className="section__head">
          <h2 className="section__title">Лента</h2>
          <span className="tiny muted">обновляется вживую</span>
        </div>

        <div className="feed">
          {feed.map((item) => (
            <div className="feed__item" key={item.id}>
              <span className={`feed__dot ${item.accent ? 'feed__dot--accent' : ''}`} />
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      </section>

      <ScenarioControls scenario={scenario} />
    </div>
  );
}
