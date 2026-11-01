import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { AppProviders } from '@/app/AppProviders';
import { Shell } from '@/app/Shell';
import { PromoModal } from '@/shared/ui/PromoModal';
import { CategorySelect } from '@/pages/CategorySelect';
import { SettingsPage } from '@/pages/Settings';
import { CategoryShell } from '@/pages/category/CategoryShell';
import { SeasonTab } from '@/pages/category/SeasonTab';
import { TasksTab } from '@/pages/category/TasksTab';
import { AchievementsTab } from '@/pages/category/AchievementsTab';
import { ProfileTab } from '@/pages/category/ProfileTab';

function HomeScreen() {
  return (
    <Shell title="Модули демо" subtitle="Мини-приложения MAX">
      <CategorySelect />
    </Shell>
  );
}

function SettingsScreen() {
  return (
    <Shell title="Настройки" subtitle="Глобальные настройки" back hideSettings>
      <SettingsPage />
    </Shell>
  );
}

function CategoryIndex() {
  return <Navigate to="season" replace />;
}

export function App() {
  return (
    <AppProviders>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/settings" element={<SettingsScreen />} />

          <Route path="/category/:id" element={<CategoryShell />}>
            <Route index element={<CategoryIndex />} />
            <Route path="season" element={<SeasonTab />} />
            <Route path="tasks" element={<TasksTab />} />
            <Route path="achievements" element={<AchievementsTab />} />
            <Route path="profile" element={<ProfileTab />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        <PromoModal />
      </BrowserRouter>
    </AppProviders>
  );
}
