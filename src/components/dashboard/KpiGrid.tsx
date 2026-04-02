"use client";

import { motion, useReducedMotion, useInView } from "framer-motion";
import { useRef } from "react";
import { KpiCard } from "./KpiCard";
import type { KpiData } from "@/types";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

interface KpiGridProps {
  data: KpiData[];
}

export function KpiGrid({ data }: KpiGridProps) {
  const prefersReduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      variants={prefersReduced ? undefined : containerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: "1rem",
      }}
    >
      {data.map((kpi) => (
        <KpiCard key={kpi.id} data={kpi} />
      ))}
    </motion.div>
  );
}
