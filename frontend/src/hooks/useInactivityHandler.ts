import { useCallback, useEffect, useRef } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useLoggedUser } from "../context/userContext";

// Handle inactivity
const useInactivityHandler = () => {
  const { loggedUser, setLoggedUser } = useLoggedUser();

  // A ref to store the timeout ID for the inactivity timer
  // `useRef` ensures that the timer ID persists across re-renders without causing re-renders itself
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // UseCallback memoizes the logout function to prevent unnecessary re-renders
  const logOut = useCallback(async () => {
    // Disconnect in the front, even if there is an error in the back
    setLoggedUser(null);
    toast.success("You have been logged out successfully.");
    try {
      await axios.post("http://localhost:5000/logout", {});
    } catch (error) {
      console.error("Error during logout:", error);
    }
  }, [setLoggedUser]);

  // Resets the inactivity timer, clears the current timeout if exists and sets a new timeout that will call `onTimeout` after the specified duration
  const resetTimer = useCallback(() => {
    if (timeoutRef.current) {
      // Js function to clear the existing timer to prevent multiple overlapping timeouts
      clearTimeout(timeoutRef.current);
    }
    // Start a new timer with the specified timeout duration, here 30 minutes, corresponding to backend inactivity timeout
    timeoutRef.current = setTimeout(() => {
      handleTimeOut();
    }, 30 * 60 * 1000);
  }, []);

  // Handle inactivity timeout
  const handleTimeOut = useCallback(() => {
    // The back already knows that the user is inactive after 30 minutes
    // Need to remove all user informations from the front and tell the user
    toast.error("You will be logged out due to inactivity");
    logOut();
  }, [logOut]);

  useEffect(() => {
    // If there is no loggedUser, don't start the inactivity handling
    if (!loggedUser) {
      return;
    }

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
      // Remove event listeners to prevent consuming memory
      events.forEach((event) =>
        window.removeEventListener(event, handleActivity)
      );
      // Clear the timeout to avoid unwanted onTimeout calls after the component unmounts
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [loggedUser, resetTimer]);

  return { logOut };
};

export default useInactivityHandler;
