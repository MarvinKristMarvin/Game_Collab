import { useEffect, useRef, useCallback } from "react";

export const useInactivityTimer = (timeout: number, onTimeout: () => void) => {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const resetTimer = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(onTimeout, timeout);
  }, [onTimeout, timeout]);

  useEffect(() => {
    const events = ["mousemove", "keydown", "click"];
    const handleActivity = () => resetTimer();

    events.forEach((event) => window.addEventListener(event, handleActivity));

    resetTimer(); // Start the timer on mount

    return () => {
      events.forEach((event) =>
        window.removeEventListener(event, handleActivity)
      );
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [resetTimer]);

  return null;
};
