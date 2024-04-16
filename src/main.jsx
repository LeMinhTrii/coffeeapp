import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./assets/scss/style.scss";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./components/Context/AuthContext.jsx";
import { UploadContextProvider } from "./components/Context/UploadContext.jsx";
import { StatusContextProvider } from "./components/Context/StatusContext.jsx";
import { CartContextProvider } from "./components/Context/CartContext.jsx";
import { PaginateProvider } from "./components/Context/PaginateContext.jsx";
import { WishtListProvider } from "./components/Context/WhistlistContext.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <BrowserRouter>
    <AuthProvider>
      <CartContextProvider>
        <UploadContextProvider>
          <StatusContextProvider>
            <PaginateProvider>
              <WishtListProvider>
                <App />
              </WishtListProvider>
            </PaginateProvider>
          </StatusContextProvider>
        </UploadContextProvider>
      </CartContextProvider>
    </AuthProvider>
  </BrowserRouter>
  // </React.StrictMode>
);

// lorem
