"use client";
import { useEffect, useRef } from "react";

/**
 * Attaches a scroll-linked translateY to a background layer.
 *
 * Usage:
 *   const { sectionRef, bgRef } = useParallax(50);
 *   <section ref={sectionRef}>
 *     <div ref={bgRef} style={{ position:"absolute", inset:0, ... }} />
 *     <div>...content...</div>
 *   </section>
 *
 * @param {number} factor  px of bg travel per viewport height scrolled (default 55)
 */
export function useParallax(factor = 55) {
  const sectionRef = useRef(null);
  const bgRef = useRef(null);

  useEffect(() => {
    let rafId;

    const update = () => {
      if (!sectionRef.current || !bgRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      // progress: +1 when section is 1vh below viewport, -1 when 1vh above
      const progress = rect.top / window.innerHeight;
      // scale(1.12) gives bg extra room so edges never show when it moves
      bgRef.current.style.transform = `scale(1.12) translateY(${progress * factor}px)`;
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    update(); // set initial position without waiting for a scroll event

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, [factor]);

  return { sectionRef, bgRef };
}
