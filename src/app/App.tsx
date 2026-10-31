import { lazy, Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';

import { AppProviders } from '@/app/AppProviders';
import { routeMeta } from '@/app/routes';
import { AppHeader } from '@/widgets/AppHeader';
import { TabBar } from '@/widgets/TabBar';
import { Toaster } from '@/shared/ui/toast/Toaster';
import { LoadingState } from '@/shared/ui/kit';

const HomePage = lazy(() => import('@/pages/Home').then((m) => ({ default: m.HomePage })));
const TasksPage = lazy(() => import('@/pages/Tasks').then((m) => ({ default: m.TasksPage })));
const GiveawaysPage = lazy(() =>
  import('@/pages/Giveaways').then((m) => ({ default: m.GiveawaysPage })),
);
const ShopPage = lazy(() => import('@/pages/Shop').then((m) => ({ default: m.ShopPage })));
const ProfilePage = lazy(() =>
  import('@/pages/Profile').then((m) => ({ default: m.ProfilePage })),
);
const SettingsPage = lazy(() =>
  import('@/pages/Settings').then((m) => ({ default: m.SettingsPage })),
);

function Shell() {
  const { pathname } = useLocation();
  const meta = routeMeta[pathname] ?? routeMeta['/'];
  const showTabBar = pathname !== '/settings';

  return (
    <div className="shell">
      <AppHeader title={meta.title} subtitle={meta.subtitle} back={meta.back} />

      <main className="main">
        <div className="mainInner">
          <Suspense fallback={<LoadingState title="Открываем раздел" />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/tasks" element={<TasksPage />} />
              <Route path="/giveaways" element={<GiveawaysPage />} />
              <Route path="/shop" element={<ShopPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </div>
      </main>

      {showTabBar ? <TabBar /> : null}
      <Toaster />
    </div>
  );
}

export function App() {
  return (
    <AppProviders>
      <BrowserRouter>
        <Shell />
      </BrowserRouter>
    </AppProviders>
  );
}
