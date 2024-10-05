import { App } from "./App.tsx";
import { createRoot } from "react-dom/client";
import { PrimeReactProvider } from "primereact/api";
import { StrictMode } from "react";

import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PrimeReactProvider>
      <App />
    </PrimeReactProvider>
  </StrictMode>,
);
