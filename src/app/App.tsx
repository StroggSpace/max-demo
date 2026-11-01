import { AnimatePresence, motion } from 'motion/react';
import { BrowserRouter, Navigate, Route, Routes, useLocation, useParams } from 'react-router-dom';

import { AppProviders } from '@/app/AppProviders';
import { categoryById } from '@/app/categories';
import { AppHeader } from '@/widgets/AppHeader';
import { CategoryTabBar } from '@/widgets/CategoryTabBar';
import { PromoModal } from '@/shared/ui/PromoModal';
import { useMotionControls } from '@/shared/motion/useMotionControls';
import { getCartCount, useSalesStore } from '@/store/sales';
import { CategorySelect } from '@/pages/CategorySelect';
import { SettingsPage } from '@/pages/Settings';
import { StubCategory } from '@/pages/category/StubCategory';
import { categoryTabs } from '@/app/categoryTabs';
import type { CategoryId } from '@/app/categories';

function CategoryEntry() {
  const { id = '' } = useParams();
  const category = categoryById(id);

  if (!category) return <Navigate to="/" replace />;
  if (category.stub) return <StubCategory category={category} />;

  const first = category.tabs?.[0]?.to;
  return first
    ? <Navigate to={`/category/${category.id}/${first}`} replace />
    : <Navigate to="/" replace />;
}

function CategoryTab() {
  const { id = '', tab = '' } = useParams();
  const category = categoryById(id);

  if (!category) return <Navigate to="/" replace />;
  if (category.stub) return <Navigate to={`/category/${category.id}`} replace />;

  const Tab = categoryTabs[category.id]?.[tab];
  if (Tab) return <Tab />;

  const first = category.tabs?.[0]?.to;
  return first
    ? <Navigate to={`/category/${category.id}/${first}`} replace />
    : <Navigate to="/" replace />;
}

interface Meta {
  title: string;
  subtitle?: string;
  back?: boolean;
  hideSettings?: boolean;
  categoryId?: CategoryId;
}

function resolveMeta(pathname: string): Meta {
  if (pathname === '/settings') {
    return {
      title: 'Настройки',
      subtitle: 'Глобальные настройки',
      back: true,
      hideSettings: true,
    };
  }

  const match = pathname.match(/^\/category\/([^/]+)/);
  const category = match ? categoryById(match[1]) : undefined;

  if (category) {
    return {
      title: category.title,
      subtitle: category.subtitle,
      back: true,
      categoryId: category.id,
    };
  }

  return { title: 'Модули демо', subtitle: 'Мини-приложения MAX' };
}

function AppLayout() {
  const location = useLocation();
  const { get } = useMotionControls();
  const meta = resolveMeta(location.pathname);
  const category = meta.categoryId ? categoryById(meta.categoryId) : undefined;
  const tabs = category && !category.stub ? category.tabs : undefined;
  const cartCount = useSalesStore(getCartCount);
  const badges = category?.id === 'sales' ? { cart: cartCount } : undefined;

  return (
    <div className="shell">
      <AppHeader
        title={meta.title}
        subtitle={meta.subtitle}
        back={meta.back}
        hideSettings={meta.hideSettings}
      />

      <main className="main">
        <div className="mainInner">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={location.pathname} {...get('page')}>
              <Routes location={location}>
                <Route path="/" element={<CategorySelect />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/category/:id" element={<CategoryEntry />} />
                <Route path="/category/:id/:tab" element={<CategoryTab />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {tabs && category ? (
        <CategoryTabBar categoryId={category.id} tabs={tabs} badges={badges} />
      ) : null}
    </div>
  );
}

export function App() {
  return (
    <AppProviders>
      <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '') || '/'}>
        <AppLayout />
        <PromoModal />
      </BrowserRouter>
    </AppProviders>
  );
}
