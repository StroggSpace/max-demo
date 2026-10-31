import { useEffect } from 'react';
import { MaxUI } from '@maxhub/max-ui';
import { useDemoStore } from '@/store/demo';

export function AppProviders({ children }: { children: React.ReactNode }) {
  const theme = useDemoStore((s) => s.theme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  return (
    <MaxUI colorScheme={theme} className="appRoot">
      {children}
    </MaxUI>
  );
}
