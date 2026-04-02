import type { ChannelDataPoint } from "@/types";

/**
 * New customer acquisitions by channel across Q2–Q4 2024.
 *
 * Story: SEO overtook SEM in Q3 after a content investment began
 * paying dividends. Email remained the highest conversion channel.
 * Direct and Social grew steadily.
 */
export const channelsData: ChannelDataPoint[] = [
  { channel: "SEO",    q2: 142, q3: 231, q4: 298 },
  { channel: "SEM",    q2: 198, q3: 187, q4: 162 },
  { channel: "Email",  q2: 94,  q3: 118, q4: 143 },
  { channel: "Social", q2: 87,  q3: 102, q4: 94  },
  { channel: "Direct", q2: 63,  q3: 71,  q4: 82  },
];
