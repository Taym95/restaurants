/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect } from "react";

export const useResize = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const onResize = () => {
    setIsSmallScreen(window.innerWidth <= 1200);
  };

  useEffect(() => {
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return isSmallScreen;
};
