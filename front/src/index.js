import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import Root from "./routes/root";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext"
// import App from "./App";

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <React.StrictMode>
//     {/* <App /> */}
//   </React.StrictMode>
// );

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  // <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
      <Root />
      {/* <Karuta /> */}
      </AuthProvider>
    </BrowserRouter>
  // </React.StrictMode>
);
