import { useEffect } from 'react';
import { MaxUI } from '@maxhub/max-ui';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { TabBar } from '@/widgets/TabBar';
import { DemoPanel } from '@/features/demo-panel/DemoPanel';
import { ErrorBoundary } from '@/shared/ui/ErrorBoundary';
import { Toaster } from '@/shared/ui/toast/Toaster';
import { HomePage } from '@/pages/Home';
import { TasksPage } from '@/pages/Tasks';
import { GiveawaysPage } from '@/pages/Giveaways';
import { ShopPage } from '@/pages/Shop';
import { ProfilePage } from '@/pages/Profile';
import { useDemoStore } from '@/store/demo';

export function App() {
  const theme = useDemoStore((s) => s.theme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  return (
    <MaxUI colorScheme={theme} className="appRoot">
      <BrowserRouter>
        <div className="app">
          <ErrorBoundary>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/tasks" element={<TasksPage />} />
              <Route path="/giveaways" element={<GiveawaysPage />} />
              <Route path="/shop" element={<ShopPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </ErrorBoundary>
        </div>

        <TabBar />
        <Toaster />
        <DemoPanel />
      </BrowserRouter>
    </MaxUI>
  );
}
