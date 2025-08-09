import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import { AppStateProvider } from "./context/AppStateContext.tsx";
import "./index.css";
import App from "./App.tsx";

const basename = import.meta.env.VITE_ROUTER_BASENAME || "/";

const router = createBrowserRouter(
  [
    {
      path: "*",
      Component: App,
    },
  ],
  { basename: basename },
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppStateProvider>
      <RouterProvider router={router} />
    </AppStateProvider>
  </StrictMode>,
);
