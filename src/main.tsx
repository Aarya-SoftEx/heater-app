import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

// ---- Global Styles ----
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./index.css";

// ---- JS Libraries ----
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import { Provider } from "react-redux";
import store from "./state/store.ts";
import { ToastContainer } from "react-toastify";


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={true}
        pauseOnHover
      />
      <App />
    </Provider>
  </StrictMode>
);
