import { Box, Container, Typography } from "@mui/material";

import {
  boxesContainerSxStyle,
  leftBoxSxStyle,
  rightBoxSxStyle,
} from "./FD_sxStyles";
import { SegmentCard } from "../../components/SegmentCard/SegmentCard";
import { currencyValues, FlightCardData } from "../../types";
import { PriceColumn } from "../../components/PriceColumn/PriceColumn";
import { useContext } from "react";
import { searchFlightContext } from "../../context/SearchFlightContext";
import { responseDummy } from "../../utils/flightResponseDummy";
import { useLocation } from "react-router-dom";

export const FlightDetails = () => {
  const { flightResults, setFlightResults } = useContext(searchFlightContext);
  const location = useLocation();
  const flightResult = location.state as FlightCardData;
  const currencyCode: currencyValues = "USD";
  const dummyDetails = {
    id: "1",
    itineraries: {
      duration: "PT16H25M",
      segments: {
        departure: {
          iataCode: "DUMMY1",
          at: "2024-11-20T12:50:00",
        },
        arrival: {
          iataCode: "DUMMY2",
          at: "2024-11-20T14:50:00",
        },
        aircraft: {
          code: "789",
          name: "BOEING 787-9",
        },
        operating: {
          carrierCode: "OP1",
          airlineName: "Operating Air1",
        },
        airlineName: "Airline 1",
        carrierCode: "A1",
        layoverTime: null,
      },
    },
    price: {
      currency: currencyCode,
      total: "992.80",
      base: "366.00",
      fees: [
        {
          amount: "0.00",
          type: "SUPPLIER",
        },
        {
          amount: "0.00",
          type: "TICKETING",
        },
      ],
      grandTotal: "992.80",
    },
    travelerPricings: [
      {
        travelerId: "1",
        travelerType: "ADULT",
        price: {
          total: "100",
          currency: currencyCode,
          base: "50",
        },
        fareDetailsBySegment: {
          segmentId: "1",
          cabin: "ECONOMY",
          includedCheckedBags: {
            quantity: 1,
            weight: null,
            weightUnit: null,
          },
          amenities: [
            {
              description: "CHECKED BAG 1PC OF 23KG 158CM",
              isChargeable: false,
            },
            {
              description: "REFUNDABLE  TICKET",
              isChargeable: true,
            },
            {
              description: "CHANGEABLE  TICKET",
              isChargeable: true,
            },
          ],
          class: "S",
        },
      },
      {
        travelerId: "2",
        travelerType: "ADULT",
        price: {
          total: "100",
          currency: currencyCode,
          base: "50",
        },
        fareDetailsBySegment: {
          segmentId: "1",
          cabin: "ECONOMY",
          includedCheckedBags: {
            quantity: 1,
            weight: null,
            weightUnit: null,
          },
          amenities: [
            {
              description: "CHECKED BAG 1PC OF 23KG 158CM",
              isChargeable: false,
            },
            {
              description: "REFUNDABLE  TICKET",
              isChargeable: true,
            },
            {
              description: "CHANGEABLE  TICKET",
              isChargeable: true,
            },
          ],
          class: "S",
        },
      },
      {
        travelerId: "3",
        travelerType: "ADULT",
        price: {
          total: "100",
          currency: currencyCode,
          base: "50",
        },
        fareDetailsBySegment: {
          segmentId: "1",
          cabin: "ECONOMY",
          includedCheckedBags: {
            quantity: 1,
            weight: null,
            weightUnit: null,
          },
          amenities: [
            {
              description: "CHECKED BAG 1PC OF 23KG 158CM",
              isChargeable: false,
            },
            {
              description: "REFUNDABLE  TICKET",
              isChargeable: true,
            },
            {
              description: "CHANGEABLE  TICKET",
              isChargeable: true,
            },
          ],
          class: "S",
        },
      },
    ],
  };
  const dummyLocations = {
    DUMMY1: "Airport 1",
    DUMMY2: "Airport 2",
    DUMMY3: "Airport 3",
  };

  const priceColumnDetails = {
    price: dummyDetails.price,
    travelerPricing: dummyDetails.travelerPricings,
  };

  return (
    <Container maxWidth="xl" sx={boxesContainerSxStyle}>
      <Box sx={leftBoxSxStyle}>
        {/* <SegmentCard
          from={""}
          to={""}
          isReturn={false}
          details={dummyDetails}
          locations={dummyLocations}
          currencyCode={"USD"}
        /> */}
        {flightResult.itineraries.map((itinerary, itineraryIdx) => {
          let SegmentsTitle: string = "";

          if (itineraryIdx == 0) {
            SegmentsTitle = "Outboarding Flights";
          } else {
            SegmentsTitle = "Returning Flights";
          }

          return (
            <>
              <Typography
                variant="h4"
                component="h2"
                key={`segment-title-${itineraryIdx}`}
                mt={2}
                mb={2}
              >
                {SegmentsTitle}
              </Typography>

              {itinerary.segments.map((segment, segmentIdx) => {
                const details = {
                  travelerPricings: flightResult.travelerPricings,
                  itineraries: {
                    duration: itinerary.duration,
                    segment: segment,
                  },
                };

                return (
                  <SegmentCard
                    from={""}
                    to={""}
                    isReturn={false}
                    details={details}
                    locations={flightResults.dictionaries.locations}
                    currencyCode={"USD"}
                    key={`segment-card-${itineraryIdx}-${segmentIdx}`}
                  />
                );
              })}
            </>
          );
        })}
      </Box>
      <Box sx={rightBoxSxStyle}>
        <PriceColumn
          price={priceColumnDetails.price}
          travelerPricings={priceColumnDetails.travelerPricing}
        ></PriceColumn>
      </Box>
    </Container>
  );
};
