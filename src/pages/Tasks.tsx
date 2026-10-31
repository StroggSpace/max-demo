import { AppHeader } from '@/widgets/AppHeader';
import { ScenarioControls } from '@/features/scenario/ScenarioControls';
import { useSectionScenario } from '@/features/scenario/useSectionScenario';
import { scenarios } from '@/scenarios';
import { useDemoStore } from '@/store/demo';

export function TasksPage() {
  const scenario = useSectionScenario(scenarios.tasks);
  const tasks = useDemoStore((s) => s.tasks);

  const done = tasks.filter((task) => task.done).length;
  const earned = tasks.filter((task) => task.done).reduce((sum, task) => sum + task.reward, 0);

  return (
    <div>
      <AppHeader title="Задания" subtitle="Выполняйте и получайте баллы" />

      <section className="card card--flat">
        <div className="row row--between">
          <div>
            <div className="small muted">Выполнено</div>
            <div className="balance" style={{ fontSize: 26, marginTop: 4 }}>
              {done}
              <small>из {tasks.length}</small>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div className="small muted">Заработано</div>
            <div className="balance" style={{ fontSize: 26, marginTop: 4 }}>
              +{earned}
              <small>баллов</small>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="feed" style={{ gap: 10 }}>
          {tasks.map((task) => {
            const percent = Math.round((task.progress / task.goal) * 100);
            return (
              <article
                key={task.id}
                className={`task ${task.done ? 'task--done' : ''}`}
                style={{ gap: 12 }}
              >
                <div className="row row--between" style={{ alignItems: 'flex-start' }}>
                  <div className="grow">
                    <div className="task__title">{task.title}</div>
                    <div className="tiny muted" style={{ marginTop: 4 }}>
                      {task.subtitle}
                    </div>
                  </div>
                  {task.done ? (
                    <span className="task__check">✓</span>
                  ) : (
                    <span className="task__reward">+{task.reward}</span>
                  )}
                </div>

                <div className="progress">
                  <div className="progress__bar" style={{ width: `${percent}%` }} />
                </div>

                <div className="row row--between tiny muted">
                  <span>
                    {Math.min(task.progress, task.goal)} / {task.goal}
                  </span>
                  <span>{task.done ? 'Зачислено' : 'В процессе'}</span>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <ScenarioControls scenario={scenario} />
    </div>
  );
}
