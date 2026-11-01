import { create } from 'zustand';

export interface Product {
  id: string;
  title: string;
  subtitle: string;
  price: number;
  points: number;
  emoji: string;
  badge?: string;
}

export interface CartItem {
  productId: string;
  qty: number;
}

export interface Invite {
  id: string;
  name: string;
  status: 'joined' | 'pending';
  reward: number;
}

export interface Order {
  number: string;
  total: number;
  discount: number;
}

export type GiveawayPhase = 'idle' | 'countdown' | 'result';

interface SalesState {
  products: Product[];
  cart: CartItem[];
  promoApplied: boolean;
  order: Order | null;
  invites: Invite[];
  code: string;
  giveaway: {
    phase: GiveawayPhase;
    secondsLeft: number;
    participants: number;
    joined: boolean;
    result: 'win' | 'lose' | null;
    prize: string;
  };

  addToCart: (productId: string) => void;
  removeFromCart: (productId: string) => void;
  decrementItem: (productId: string) => void;
  clearCart: () => void;
  applyPromo: (code: string) => boolean;
  placeOrder: () => void;
  addInvite: (name: string) => void;
  setGiveaway: (patch: Partial<SalesState['giveaway']>) => void;
  resetShop: () => void;
  resetCheckout: () => void;
  resetGiveaway: () => void;
  resetReferral: () => void;
}

const initialProducts: Product[] = [
  {
    id: 's1',
    title: 'Кофе зерновой',
    subtitle: 'Обжарка партнёра',
    price: 1290,
    points: 600,
    emoji: '☕️',
    badge: 'Хит',
  },
  {
    id: 's2',
    title: 'Сертификат 1000 ₽',
    subtitle: 'На любой заказ',
    price: 1000,
    points: 500,
    emoji: '🎁',
  },
  {
    id: 's3',
    title: 'Мерч бренда',
    subtitle: 'Ограниченная серия',
    price: 2900,
    points: 1500,
    emoji: '🧢',
  },
  {
    id: 's4',
    title: 'Доставка бесплатно',
    subtitle: 'Один заказ',
    price: 400,
    points: 200,
    emoji: '🚀',
  },
  {
    id: 's5',
    title: 'Билет на событие',
    subtitle: 'Закрытый показ',
    price: 3500,
    points: 2000,
    emoji: '🎟️',
    badge: 'Мало мест',
  },
  {
    id: 's6',
    title: 'Кофе на месяц',
    subtitle: 'Подписка на 4 недели',
    price: 2400,
    points: 1200,
    emoji: '📦',
  },
];

const initialInvites: Invite[] = [
  { id: 'i1', name: 'Марина', status: 'joined', reward: 150 },
  { id: 'i2', name: 'Алексей', status: 'joined', reward: 150 },
];

const initialGiveaway: SalesState['giveaway'] = {
  phase: 'idle',
  secondsLeft: 38,
  participants: 214,
  joined: false,
  result: null,
  prize: 'Сертификат 5000 ₽',
};

export const useSalesStore = create<SalesState>((set) => ({
  products: initialProducts,
  cart: [],
  promoApplied: false,
  order: null,
  invites: initialInvites,
  code: 'MAX-DEMO',
  giveaway: { ...initialGiveaway },

  addToCart: (productId) =>
    set((s) => {
      const existing = s.cart.find((item) => item.productId === productId);
      if (existing) {
        return {
          cart: s.cart.map((item) =>
            item.productId === productId ? { ...item, qty: item.qty + 1 } : item,
          ),
        };
      }
      return { cart: [...s.cart, { productId, qty: 1 }] };
    }),

  removeFromCart: (productId) =>
    set((s) => ({ cart: s.cart.filter((item) => item.productId !== productId) })),

  decrementItem: (productId) =>
    set((s) => ({
      cart: s.cart.flatMap((item) => {
        if (item.productId !== productId) return [item];
        if (item.qty <= 1) return [];
        return [{ ...item, qty: item.qty - 1 }];
      }),
    })),

  clearCart: () => set({ cart: [], promoApplied: false }),

  applyPromo: (code) => {
    if (code.trim().toUpperCase() !== 'START10') return false;
    set({ promoApplied: true });
    return true;
  },

  placeOrder: () =>
    set((s) => {
      if (!s.cart.length) return {};

      const total = s.cart.reduce((sum, item) => {
        const product = s.products.find((p) => p.id === item.productId);
        return sum + (product?.price ?? 0) * item.qty;
      }, 0);

      const discount = s.promoApplied ? Math.round(total * 0.1) : 0;

      return {
        order: {
          number: `MX-${String(Date.now()).slice(-6)}`,
          total: total - discount,
          discount,
        },
        cart: [],
        promoApplied: false,
      };
    }),

  addInvite: (name) =>
    set((s) =>
      s.invites.some((invite) => invite.name === name)
        ? {}
        : {
            invites: [
              ...s.invites,
              {
                id: `i-${Date.now()}`,
                name,
                status: 'pending',
                reward: 150,
              },
            ],
          },
    ),

  setGiveaway: (patch) => set((s) => ({ giveaway: { ...s.giveaway, ...patch } })),

  resetShop: () => set({ cart: [], promoApplied: false, order: null }),
  resetCheckout: () => set({ promoApplied: false, order: null }),
  resetGiveaway: () => set({ giveaway: { ...initialGiveaway } }),
  resetReferral: () => set({ invites: initialInvites }),
}));

export const getCartTotal = (state: SalesState) =>
  state.cart.reduce((sum, item) => {
    const product = state.products.find((p) => p.id === item.productId);
    return sum + (product?.price ?? 0) * item.qty;
  }, 0);

export const getCartCount = (state: SalesState) =>
  state.cart.reduce((sum, item) => sum + item.qty, 0);
