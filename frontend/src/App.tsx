import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Search from "./pages/Search";
import Header from "./components/Header/Header";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div>
      <Header />
      <Toaster position="bottom-right" toastOptions={{ duration: 4000 }} />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/search" element={<Search />}></Route>
      </Routes>
    </div>
  );
}

export default App;
