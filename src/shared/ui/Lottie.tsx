import { DotLottieReact } from '@lottiefiles/dotlottie-react';

interface Props {
  src?: string;
  className?: string;
  loop?: boolean;
  autoplay?: boolean;
}

/**
 * Lottie-анимация (.lottie). Ассеты лежат в public/lottie.
 * При prefers-reduced-motion анимация не запускается.
 */
export function Lottie({ src, className, loop = true, autoplay = true }: Props) {
  if (!src) return null;

  const reduced =
    typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  return (
    <div className={className} aria-hidden="true">
      <DotLottieReact
        src={src}
        loop={reduced ? false : loop}
        autoplay={reduced ? false : autoplay}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
}
