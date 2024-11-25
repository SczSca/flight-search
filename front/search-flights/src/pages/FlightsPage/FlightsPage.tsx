import { Box, Container } from "@mui/material";
import {
  boxesContainerSxStyle,
  leftBoxSxStyle,
  rightBoxSxStyle,
} from "./FP_sxStyles";
import { GroupButtonFilter } from "../../components/GroupButtonFilter/GroupButtonFilter";
import { FlightCard } from "../../components/FlightCard/FlightCard";
import { btnTextsArr } from "../../utils";
import { useContext, useEffect, useState } from "react";
import { searchFlightContext } from "../../context/SearchFlightContext";
import {
  currencyValues,
  FlightOffersResponse,
  FlightResultStates,
  FlightSearchRequest,
} from "../../types";
import { useParams } from "react-router-dom";
import { responseBlank } from "../../utils/blankValues";
import { ModalExpired } from "../../components/ModalExpired/ModalExpired";
import { APIConsumerContext } from "../../context/APIConsumerContext";
import { ModalLoading } from "../../components/ModalLoading/ModalLoading";

export const FlightPages = () => {
  const {
    flightResultsState,
    locations,
    getLocalStorageWithExpiry,
    setFlightResultsState,
    setLocalStorageWithExpiry,
    setLocations,
  } = useContext(searchFlightContext);

  const { handleGetFlightOffers, loading } = useContext(APIConsumerContext);

  const { sourceLocation, destinationLocation } = useParams();

  const [openLoading, setOpenLoading] = useState<boolean>(false);

  const localStorageFlights = getLocalStorageWithExpiry(
    `${sourceLocation}-${destinationLocation}-response-default`
  ) as FlightOffersResponse;

  let open: boolean = false;

  if (localStorageFlights === null) {
    open = true;
  }

  if (flightResultsState.renderInfo === responseBlank) {
    if (localStorageFlights != null) {
      const state: FlightResultStates = flightResultsState;
      state.renderInfo = localStorageFlights;
      setFlightResultsState(state);
      setLocations(localStorageFlights.dictionaries.locations);
    }
  }

  const handlingRequest = (order: string) => {
    const localStorageFlights = getLocalStorageWithExpiry(
      `${sourceLocation}-${destinationLocation}-response-${order}`
    ) as FlightOffersResponse;

    const state: FlightResultStates = flightResultsState;

    if (localStorageFlights !== null) {
      state.renderInfo = localStorageFlights;
      if (order == "fastest") {
        state.fastest = localStorageFlights;
      } else if (order == "cheapest") {
        state.cheapest = localStorageFlights;
      } else {
        state.default = localStorageFlights;
      }
      setFlightResultsState(state);
      setLocations(state.renderInfo.dictionaries.locations);
    } else {
      const queryParams: FlightSearchRequest = getLocalStorageWithExpiry(
        `${sourceLocation}-${destinationLocation}-request`
      ) as FlightSearchRequest;
      queryParams.order = order;
      handleGetFlightOffers(queryParams).then((flightResults) => {
        state.renderInfo = flightResults;
        if (order == "fastest") {
          state.fastest = flightResults;
        } else if (order == "cheapest") {
          state.cheapest = flightResults;
        } else {
          state.default = flightResults;
        }
        setFlightResultsState(state);
        setLocations(flightResults.dictionaries.locations);
        setLocalStorageWithExpiry(
          `${sourceLocation}-${destinationLocation}-response-${order}`,
          flightResults
        );
      });
    }
  };

  const handleClick1 = () => {
    handlingRequest("default");
  };

  const handleClick2 = () => {
    handlingRequest("cheapest");
  };

  const handleClick3 = () => {
    handlingRequest("fastest");
  };

  const onClickHandlers = [handleClick1, handleClick2, handleClick3];

  useEffect(() => {}, [flightResultsState]);

  useEffect(() => {
    // closes modal when `loading` switches to false

    setOpenLoading(loading);
  }, [loading]);
  return (
    <Container id="boxes-container" maxWidth="xl" sx={boxesContainerSxStyle}>
      <ModalExpired open={open} />
      <ModalLoading open={openLoading} />
      <Box sx={leftBoxSxStyle}>
        <h2>Filters</h2>
      </Box>
      <Box sx={rightBoxSxStyle}>
        <GroupButtonFilter
          btnTextsArr={btnTextsArr}
          onClickHandlers={onClickHandlers}
        />
        {flightResultsState.renderInfo.data.map((flightResult, idx) => {
          return (
            <FlightCard
              currencyCode={flightResult.price.currency as currencyValues}
              flightResult={flightResult}
              key={`flight-card-${idx}`}
              keyId={`flight-card-${idx}`}
              locations={locations}
              orderType={flightResultsState.renderInfo.type}
            />
          );
        })}
      </Box>
    </Container>
  );
};
