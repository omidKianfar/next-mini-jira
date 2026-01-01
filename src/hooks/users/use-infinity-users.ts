"use client";

import { useState, useRef, useCallback, useMemo } from "react";

// type
import { MyUserType } from "@/src/types/global";

export const useInfiniteUsers = (users: MyUserType[], batchSize = 10) => {
  // states
  const [cursor, setCursor] = useState(batchSize);

  const safeCursor = Math.min(cursor, users.length);

  const effectiveCursor = users.length === 0 ? 0 : safeCursor;

  // functions
  const visibleUsers = useMemo(() => {
    return users.slice(0, effectiveCursor);
  }, [users, effectiveCursor]);

  const hasMore = effectiveCursor < users.length;

  const observerRef = useRef<IntersectionObserver | null>(null);

  const loadMore = useCallback(() => {
    if (!hasMore) return;

    setCursor((prev) => Math.min(prev + batchSize, users.length));
  }, [batchSize, users.length, hasMore]);

  const loaderRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (!node) return;

      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            loadMore();
          }
        },
        { threshold: 1 },
      );

      observerRef.current.observe(node);
    },
    [loadMore],
  );

  return { visibleUsers, loaderRef, hasMore };
};
