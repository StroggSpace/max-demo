import { motion } from 'motion/react';
import { Navigate, Outlet, useLocation, useParams } from 'react-router-dom';

import { Shell } from '@/app/Shell';
import { CategoryTabBar } from '@/widgets/CategoryTabBar';
import { categoryById } from '@/app/categories';
import { StubCategory } from './StubCategory';

export function CategoryShell() {
  const { id = '' } = useParams();
  const { pathname } = useLocation();
  const category = categoryById(id);

  if (!category) return <Navigate to="/" replace />;

  if (category.stub) {
    return (
      <Shell title={category.title} subtitle={category.subtitle} back>
        <StubCategory category={category} />
      </Shell>
    );
  }

  return (
    <Shell
      title={category.title}
      subtitle={category.subtitle}
      back
      tabBar={<CategoryTabBar categoryId={category.id} tabs={category.tabs ?? []} />}
    >
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.18 }}
      >
        <Outlet />
      </motion.div>
    </Shell>
  );
}
