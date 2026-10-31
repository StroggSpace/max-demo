import { useRef } from 'react';
import { EllipsisHorizontalIcon, MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import { Flex, IconButton, Typography } from '@maxhub/max-ui';

import { useDemoStore } from '@/store/demo';
import { useUiStore } from '@/app/ui';

interface Props {
  title: string;
  subtitle?: string;
}

export function AppHeader({ title, subtitle }: Props) {
  const theme = useDemoStore((s) => s.theme);
  const toggleTheme = useDemoStore((s) => s.toggleTheme);
  const openPanel = useUiStore((s) => s.openPanel);
  const taps = useRef<number[]>([]);

  const handleSecretTap = () => {
    const now = Date.now();
    taps.current = [...taps.current.filter((time) => now - time < 700), now];
    if (taps.current.length >= 3) {
      taps.current = [];
      openPanel();
    }
  };

  return (
    <Flex
      align="center"
      gap={4}
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 20,
        margin: '0 -16px',
        padding: `calc(10px + env(safe-area-inset-top)) 12px 10px`,
        background: 'var(--background-surface-ground)',
        borderBottom: '1px solid var(--stroke-secondary)',
      }}
    >
      <Flex direction="column" gap={2} style={{ flex: 1, minWidth: 0, paddingLeft: 4 }}>
        <Typography.Title variant="large-strong" asChild>
          <h1 style={{ margin: 0 }} onClick={handleSecretTap}>
            {title}
          </h1>
        </Typography.Title>
        {subtitle ? (
          <Typography.Body variant="small" style={{ color: 'var(--text-secondary)' }}>
            {subtitle}
          </Typography.Body>
        ) : null}
      </Flex>

      <IconButton
        size="medium"
        mode="tertiary"
        onClick={toggleTheme}
        aria-label={theme === 'light' ? 'Тёмная тема' : 'Светлая тема'}
      >
        {theme === 'light' ? (
          <MoonIcon style={{ width: 22, height: 22 }} />
        ) : (
          <SunIcon style={{ width: 22, height: 22 }} />
        )}
      </IconButton>

      <IconButton
        size="medium"
        mode="tertiary"
        onClick={openPanel}
        aria-label="Настройки демо"
      >
        <EllipsisHorizontalIcon style={{ width: 24, height: 24 }} />
      </IconButton>
    </Flex>
  );
}
