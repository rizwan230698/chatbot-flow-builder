import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import FlowBuilderProvider from "./context/FlowBuilderContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <FlowBuilderProvider>
      <App />
    </FlowBuilderProvider>
  </StrictMode>
);
