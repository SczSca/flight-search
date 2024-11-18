import React from "react";
import { Routes, Route } from "react-router-dom";
import { FlightDetails, FlightOffers, Home } from "../pages";

const FlightSearchRoutes = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route
        path="search/from/:sourceLocation/to/:destinationLocation"
        element={<FlightOffers />}
      />
      <Route
        path="details/from/:sourceLocation/to/:destinationLocation"
        element={<FlightDetails />}
      />
    </Routes>
  );
};

export default FlightSearchRoutes;
