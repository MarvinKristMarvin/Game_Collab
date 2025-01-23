import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Search from "./pages/Search";
import Header from "./components/Header/Header";
import Privacypolicy from "./pages/Privacypolicy";
import Contact from "./pages/Contact";
import Page404 from "./pages/404";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { useLoggedUser } from "./context/userContext";
import Footer from "./components/Footer/Footer";

function App() {
  const { loggedUser, setLoggedUser } = useLoggedUser();

  // Persists logged user in local storage to avoid disconnections on page refresh
  useEffect(() => {
    const storedLoggedUser = localStorage.getItem("loggedUser");
    // If there is a stored logged user, update the loggedUser context
    if (storedLoggedUser) {
      setLoggedUser(JSON.parse(storedLoggedUser));
    }
  }, [setLoggedUser]);

  // Update local storage when loggedUser changes
  useEffect(() => {
    if (loggedUser) {
      localStorage.setItem("loggedUser", JSON.stringify(loggedUser));
    } else {
      localStorage.removeItem("loggedUser");
    }
  }, [loggedUser]);

  return (
    <div>
      <Header />
      <Toaster
        position="bottom-center"
        toastOptions={{
          duration: 5000,
          style: { fontSize: "1.125rem", paddingLeft: "1rem" },
          success: {
            ariaProps: {
              role: "status",
              "aria-live": "polite",
            },
          },
          error: {
            ariaProps: {
              role: "alert",
              "aria-live": "assertive",
            },
          },
        }}
      />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/search" element={<Search />}></Route>
        <Route path="/privacypolicy" element={<Privacypolicy />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="*" element={<Page404 />}></Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
