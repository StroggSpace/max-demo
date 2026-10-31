import { createRoot } from 'react-dom/client';
import { setWasmUrl } from '@lottiefiles/dotlottie-react';

import '@maxhub/max-ui/dist/styles.css';
import '@/styles/global.css';

import { App } from '@/app/App';

// Lottie-плеер не должен тянуть WASM с CDN: работаем офлайн и внутри MAX.
setWasmUrl('/lottie/dotlottie-player.wasm');

const container = document.getElementById('root');
if (!container) throw new Error('Root element not found');

createRoot(container).render(<App />);
