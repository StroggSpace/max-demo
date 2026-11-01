import type { ReactNode } from 'react';

import { AppHeader } from '@/widgets/AppHeader';

interface ShellProps {
  title: string;
  subtitle?: string;
  back?: boolean;
  hideSettings?: boolean;
  tabBar?: ReactNode;
  children: ReactNode;
}

export function Shell({ title, subtitle, back, hideSettings, tabBar, children }: ShellProps) {
  return (
    <div className="shell">
      <AppHeader title={title} subtitle={subtitle} back={back} hideSettings={hideSettings} />
      <main className="main">
        <div className="mainInner">{children}</div>
      </main>
      {tabBar}
    </div>
  );
}
