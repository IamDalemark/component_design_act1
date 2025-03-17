import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import Activity3App from "./Activity3App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Activity3App />
  </StrictMode>
);
