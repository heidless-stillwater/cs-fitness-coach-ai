
"use client";

import { useState, useEffect } from "react";

export const useBreakpoint = (breakpoint: number) => {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleResize = () => {
      if (window.innerWidth >= breakpoint) {
        setIsDesktop(true);
      } else {
        setIsDesktop(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [breakpoint]);

  return isDesktop;
};
