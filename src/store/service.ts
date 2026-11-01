import { create } from 'zustand';

export type RequestStatus = 'new' | 'progress' | 'done';

export interface ServiceRequest {
  id: string;
  title: string;
  number: string;
  status: RequestStatus;
  date: string;
  document?: string;
}

export type MessageFrom = 'bot' | 'user';

export interface ChatMessage {
  id: string;
  from: MessageFrom;
  text: string;
}

interface ServiceState {
  requests: ServiceRequest[];
  services: string[];
  specialists: string[];
  slots: string[];
  booking: {
    service: string | null;
    specialist: string | null;
    slot: string | null;
    confirmed: boolean;
  };
  messages: ChatMessage[];
  quickReplies: string[];
  typing: boolean;
  card: {
    number: string;
    balance: number;
    expires: string;
    token: string;
  };

  setRequestStatus: (id: string, status: RequestStatus) => void;
  addDocument: (id: string, document: string) => void;
  selectBooking: (patch: Partial<ServiceState['booking']>) => void;
  confirmBooking: () => void;
  resetBooking: () => void;
  pushMessage: (from: MessageFrom, text: string) => void;
  setTyping: (typing: boolean) => void;
  resetBot: () => void;
  refreshToken: () => void;
  resetRequests: () => void;
  resetCard: () => void;
}

const initialRequests: ServiceRequest[] = [
  {
    id: 'r1',
    title: 'Замена карты лояльности',
    number: '№4821',
    status: 'new',
    date: 'сегодня',
  },
  {
    id: 'r2',
    title: 'Справка о покупках',
    number: '№4790',
    status: 'done',
    date: '8 апреля',
    document: 'Справка.pdf',
  },
];

const initialMessages: ChatMessage[] = [
  {
    id: 'm1',
    from: 'bot',
    text: 'Здравствуйте! Я бот бренда. Помогу со статусом заявки или записью.',
  },
];

const initialCard = {
  number: '•••• 4821',
  balance: 1240,
  expires: '12/27',
  token: 'MAX-CARD-4821-0001',
};

const initialBooking: ServiceState['booking'] = {
  service: null,
  specialist: null,
  slot: null,
  confirmed: false,
};

export const useServiceStore = create<ServiceState>((set) => ({
  requests: initialRequests,
  services: ['Консультация', 'Стрижка', 'Диагностика'],
  specialists: ['Анна', 'Игорь', 'Марина'],
  slots: ['10:00', '12:30', '15:00', '18:30'],
  booking: { ...initialBooking },
  messages: initialMessages,
  quickReplies: ['Статус заявки', 'Записаться', 'Позвать оператора'],
  typing: false,
  card: { ...initialCard },

  setRequestStatus: (id, status) =>
    set((state) => ({
      requests: state.requests.map((request) =>
        request.id === id ? { ...request, status } : request,
      ),
    })),

  addDocument: (id, document) =>
    set((state) => ({
      requests: state.requests.map((request) =>
        request.id === id ? { ...request, document } : request,
      ),
    })),

  selectBooking: (patch) =>
    set((state) => ({ booking: { ...state.booking, ...patch } })),

  confirmBooking: () =>
    set((state) => ({
      booking: { ...state.booking, confirmed: true },
    })),

  resetBooking: () => set({ booking: { ...initialBooking } }),

  pushMessage: (from, text) =>
    set((state) => ({
      messages: [
        ...state.messages,
        {
          id: `m-${Date.now()}-${Math.round(Math.random() * 1000)}`,
          from,
          text,
        },
      ],
    })),

  setTyping: (typing) => set({ typing }),

  resetBot: () => set({ messages: initialMessages, typing: false }),

  refreshToken: () =>
    set((state) => ({
      card: {
        ...state.card,
        token: `MAX-CARD-4821-${String(Date.now()).slice(-4)}`,
      },
    })),

  resetRequests: () => set({ requests: initialRequests.map((r) => ({ ...r })) }),

  resetCard: () => set({ card: { ...initialCard } }),
}));
