export interface ScenarioStep {
  /** Момент запуска в миллисекундах от старта сценария */
  at: number;
  run: () => void;
}

export interface Scenario {
  id: string;
  title: string;
  /** Приводит данные к исходному состоянию перед проигрыванием */
  reset: () => void;
  steps: ScenarioStep[];
}
