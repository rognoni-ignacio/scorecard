import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AppStateProvider } from "./context/AppStateContext.tsx";
import "./index.css";
import App from "./App.tsx";

const basename = import.meta.env.VITE_ROUTER_BASENAME || "/";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter basename={basename}>
      <AppStateProvider>
        <App />
      </AppStateProvider>
    </BrowserRouter>
  </StrictMode>,
);
