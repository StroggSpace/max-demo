export interface PlatformUser {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
}

export interface PlatformAdapter {
  name: 'max' | 'web';
  user: PlatformUser;
  haptic: (type?: 'light' | 'medium' | 'success') => void;
}

interface MaxWebApp {
  initDataUnsafe?: {
    user?: {
      id?: number;
      first_name?: string;
      last_name?: string;
      username?: string;
    };
  };
  HapticFeedback?: {
    impactOccurred: (style: 'light' | 'medium' | 'heavy') => Promise<unknown>;
    notificationOccurred: (type: 'success' | 'error' | 'warning') => Promise<unknown>;
  };
}

declare global {
  interface Window {
    WebApp?: MaxWebApp;
  }
}

const mockUser: PlatformUser = {
  id: 7,
  firstName: 'Игорь',
  lastName: '',
  username: 'igor',
};

const webAdapter: PlatformAdapter = {
  name: 'web',
  user: mockUser,
  haptic: () => {},
};

function detectMax(): PlatformAdapter | null {
  const app = window.WebApp;
  if (!app?.initDataUnsafe?.user) return null;

  const user = app.initDataUnsafe.user;

  return {
    name: 'max',
    user: {
      id: user.id ?? mockUser.id,
      firstName: user.first_name ?? mockUser.firstName,
      lastName: user.last_name ?? '',
      username: user.username ?? '',
    },
    haptic: (type = 'light') => {
      try {
        if (type === 'success') {
          void app.HapticFeedback?.notificationOccurred('success');
        } else {
          void app.HapticFeedback?.impactOccurred(type);
        }
      } catch {
        // Вне клиента MAX вибрация недоступна — молча игнорируем.
      }
    },
  };
}

export const platform: PlatformAdapter = detectMax() ?? webAdapter;
