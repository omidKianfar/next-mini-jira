"use client";

import { useEffect, useState } from "../imports";

export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(max-width: 1024px)").matches;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mql = window.matchMedia("(max-width: 768px)");
    const change = (e: MediaQueryListEvent) => setIsMobile(e.matches);

    mql.addEventListener("change", change);

    return () => mql.removeEventListener("change", change);
  }, []);

  return isMobile;
};
