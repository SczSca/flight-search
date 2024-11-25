export interface Amenities {
  description: string;
  isChargeable: boolean;
}

export interface Aircraft {
  code: string;
  name: string;
}

export interface ComponentWithChildren {
  children: React.ReactNode;
}

export interface Dictionaries {
  locations: Record<string, Location>;
  // aircraft: Record<string, string>;
  // carriers: Record<string, string>;
}

export interface FareDetailsBySegment {
  segmentId: string;
  cabin: string;
  class: string;
  includedCheckedBags: IncludedCheckedBags;
  amenities: Amenities[] | null;
}

export interface Fees {
  amount: string;
  type: string;
}

export interface FOPrice extends TPPrice {
  fees: Fees[];
  grandTotal: string;
}

export interface FlightCardData {
  id: string;
  // price: { total: string };
  price: FOPrice;
  travelerPricings: TravelerPricings[];
  itineraries: {
    duration: string;
    segments: Segments[];
  }[];
}

export interface FlightLocation {
  iataCode: string;
  terminal: string | null;
  at: string;
}

export interface FlightOffers {
  id: string;
  oneWay: boolean;
  numberOfBookableSeats: number;
  itineraries: Itineraries[];
  price: FOPrice;
  travelerPricings: TravelerPricings[];
}

export interface FlightOffersResponse {
  type: string;
  dictionaries: Dictionaries;
  data: FlightOffers[];
}

export interface FlightResultStates {
  renderInfo: FlightOffersResponse;
  default: FlightOffersResponse;
  cheapest: FlightOffersResponse;
  fastest: FlightOffersResponse;
}

export interface FlightSearchRequest {
  originLocationCode: string;
  destinationLocationCode: string;
  departureDate: string;
  returnDate: string;
  adults: number;
  nonStop: boolean;
  currencyCode: string;
  order: string;
}

export interface IATAResponse {
  data: IATAItem[];
}

export interface IATAItem {
  name: string;
  iataCode: string;
  detailedName: string;
}

export interface IncludedCheckedBags {
  quantity: number | null;
  weight: number | null;
  weightUnit: string | null;
}

export interface Itineraries {
  duration: string;
  segments: Segments[];
}

export interface Location {
  cityCode: string;
  countryCode: string;
  airportName: string | null;
}

export interface Operating {
  carrierCode: string;
  airlineName: string;
}

export interface Segments {
  id: string;
  departure: FlightLocation;
  arrival: FlightLocation;
  carrierCode: string;
  airlineName: string;
  number: string;
  aircraft: Aircraft;
  operating: Operating | null;
  duration: string;
  layoverTime: string | null;
}

export interface TPPrice {
  currency: string;
  total: string;
  base: string;
}

export interface TravelerInfo {
  travelerId: string;
  travelerType: string;

  fareDetailsBySegment: FareDetailsBySegment;
}

export interface TravelerPricings {
  travelerId: string;
  travelerType: string;
  price: TPPrice;
  fareDetailsBySegment: FareDetailsBySegment[];
}

export type currencyValues = "USD" | "MXN" | "EUR";
