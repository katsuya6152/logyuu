"use client";

import { useCallback, useEffect, useState } from "react";

export function useScrollVisibility(threshold = 10) {
  const [isVisible, setIsVisible] = useState(true);

  const handleScroll = useCallback(() => {
    setIsVisible(window.scrollY <= threshold);
  }, [threshold]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return isVisible;
}
