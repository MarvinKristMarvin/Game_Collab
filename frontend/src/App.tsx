import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Search from "./pages/Search";
import Header from "./components/Header/Header";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { useLoggedUser } from "./context/userContext";

function App() {
  const { loggedUser, setLoggedUser } = useLoggedUser();
  // Persists logged user in local storage to avoid disconnections on page refresh
  useEffect(() => {
    const storedLoggedUser = localStorage.getItem("loggedUser");
    if (storedLoggedUser) {
      setLoggedUser(JSON.parse(storedLoggedUser));
    }
  }, [setLoggedUser]);
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
      <Toaster position="bottom-center" toastOptions={{ duration: 4000 }} />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/search" element={<Search />}></Route>
      </Routes>
    </div>
  );
}

export default App;
