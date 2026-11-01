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

export interface Service {
  id: string;
  title: string;
  duration: number;
  price: number;
}

export interface Master {
  id: string;
  name: string;
  role: string;
  services: string[];
  slots: string[];
}

export type MessageFrom = 'bot' | 'user';

export interface ChatMessage {
  id: string;
  from: MessageFrom;
  text: string;
}

interface ServiceState {
  requests: ServiceRequest[];
  services: Service[];
  masters: Master[];
  booking: {
    serviceId: string | null;
    masterId: string | null;
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
  selectService: (serviceId: string) => void;
  selectMaster: (masterId: string) => void;
  selectSlot: (slot: string) => void;
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

const services: Service[] = [
  { id: 's1', title: 'Стрижка', duration: 60, price: 2500 },
  { id: 's2', title: 'Окрашивание', duration: 120, price: 6900 },
  { id: 's3', title: 'Маникюр', duration: 60, price: 2200 },
  { id: 's4', title: 'Педикюр', duration: 90, price: 3100 },
  { id: 's5', title: 'Консультация', duration: 30, price: 0 },
  { id: 's6', title: 'Диагностика', duration: 45, price: 1500 },
  { id: 's7', title: 'Массаж', duration: 60, price: 3500 },
  { id: 's8', title: 'Брови', duration: 40, price: 1800 },
];

const masters: Master[] = [
  {
    id: 'm1',
    name: 'Анна',
    role: 'стилист',
    services: ['s1', 's2', 's8'],
    slots: ['10:00', '12:30', '15:00', '18:30'],
  },
  {
    id: 'm2',
    name: 'Игорь',
    role: 'барбер',
    services: ['s1', 's8'],
    slots: ['11:00', '13:00', '16:00', '19:00'],
  },
  {
    id: 'm3',
    name: 'Марина',
    role: 'мастер маникюра',
    services: ['s3', 's4'],
    slots: ['10:30', '12:00', '14:30', '17:00'],
  },
  {
    id: 'm4',
    name: 'Ольга',
    role: 'косметолог',
    services: ['s5', 's6', 's7'],
    slots: ['09:30', '11:30', '15:30', '18:00'],
  },
  {
    id: 'm5',
    name: 'Дмитрий',
    role: 'массажист',
    services: ['s7'],
    slots: ['10:00', '13:30', '17:30', '20:00'],
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
  serviceId: null,
  masterId: null,
  slot: null,
  confirmed: false,
};

export const useServiceStore = create<ServiceState>((set) => ({
  requests: initialRequests,
  services,
  masters,
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

  selectService: (serviceId) =>
    set((state) => {
      const master = state.masters.find((item) => item.id === state.booking.masterId);
      const masterFits = Boolean(master?.services.includes(serviceId));

      return {
        booking: {
          serviceId,
          masterId: masterFits ? state.booking.masterId : null,
          slot: masterFits ? state.booking.slot : null,
          confirmed: false,
        },
      };
    }),

  selectMaster: (masterId) =>
    set((state) => {
      const master = state.masters.find((item) => item.id === masterId);
      const slotFits = Boolean(master?.slots.includes(state.booking.slot ?? ''));

      return {
        booking: {
          ...state.booking,
          masterId,
          slot: slotFits ? state.booking.slot : null,
          confirmed: false,
        },
      };
    }),

  selectSlot: (slot) =>
    set((state) => ({ booking: { ...state.booking, slot, confirmed: false } })),

  confirmBooking: () =>
    set((state) => ({ booking: { ...state.booking, confirmed: true } })),

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
