import type { RetentionCohort } from "@/types";

/**
 * 8-week cohort retention for May–Dec 2024.
 *
 * Story: A product fix shipped before the Sep cohort dramatically
 * improved Week 4+ retention — visible as a step-change in the
 * heatmap from cohort 5 onward.
 *
 * Rows = cohort month, Columns = weeks 1–8 (retention %)
 */
export const retentionData: RetentionCohort[] = [
  { label: "May '24", weeks: [100, 68, 52, 41, 34, 28, 24, 21] },
  { label: "Jun '24", weeks: [100, 71, 55, 44, 37, 31, 27, 23] },
  { label: "Jul '24", weeks: [100, 74, 58, 47, 40, 34, 29, 25] },
  { label: "Aug '24", weeks: [100, 76, 61, 50, 43, 37, 32, 28] },
  { label: "Sep '24", weeks: [100, 81, 67, 58, 51, 45, 40, 36] },
  { label: "Oct '24", weeks: [100, 84, 71, 62, 55, 49, 44, 40] },
  { label: "Nov '24", weeks: [100, 87, 74, 65, 58, 52, 47, 43] },
  { label: "Dec '24", weeks: [100, 89, 77, 68, 61, 55, 50, 46] },
];
