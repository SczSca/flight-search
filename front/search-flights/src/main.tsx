import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { SearchFlightProvider } from "./context/SearchFlightContext.tsx";
import { APIConsumerProvider } from "./context/APIConsumerContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <APIConsumerProvider>
          <SearchFlightProvider>
            <App />
          </SearchFlightProvider>
        </APIConsumerProvider>
      </LocalizationProvider>
    </BrowserRouter>
  </StrictMode>
);
