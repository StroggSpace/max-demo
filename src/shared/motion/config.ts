import type { TargetAndTransition, Transition } from 'motion/react';

const easeOut: Transition['ease'] = [0.22, 1, 0.36, 1];

export interface MotionPreset {
  initial?: TargetAndTransition | boolean;
  animate: TargetAndTransition;
  exit?: TargetAndTransition;
  transition?: Transition;
}

/**
 * Единый конфиг анимаций. Все движения интерфейса описываются здесь,
 * компоненты только выбирают вариант через useMotionControls().
 */
export const motionConfig = {
  page: {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -8 },
    transition: { duration: 0.22, ease: easeOut },
  },
  card: {
    initial: { opacity: 0, y: 16, scale: 0.985 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, scale: 0.985 },
    transition: { duration: 0.24, ease: easeOut },
  },
  listItem: {
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0 },
    transition: { duration: 0.2, ease: easeOut },
  },
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.2, ease: easeOut },
  },
  backdrop: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.18 },
  },
  modal: {
    initial: { opacity: 0, y: 24, scale: 0.95 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: 16, scale: 0.97 },
    transition: { type: 'spring', stiffness: 380, damping: 32, mass: 0.9 },
  },
  pop: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
    transition: { type: 'spring', stiffness: 420, damping: 28 },
  },
} satisfies Record<string, MotionPreset>;

export type MotionKey = keyof typeof motionConfig;
