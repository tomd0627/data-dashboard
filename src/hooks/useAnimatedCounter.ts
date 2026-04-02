"use client";

import { useEffect, useRef, useState } from "react";

function easeOutExpo(t: number): number {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

export function useAnimatedCounter(
  target: number,
  duration = 1200,
  active = true
): number {
  const [current, setCurrent] = useState(0);
  const startTime = useRef<number | null>(null);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    if (!active) {
      setCurrent(target);
      return;
    }

    startTime.current = null;

    function step(timestamp: number) {
      if (!startTime.current) startTime.current = timestamp;
      const elapsed = timestamp - startTime.current;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutExpo(progress);
      setCurrent(eased * target);

      if (progress < 1) {
        rafId.current = requestAnimationFrame(step);
      } else {
        setCurrent(target);
      }
    }

    rafId.current = requestAnimationFrame(step);

    return () => {
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
    };
  }, [target, duration, active]);

  return current;
}
