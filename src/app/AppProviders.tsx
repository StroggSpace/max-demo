import { useEffect } from 'react';
import { MaxUI } from '@maxhub/max-ui';
import { useDemoStore } from '@/store/demo';
import { brandStyle } from '@/shared/brand/tokens';

export function AppProviders({ children }: { children: React.ReactNode }) {
  const theme = useDemoStore((s) => s.theme);
  const brand = useDemoStore((s) => s.brand);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  return (
    <MaxUI colorScheme={theme}>
      <div className="appRoot" data-brand={brand} style={brandStyle(brand, theme)}>
        {children}
      </div>
    </MaxUI>
  );
}
