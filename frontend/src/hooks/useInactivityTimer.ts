import { useEffect, useRef, useCallback } from "react";

// Takes a timeout duration and a callback function as arguments, inactivity is determined byt eh absence of mouse movements, clicks and key presses
export const useInactivityTimer = (timeout: number, onTimeout: () => void) => {
  // UuseRef ensures that the timeOut ID persists across re-renders without causing re-renders itself
  // SetTimout is a js function which execute a function after a delay
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Resets the inactivity timer, clears the current timeout if exists and sets a new timeout that will call `onTimeout` after the specified duration
  const resetTimer = useCallback(() => {
    if (timeoutRef.current) {
      // Js function to clear the existing timer to prevent multiple overlapping timeouts
      clearTimeout(timeoutRef.current);
    }
    // Start a new timer with the specified timeout duration.
    timeoutRef.current = setTimeout(onTimeout, timeout);
  }, [onTimeout, timeout]);

  useEffect(() => {
    // List of user interaction events to monitor for activity
    const events = ["mousemove", "keydown", "click"];

    // Resets the timer whenever user activity is detected
    const handleActivity = () => resetTimer();

    // Attach event listeners to the window for each specified events (mousemove, keydown, click), call handleActivity when events occur
    events.forEach((event) => window.addEventListener(event, handleActivity));

    // Initialize the timer when the hook is mounted
    resetTimer();

    // Cleanup function to remove event listeners and clear the timer when the component unmounts
    return () => {
      // Remove event listeners to prevent consumming memory
      events.forEach((event) =>
        window.removeEventListener(event, handleActivity)
      );
      // Clear the timeout to avoid unwanted onTimeout calls after the component unmounts
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [resetTimer]);

  return null;
};
