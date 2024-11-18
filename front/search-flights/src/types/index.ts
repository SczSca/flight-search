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
  aircraft: Record<string, string>;
  carriers: Record<string, string>;
}

export interface FareDetailsBySegment {
  segmentId: string;
  cabin: string;
  class: string;
  includedCheckBags: IncludedCheckedBags;
  amenities: Amenities[];
}

export interface Fees {
  amount: string;
  type: string;
}

export interface FOPrice extends TPPrice {
  fees: Fees[];
  grandTotal: string;
}

export interface FlightLocation {
  iataCode: string;
  terminal: string;
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
  dictionaries: Dictionaries;
  data: FlightOffers[];
}
export interface FlightSearchRequest {
  originLocationCode: string;
  destinationLocationCode: string;
  departureDate: string;
  returnDate: string;
  adults: number;
  nonStop: boolean;
  currencyCode: string;
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
  quantity: string;
}

export interface Itineraries {
  duration: string;
  segments: Segments[];
}

export interface Location {
  cityCode: string;
  countryCode: string;
  airportName: string;
}

export interface Operating {
  carrierCode: string;
  airline: string;
}

export interface Segments {
  id: string;
  departure: FlightLocation;
  arrival: FlightLocation;
  carrierCode: string;
  airlineName: string;
  number: string;
  aircraft: Aircraft;
  operating: Operating;
  duration: string;
  layOverTime: string;
}

export interface TPPrice {
  currency: string;
  total: string;
  base: string;
}

export interface TravelerPricings {
  travelerId: string;
  travelerType: string;
  price: TPPrice;
  fareDetailsBySegment: FareDetailsBySegment[];
}
