import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { HashRouter as Router } from "react-router-dom";

import "./assets/css/app.css";
import { ContentProvider } from "./app/providers/ContentProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ContentProvider>
      <Router>
        <App />
      </Router>
    </ContentProvider>
  </React.StrictMode>
);
