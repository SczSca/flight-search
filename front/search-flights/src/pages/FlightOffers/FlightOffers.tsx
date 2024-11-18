import { Box, Button, Container } from "@mui/material";
import React from "react";
import {
  boxesContainerSxStyle,
  containerTop,
  leftBoxSxStyle,
  mainSxStyle,
  rightBoxSxStyle,
} from "./FO_sxStyles";
import { useParams } from "react-router-dom";
import { GroupButtonFilter } from "../../components/GroupButtonFilter/GroupButtonFilter";

export const FlightOffers = () => {
  const { sourceLocation, destinationLocation } = useParams();
  const btnTextsArr = ["Recommended", "Cheapest", "Fastest"];

  const handleClick1 = () => {
    alert("Button clicked!1");
  };
  const handleClick2 = () => {
    alert("Button clicked!2");
  };
  const handleClick3 = () => {
    alert("Button clicked!3");
  };

  const onClickHandlers = [handleClick1, handleClick2, handleClick3];
  return (
    <Box sx={mainSxStyle}>
      <Container maxWidth="xl" sx={containerTop}>
        <Button>Return to search Form</Button>
        <h1>
          Flights from {sourceLocation} to {destinationLocation} Airport
        </h1>
      </Container>
      <Container id="boxes-container" maxWidth="xl" sx={boxesContainerSxStyle}>
        <Box sx={leftBoxSxStyle}>
          <h2>Filters</h2>
        </Box>
        <Box sx={rightBoxSxStyle}>
          <GroupButtonFilter
            btnTextsArr={btnTextsArr}
            onClickHandlers={onClickHandlers}
          ></GroupButtonFilter>
        </Box>
      </Container>
    </Box>
  );
};
