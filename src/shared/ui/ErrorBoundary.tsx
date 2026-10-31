import { Component, type ErrorInfo, type ReactNode } from 'react';
import { Button, Typography } from '@maxhub/max-ui';

import { Card } from '@/shared/ui/kit';

interface Props {
  children: ReactNode;
}

interface State {
  error: Error | null;
}

/**
 * Демо не должно показывать белый экран на встрече:
 * при падении раздела показываем заглушку и кнопку перезагрузки.
 */
export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Demo section crashed', error, info);
  }

  render() {
    if (!this.state.error) return this.props.children;

    return (
      <Card>
        <Typography.Title variant="medium-strong">Раздел не загрузился</Typography.Title>
        <Typography.Body variant="small" style={{ color: 'var(--text-secondary)' }}>
          {this.state.error.message}
        </Typography.Body>
        <Button
          size="small"
          mode="secondary"
          onClick={() => window.location.reload()}
        >
          Перезагрузить
        </Button>
      </Card>
    );
  }
}
