import { Component, type ErrorInfo, type ReactNode } from 'react';

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
      <div className="card" style={{ marginTop: 24 }}>
        <div style={{ fontSize: 16, fontWeight: 700 }}>Раздел не загрузился</div>
        <div className="small muted" style={{ marginTop: 6 }}>
          {this.state.error.message}
        </div>
        <button
          type="button"
          className="chip chip--accent"
          style={{ border: 0, marginTop: 12, height: 32, cursor: 'pointer' }}
          onClick={() => window.location.reload()}
        >
          Перезагрузить
        </button>
      </div>
    );
  }
}
