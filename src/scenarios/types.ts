import type { SectionId } from '@/store/demo';

export interface ScenarioStep {
  /** Момент запуска в демо-миллисекундах от старта сценария */
  at: number;
  run: () => void;
}

export interface Scenario {
  id: SectionId;
  title: string;
  /** Приводит раздел к исходному состоянию перед проигрыванием */
  reset: () => void;
  steps: ScenarioStep[];
}
