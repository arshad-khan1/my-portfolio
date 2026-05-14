"use client";

import { useEffect, useRef, createContext, useContext } from "react";
import LocomotiveScroll from "locomotive-scroll";
import "locomotive-scroll/dist/locomotive-scroll.css";

const ScrollContext = createContext<LocomotiveScroll | null>(null);

export const useScrollContext = () => useContext(ScrollContext);

export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const locomotiveScrollRef = useRef<LocomotiveScroll | null>(null);

  useEffect(() => {
    if (!scrollRef.current) return;

    const scroll = new LocomotiveScroll({
      element: scrollRef.current,
      smooth: true,
      multiplier: 0.8,
      lerp: 0.08,
      smartphone: {
        smooth: true,
      },
      tablet: {
        smooth: true,
      },
    } as any);

    locomotiveScrollRef.current = scroll;

    return () => {
      scroll.destroy();
    };
  }, []);

  return (
    <ScrollContext.Provider value={locomotiveScrollRef.current}>
      <div ref={scrollRef} data-scroll-container>
        {children}
      </div>
    </ScrollContext.Provider>
  );
}
