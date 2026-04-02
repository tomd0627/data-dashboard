import type { PlanDataPoint } from "@/types";

/**
 * Plan distribution as of December 2024.
 *
 * Story: Enterprise is only 9% of customers but drives ~39% of MRR —
 * a strong signal of product-market fit with high-value accounts.
 *
 * MRR cross-check (approximate):
 *   Growth:     882 × $25  = $22,050
 *   Pro:        626 × $79  = $49,454
 *   Enterprise: 258 × $179 = $46,182
 *   Total:                  ≈ $117,686 (rounds to $118,400 with upsells)
 */
export const plansData: PlanDataPoint[] = [
  { id: "free",       name: "Free",       customers: 1081, mrr: 0,      pricePerMonth: 0   },
  { id: "growth",     name: "Growth",     customers: 882,  mrr: 22050,  pricePerMonth: 25  },
  { id: "pro",        name: "Pro",        customers: 626,  mrr: 49454,  pricePerMonth: 79  },
  { id: "enterprise", name: "Enterprise", customers: 258,  mrr: 46182,  pricePerMonth: 179 },
];

export const totalArn = plansData.reduce((sum, p) => sum + p.mrr * 12, 0);
