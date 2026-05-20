"use client";

import { createContext, useContext } from "react";

const ScrollContext = createContext<null>(null);

export const useScrollContext = () => useContext(ScrollContext);

export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
