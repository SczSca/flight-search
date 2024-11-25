import { FlightOffersResponse, Location } from "../types";

export const blankLocations: Record<string, Location> = {
  "000": { cityCode: "000", countryCode: "000", airportName: null },
};

export const responseBlank: FlightOffersResponse = {
  type: "-1",
  dictionaries: {
    locations: blankLocations,
  },
  data: [
    {
      id: "1",
      oneWay: false,
      numberOfBookableSeats: 0,
      itineraries: [
        {
          duration: "PT0H0M",
          segments: [
            {
              departure: {
                iataCode: "000",
                terminal: "0",
                at: "1990-01-01T00:59:00",
              },
              arrival: {
                iataCode: "000",
                terminal: "0",
                at: "1990-01-01T00:59:00",
              },
              carrierCode: "00",
              airlineName: "blank",
              number: "000",
              aircraft: {
                code: "000",
                name: "blank",
              },
              operating: {
                carrierCode: "00",
                airlineName: "blank",
              },
              duration: "PT0H00M",
              layoverTime: null,
              id: "1",
            },
          ],
        },
      ],
      price: {
        currency: "USD",
        total: "000.00",
        base: "000.00",
        fees: [
          {
            amount: "0.00",
            type: "blank",
          },
          {
            amount: "0.00",
            type: "blank",
          },
        ],
        grandTotal: "000.00",
      },
      travelerPricings: [
        {
          travelerId: "1",
          travelerType: "blank",
          price: {
            currency: "USD",
            total: "000.00",
            base: "000.00",
          },
          fareDetailsBySegment: [
            {
              segmentId: "3",
              cabin: "ECONOMY",
              includedCheckedBags: {
                quantity: null,
                weight: null,
                weightUnit: null,
              },
              amenities: null,
              class: "X",
            },
          ],
        },
      ],
    },
  ],
};
