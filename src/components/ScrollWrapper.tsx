"use client";

import { useEffect, useRef } from "react";
import LocomotiveScroll from "locomotive-scroll";

export function ScrollWrapper({ children }: { children: React.ReactNode }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const locomotiveRef = useRef<any>(null);

  useEffect(() => {
    if (!scrollRef.current) return;

    // Initialize locomotive scroll
    locomotiveRef.current = new LocomotiveScroll({
      element: scrollRef.current,
      smooth: true,
      multiplier: 0.7,
      lerp: 0.08,
      smartphone: {
        smooth: true,
      },
      tablet: {
        smooth: true,
      },
    } as any);

    // Handle route changes by updating scroll
    const handleRouteChange = () => {
      if (locomotiveRef.current) {
        locomotiveRef.current.update();
        locomotiveRef.current.scrollTo(0, { duration: 0 });
      }
    };

    window.addEventListener("popstate", handleRouteChange);

    // Expose for debugging
    (window as any).locomotiveScroll = locomotiveRef.current;

    return () => {
      window.removeEventListener("popstate", handleRouteChange);
      if (locomotiveRef.current) {
        locomotiveRef.current.destroy();
      }
    };
  }, []);

  return (
    <div ref={scrollRef} data-scroll-container>
      {children}
    </div>
  );
}
