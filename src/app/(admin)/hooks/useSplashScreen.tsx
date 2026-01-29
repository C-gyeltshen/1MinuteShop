import { useState, useEffect } from "react";
import { SplashMessage } from "../types";

export const useSplashScreen = (messages: SplashMessage[]) => {
  const [splashIndex, setSplashIndex] = useState(0);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    if (splashIndex < messages.length - 1) {
      const timer = setTimeout(() => setSplashIndex(splashIndex + 1), 1200);
      return () => clearTimeout(timer);
    } else {
      const finalTimer = setTimeout(() => setShowSplash(false), 2500);
      return () => clearTimeout(finalTimer);
    }
  }, [splashIndex, messages.length]);

  return {
    showSplash,
    currentMessage: messages[splashIndex],
    isLastMessage: splashIndex === messages.length - 1,
  };
};