import {
  currencyValues,
  FlightResultStates,
  FlightSearchRequest,
} from "../types";
import { responseBlank } from "./blankValues";

export const baseFlight_path: string = "/flights";

export const btnTextsArr: string[] = ["Recommended", "Cheapest", "Fastest"];

export const currencyItems: currencyValues[] = ["USD", "MXN", "EUR"];

export const currencySymbols = {
  USD: "$",
  MXN: "$",
  EUR: "€",
};

export const flightResultsStates: FlightResultStates = {
  renderInfo: responseBlank,
  default: responseBlank,
  cheapest: responseBlank,
  fastest: responseBlank,
};

export const flightResults_path =
  "search/from/:sourceLocation/to/:destinationLocation";
export const completeFlightResults_path = `${baseFlight_path}/${flightResults_path}`;

export const flightDetails_path =
  "details/from/:sourceLocation/to/:destinationLocation/:id";
export const completeFlightDetails_path = `${baseFlight_path}/${flightDetails_path}`;

export const blankRequest: FlightSearchRequest = {
  adults: 0,
  currencyCode: "USD",
  departureDate: "1990-01-01",
  destinationLocationCode: "000",
  nonStop: true,
  originLocationCode: "000",
  returnDate: "1990-01-01",
  order: "",
};
