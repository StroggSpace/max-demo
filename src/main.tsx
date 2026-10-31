import { createRoot } from 'react-dom/client';

import '@maxhub/max-ui/dist/styles.css';
import '@/styles/global.css';

import { App } from '@/app/App';

const container = document.getElementById('root');
if (!container) throw new Error('Root element not found');

createRoot(container).render(<App />);
