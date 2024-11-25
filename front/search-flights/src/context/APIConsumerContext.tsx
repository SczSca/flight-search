import { createContext, useState } from "react";
import {
  ComponentWithChildren,
  FlightOffersResponse,
  FlightSearchRequest,
  IATAItem,
  IATAResponse,
} from "../types";

interface APIConsumerContextI {
  handleGetRecommendations: (keyword: string) => Promise<IATAItem[]>;
  handleGetFlightOffers: (
    queryParams: FlightSearchRequest
  ) => Promise<FlightOffersResponse>;
  loading: boolean;
}

export const APIConsumerContext = createContext<APIConsumerContextI>(null!);
APIConsumerContext.displayName = "APIConsumerProvider";

export const APIConsumerProvider = ({ children }: ComponentWithChildren) => {
  const baseURL: string = "http://localhost:9090/api/v1";

  const [loading, setLoading] = useState<boolean>(false);

  const handleGetRecommendations = async (
    keyword: string
  ): Promise<IATAItem[]> => {
    try {
      setLoading(true);
      const params = { keyword: keyword };

      const url = new URL(`${baseURL}/info/IATA`);
      url.search = new URLSearchParams(params).toString();

      const data = await fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      });
      const res = (await data.json()) as IATAResponse;
      setLoading(false);
      return res.data;
    } catch (error) {
      throw error;
    }
  };
  const handleGetFlightOffers = async (
    queryParams: FlightSearchRequest
  ): Promise<FlightOffersResponse> => {
    try {
      setLoading(true);
      const params = {
        originLocationCode: queryParams.originLocationCode,
        destinationLocationCode: queryParams.destinationLocationCode,
        departureDate: queryParams.departureDate,
        returnDate: queryParams.returnDate,
        adults: String(queryParams.adults),
        nonStop: String(queryParams.nonStop),
        currencyCode: queryParams.currencyCode,
        order: queryParams.order,
      };

      const url = new URL(`${baseURL}/search/flights`);
      url.search = new URLSearchParams(params).toString();

      const data = await fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      });
      const res = (await data.json()) as FlightOffersResponse;
      let responseType: string = "1";
      if (queryParams.order == "cheapest") {
        responseType = "2";
      } else if (queryParams.order == "fastest") {
        responseType = "3";
      }
      res.type = responseType;
      setLoading(false);
      return res;
    } catch (error) {
      throw error;
    }
  };

  return (
    <APIConsumerContext.Provider
      value={{
        handleGetRecommendations,
        handleGetFlightOffers,
        loading,
      }}
    >
      {children}
    </APIConsumerContext.Provider>
  );
};
