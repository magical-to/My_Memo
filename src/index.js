import React from "react";
import ReactDOM from "react-dom";
import ErrorFilter from "./components/ErrorFilter";
import reportWebVitals from "./reportWebVitals";
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <ErrorFilter />
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
