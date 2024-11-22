import React from "react";
import { Routes, Route } from "react-router-dom";
import { FlightDetails, FlightPages, Home } from "../pages";
import { HeaderResults } from "../pages/layout/HeaderResults";
import {
  baseFlight_path,
  flightDetails_path,
  flightResults_path,
} from "../utils";

const FlightSearchRoutes = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path={baseFlight_path} element={<HeaderResults />}>
        <Route path={flightResults_path} element={<FlightPages />} />
        <Route path={flightDetails_path} element={<FlightDetails />} />
      </Route>
    </Routes>
  );
};

export default FlightSearchRoutes;
