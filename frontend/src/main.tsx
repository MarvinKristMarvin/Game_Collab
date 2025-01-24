import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.scss";
import App from "./App.tsx";
import { HashRouter as BrowserRouter } from "react-router-dom";
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
