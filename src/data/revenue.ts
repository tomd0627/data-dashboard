import type { RevenueDataPoint } from "@/types";

/**
 * 12 months of SaaS revenue + engagement data (Jan–Dec 2024).
 *
 * Story: MRR grew 181% YoY. Expansion MRR accelerated in Q3 after a
 * product-led growth feature shipped. WAU/MAU stickiness climbed from
 * 22% to 38% over the year.
 */
export const revenueData: RevenueDataPoint[] = [
  { month: "Jan", mrr: 42000,  newMrr: 8400,  expansionMrr: 2100,  mau: 1240, wau: 273  },
  { month: "Feb", mrr: 47200,  newMrr: 9100,  expansionMrr: 2800,  mau: 1380, wau: 310  },
  { month: "Mar", mrr: 52800,  newMrr: 10200, expansionMrr: 3100,  mau: 1510, wau: 347  },
  { month: "Apr", mrr: 58100,  newMrr: 9800,  expansionMrr: 3600,  mau: 1650, wau: 389  },
  { month: "May", mrr: 63400,  newMrr: 10500, expansionMrr: 4200,  mau: 1790, wau: 430  },
  { month: "Jun", mrr: 69200,  newMrr: 11200, expansionMrr: 4800,  mau: 1940, wau: 481  },
  { month: "Jul", mrr: 76500,  newMrr: 12800, expansionMrr: 5900,  mau: 2120, wau: 551  },
  { month: "Aug", mrr: 84100,  newMrr: 13500, expansionMrr: 7200,  mau: 2290, wau: 618  },
  { month: "Sep", mrr: 91800,  newMrr: 14200, expansionMrr: 8600,  mau: 2460, wau: 694  },
  { month: "Oct", mrr: 101200, newMrr: 14800, expansionMrr: 9100,  mau: 2600, wau: 780  },
  { month: "Nov", mrr: 109600, newMrr: 15100, expansionMrr: 9800,  mau: 2720, wau: 870  },
  { month: "Dec", mrr: 118400, newMrr: 15600, expansionMrr: 10400, mau: 2847, wau: 1082 },
];
