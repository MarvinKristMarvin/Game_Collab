// import components
import axios from "axios";
import Footer from "../components/Footer/Footer";
import { useLoggedUser } from "../context/userContext";
import { useCallback } from "react";
import { toast } from "react-hot-toast";
import { useInactivityTimer } from "../hooks/useInactivityTimer";

function Home() {
  const { loggedUser, setLoggedUser } = useLoggedUser();
  axios.defaults.withCredentials = true;

  // Inactivity handler
  const handleTimeOut = useCallback(() => {
    // The back already knows that the user is inactive after 10 minutes,
    // Need to remove all user informations from the front and toast the user
    if (loggedUser) {
      toast.error("You will be logged out due to inactivity");
      logOut();
    }
  }, [loggedUser]);

  // Start the inactivity timer
  useInactivityTimer(30 * 60 * 1000, handleTimeOut); // 30 minutes timeout

  const logOut = async () => {
    console.log("log out");
    setLoggedUser(null);
    toast.success("You have been logged out successfully.");
    try {
      const response = await axios.post("http://localhost:5000/logout", {});
      if (response.status === 200) {
        console.log("Logged out successfully.");
      } else {
        console.error("Failed to log out.");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };
  return (
    <div className="homePage">
      <p className="homeMessage">Welcome message</p>
      <Footer />
    </div>
  );
}

export default Home;
