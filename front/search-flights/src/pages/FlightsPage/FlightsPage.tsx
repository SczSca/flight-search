import { Box, Button, Container } from "@mui/material";
import {
  boxesContainerSxStyle,
  leftBoxSxStyle,
  mainSxStyle,
  rightBoxSxStyle,
} from "./FP_sxStyles";
import { GroupButtonFilter } from "../../components/GroupButtonFilter/GroupButtonFilter";
import { FlightCard } from "../../components/FlightCard/FlightCard";
import { btnTextsArr } from "../../utils";
import { useContext } from "react";
import { searchFlightContext } from "../../context/SearchFlightContext";

export const FlightPages = () => {
  const { flightResults, locations, setFlightResults, setLocations } =
    useContext(searchFlightContext);

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
    <Container id="boxes-container" maxWidth="xl" sx={boxesContainerSxStyle}>
      <Box sx={leftBoxSxStyle}>
        <h2>Filters</h2>
      </Box>
      <Box sx={rightBoxSxStyle}>
        <GroupButtonFilter
          btnTextsArr={btnTextsArr}
          onClickHandlers={onClickHandlers}
        />
        {flightResults?.data.map((flightResult, idx) => {
          return (
            <FlightCard
              flightResult={flightResult}
              currencyCode={"EUR"}
              locations={locations}
              key={`flight-card-${idx}`}
            />
          );
        })}
      </Box>
      {/* 
        
        [resultados].map((result)=>(
        <FlightCard
        itrm={item}
        
        /?>

        // escas y cuando card sencilla para todos los vuelos
        los vuelos con escala se representan igual pero con  un boton de detall y se muestra la card de detalle 

        // caja , 3 columnas grid 
        1 los datos de aeropuerto fecha y arelonia 
        2 la duracion del vuelo y detalles si es con escala 
        3 precios 
        ))
        */}
    </Container>
  );
};
