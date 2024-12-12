import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { LoggedUserProvider } from "./context/userContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <LoggedUserProvider>
        <App />
      </LoggedUserProvider>
    </BrowserRouter>
  </StrictMode>
);
