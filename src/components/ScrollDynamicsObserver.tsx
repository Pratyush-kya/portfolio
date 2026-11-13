"use client";

import { useEffect, useRef } from "react";

/**
 * ScrollDynamicsObserver
 * Silent, headless physics provider that updates GPU CSS transform variables
 * (--scroll-dyn-x, --scroll-dyn-y) based on scroll velocity and direction.
 * Renders ZERO visible UI, zero floating HUDs, and zero annotations.
 */
export function ScrollDynamicsObserver() {
  const lastScrollY = useRef(0);
  const lastTime = useRef(0);
  const idleTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    lastScrollY.current = window.scrollY;
    lastTime.current = performance.now();

    const root = document.documentElement;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const currentTime = performance.now();
      const dt = Math.max(currentTime - lastTime.current, 16);
      const dy = currentScrollY - lastScrollY.current;

      const instantVelocity = Math.min(Math.abs(dy) / (dt * 2.5), 1);
      const direction = dy < -2 ? -1 : dy > 2 ? 1 : 0;

      // Subtle hardware-accelerated shift: -3px to +3px
      const shiftX = (direction * instantVelocity * 3).toFixed(2);
      const shiftY = (direction * instantVelocity * 2.5).toFixed(2);

      root.style.setProperty("--scroll-dyn-x", `${shiftX}px`);
      root.style.setProperty("--scroll-dyn-y", `${shiftY}px`);

      lastScrollY.current = currentScrollY;
      lastTime.current = currentTime;

      // Clear existing timeout and settle back to 0px after scrolling stops
      if (idleTimeout.current) clearTimeout(idleTimeout.current);
      idleTimeout.current = setTimeout(() => {
        root.style.setProperty("--scroll-dyn-x", "0px");
        root.style.setProperty("--scroll-dyn-y", "0px");
      }, 120);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (idleTimeout.current) clearTimeout(idleTimeout.current);
      root.style.setProperty("--scroll-dyn-x", "0px");
      root.style.setProperty("--scroll-dyn-y", "0px");
    };
  }, []);

  return null;
}
