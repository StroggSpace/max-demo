import { useDemoStore } from '@/store/demo';
import { motionConfig, type MotionKey, type MotionPreset } from './config';

const instant = (preset: MotionPreset): MotionPreset => ({
  initial: false,
  animate: preset.animate,
  exit: preset.animate,
  transition: { duration: 0 },
});

/**
 * Возвращает анимационные пропсы из общего конфига.
 * Если анимации выключены в настройках — возвращает мгновенные переходы.
 */
export function useMotionControls() {
  const enabled = useDemoStore((s) => s.motionEnabled);

  const get = (key: MotionKey, delay = 0): MotionPreset => {
    if (!enabled) return instant(motionConfig[key]);

    const preset = motionConfig[key];
    if (!delay) return preset;

    return {
      ...preset,
      transition: { ...(preset.transition as object), delay },
    };
  };

  return {
    enabled,
    get,
    tap: enabled ? { whileTap: { scale: 0.975 } } : {},
    press: enabled ? { whileTap: { scale: 0.99 } } : {},
  };
}
