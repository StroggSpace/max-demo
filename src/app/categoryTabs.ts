import type { ComponentType } from 'react';

import { SeasonTab } from '@/pages/category/SeasonTab';
import { TasksTab } from '@/pages/category/TasksTab';
import { AchievementsTab } from '@/pages/category/AchievementsTab';
import { ProfileTab } from '@/pages/category/ProfileTab';
import { ShopTab } from '@/pages/category/sales/ShopTab';
import { CartTab } from '@/pages/category/sales/CartTab';
import { GiveawayTab } from '@/pages/category/sales/GiveawayTab';
import { ReferralTab } from '@/pages/category/sales/ReferralTab';
import { RequestsTab } from '@/pages/category/service/RequestsTab';
import { BookingTab } from '@/pages/category/service/BookingTab';
import { BotTab } from '@/pages/category/service/BotTab';
import { CardTab } from '@/pages/category/service/CardTab';

/**
 * Реестр вкладок категорий. Новая категория подключается одной записью.
 */
export const categoryTabs: Record<string, Record<string, ComponentType>> = {
  retention: {
    season: SeasonTab,
    tasks: TasksTab,
    achievements: AchievementsTab,
    profile: ProfileTab,
  },
  sales: {
    shop: ShopTab,
    cart: CartTab,
    giveaway: GiveawayTab,
    referral: ReferralTab,
  },
  service: {
    requests: RequestsTab,
    booking: BookingTab,
    bot: BotTab,
    card: CardTab,
  },
};
