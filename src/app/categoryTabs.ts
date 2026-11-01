import type { ComponentType } from 'react';

import { SeasonTab } from '@/pages/category/SeasonTab';
import { TasksTab } from '@/pages/category/TasksTab';
import { AchievementsTab } from '@/pages/category/AchievementsTab';
import { ProfileTab } from '@/pages/category/ProfileTab';
import { ShopTab } from '@/pages/category/sales/ShopTab';
import { CartTab } from '@/pages/category/sales/CartTab';
import { GiveawayTab } from '@/pages/category/sales/GiveawayTab';
import { ReferralTab } from '@/pages/category/sales/ReferralTab';

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
};
