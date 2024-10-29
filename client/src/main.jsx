import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import TaskManagerProvider from "./context/index.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <TaskManagerProvider>
      <App />
      <Toaster position="bottom-right" reverseOrder={false} />
    </TaskManagerProvider>
  </BrowserRouter>
);
