import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import FlightSearchRoutes from "./routes/FlightSearchRoutes";
import { Home } from "./pages";

function App() {
  return (
    <>
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/*" element={<FlightSearchRoutes />} />
      </Routes>
    </>
  );
}

export default App;
