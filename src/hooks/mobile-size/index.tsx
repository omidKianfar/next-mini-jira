"use client";

import { useEffect, useState } from "react";

export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const check = () =>
      setIsMobile(window.matchMedia("(max-width: 1024px)").matches);

    check();

    const mql = window.matchMedia("(max-width: 1024px)");
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);

    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  return isMobile;
};
