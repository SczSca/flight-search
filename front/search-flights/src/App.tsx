import { Route, Routes } from "react-router-dom";
import FlightSearchRoutes from "./routes/FlightSearchRoutes";

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
