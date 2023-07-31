import React from "react";
import App from "./App";
import { createRoot } from "react-dom/client";
import { TaskProvider } from "./context/TaskContext";

const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <TaskProvider>
      <App />
    </TaskProvider>
  </React.StrictMode>
);
