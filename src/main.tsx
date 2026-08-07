import React from "react";
import ReactDOM from "react-dom/client";
import "@fontsource-variable/outfit";
import "@fontsource/jetbrains-mono/400.css";
import "./styles.css";
import App from "./App";

console.log(
  "%cVarish Valleti%c\nBackend Engineer · Insurance Platforms\nvarishvalleti52@gmail.com · github.com/valletivarish\n\nReading the internals? Press Cmd/Ctrl+K on the page.",
  "color:#CDE64B;font-size:16px;font-weight:700;",
  "color:#9C9C97;font-size:12px;"
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
