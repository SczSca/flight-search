import { Box, Container, Typography } from "@mui/material";

import {
  boxesContainerSxStyle,
  leftBoxSxStyle,
  rightBoxSxStyle,
} from "./FD_sxStyles";
import { SegmentCard } from "../../components/SegmentCard/SegmentCard";
import {
  currencyValues,
  FlightCardData,
  FlightOffersResponse,
  Location,
} from "../../types";
import { PriceColumn } from "../../components/PriceColumn/PriceColumn";
import { Fragment, useContext } from "react";
import { searchFlightContext } from "../../context/SearchFlightContext";
import { useLocation, useParams } from "react-router-dom";
import { ModalExpired } from "../../components/ModalExpired/ModalExpired";

export const FlightDetails = () => {
  const { setLocations, getLocalStorageWithExpiry } =
    useContext(searchFlightContext);
  const location = useLocation();
  const { sourceLocation, destinationLocation, id } = useParams();

  // const [open, setOpen] = useState<boolean>(false);
  let type: string = "default";

  if (location.state.orderType == "2") {
    type = "cheapest";
  } else if (location.state.orderType == "3") {
    type = "fastest";
  }

  const localStorageFlights = getLocalStorageWithExpiry(
    `${sourceLocation}-${destinationLocation}-response-${type}`
  ) as FlightOffersResponse;

  let open: boolean = false;

  if (localStorageFlights == null) {
    //opens a modal that returns to search form
    open = true;
  }

  let flightResult: FlightCardData = location.state
    .flightResult as FlightCardData;
  let locationsRenderInfo: Record<string, Location> = location.state
    .locations as Record<string, Location>;

  if (flightResult == null) {
    localStorageFlights.data.some((flightOffer) => {
      if (flightOffer.id == id) {
        flightResult = flightOffer;
        return true;
      }
    });
    // setFlightResultsDefault(localStorageFlights);
    locationsRenderInfo = localStorageFlights.dictionaries.locations;
    setLocations(localStorageFlights.dictionaries.locations);
  }

  const priceColumnDetails = {
    price: flightResult.price,
    travelerPricing: flightResult.travelerPricings,
  };

  return (
    <Container maxWidth="xl" sx={boxesContainerSxStyle}>
      <ModalExpired open={open} />
      <Box sx={leftBoxSxStyle}>
        {flightResult.itineraries.map((itinerary, itineraryIdx) => {
          let SegmentsTitle: string = "";
          if (itineraryIdx == 0) {
            SegmentsTitle = "Outboarding Flights";
          } else {
            SegmentsTitle = "Returning Flights";
          }

          return (
            <Fragment key={`fragment-segments-${itineraryIdx}`}>
              <Typography
                variant="h4"
                component="h2"
                key={`segment-title-${itineraryIdx}`}
                mt={2}
                mb={2}
                data-testid={`segment-title-${itineraryIdx}`}
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
                    details={details}
                    locations={locationsRenderInfo}
                    currencyCode={flightResult.price.currency as currencyValues}
                    key={`segment-card-${itineraryIdx}-${segmentIdx}`}
                    keyId={`segment-card-${itineraryIdx}-${segmentIdx}`}
                  />
                );
              })}
            </Fragment>
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
