import { Box, Button, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import {
  columnLeft_size,
  columnRight_size,
  detailsBtn_sxStyles,
  FC_sxStyle,
  gridTexts_sxStyle,
  leftGrid_sxStyle,
  paddingLeft,
  rightContainer_sxStyle,
  rightGrid_sxStyle,
  totalPrice_sxStyle,
  travelerLabel_sxStyle,
  travelerPrice_sxStyle,
  typographyFlightInfo_sxStyle,
} from "./FC_sxStyles";
import { currencyValues, FlightCardData, Location } from "../../types";
import { baseFlight_path, currencySymbols } from "../../utils";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import "dayjs/locale/en"; // Cambia al idioma deseado
import { useNavigate, useParams } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";

dayjs.extend(localizedFormat);
dayjs.locale("en");

interface Props {
  currencyCode: currencyValues;
  flightResult: FlightCardData;
  keyId: string;
  locations: Record<string, Location>;
  orderType: string;
}

export const FlightCard = ({
  currencyCode,
  flightResult,
  keyId,
  locations,
  orderType,
}: Props) => {
  // const {} = detail;
  // from
  // to
  // oneWay is sencillo o redondo // para mostrar diferente layout // itineraries lenght 1 sencillo
  // duracion escala // y aeropuerto de escala
  // la aerolinea
  // duracion del vuelo
  // precio por persona
  // precio total
  //

  const gridClasses = ["outbound-flights-grid", "return-flights-grid"];
  const navigate = useNavigate();
  const { sourceLocation, destinationLocation } = useParams();

  const renderCardInfo: () => JSX.Element[] = () => {
    return flightResult.itineraries.map((itinerary, itineraryIdx) => {
      const itinerary_segmentsSize = itinerary.segments.length;

      const departureIATACode = itinerary.segments[0].departure.iataCode;
      const departureAirport = locations[departureIATACode]?.airportName;

      const departureDate = itinerary.segments[0].departure.at;
      const departureDay = dayjs(departureDate).format("D"); // number of day
      const departureMonthName = dayjs(departureDate).format("MMM"); // Nov
      const departureTime24h = dayjs(departureDate).format("HH:mm"); // 12:50 (24 hrs)

      const arrivalIATACode =
        itinerary.segments[itinerary_segmentsSize - 1].arrival.iataCode;
      const arrivalAirport = locations[arrivalIATACode]?.airportName;

      const arrivalDate: string =
        itinerary.segments[itinerary_segmentsSize - 1].arrival.at;
      const arrivalDay: string = dayjs(arrivalDate).format("D"); // number of day
      const arrivalMonthName = dayjs(arrivalDate).format("MMM"); // Nov
      const arrivalTime24h = dayjs(arrivalDate).format("HH:mm"); // 12:50 (24 hrs)

      //time duration format ISO_8601
      let durationStr: string = "";
      const totalDuration = itinerary.duration;
      const days = totalDuration.match(/P.(.*?)D/);
      const hours = totalDuration.match(/T(.*?)H/);
      const minutes = totalDuration.match(/H(.*?)M/);

      if (days) {
        durationStr += `${days[1]}d `;
      }

      if (hours) {
        durationStr += `${hours[1]}h `;
      }

      if (minutes) {
        durationStr += `${minutes[1]}m`;
      }

      let stopsStr: string = `(${itinerary_segmentsSize - 1} `;
      if (itinerary_segmentsSize - 1 == 1) {
        stopsStr += "stop)";
      } else {
        stopsStr += "stops)";
      }

      let itinerary_airlines: string = "";
      const itinerary_airlinesRegistered: Record<string, number> = {};

      const className = gridClasses[itineraryIdx];

      itinerary.segments.map((segment) => {
        const airlineCode = segment.carrierCode;

        if (!(airlineCode in itinerary_airlinesRegistered)) {
          itinerary_airlines += `${segment.airlineName} (${airlineCode}), `;
        }
        itinerary_airlinesRegistered[airlineCode] += 1;
      });
      //if there is only one airline, remove last characters ", "
      if (Object.keys(itinerary_airlinesRegistered).length == 1) {
        itinerary_airlines = itinerary_airlines.slice(0, -2);
      }

      return (
        <Fragment key={`fragment-flight-card-${itineraryIdx}`}>
          <Grid
            container
            size={{ xs: 9, md: 8 }}
            columnSpacing={0}
            rowSpacing={0.3}
            pb={3}
            className={className}
            key={`${keyId}-card-info-${itineraryIdx}`}
          >
            <Grid
              className="departure-info-grid"
              size={columnLeft_size}
              sx={gridTexts_sxStyle}
              pl={paddingLeft}
              key={`${keyId}-departure-info-grid-${itineraryIdx}`}
            >
              <Typography
                variant="body1"
                key={`${keyId}-departure-label-${itineraryIdx}`}
              >
                {" "}
                Departure
              </Typography>
              <Typography
                variant="body2"
                key={`${keyId}-departure-info-${itineraryIdx}`}
              >
                {departureMonthName}, {departureDay} {departureTime24h}
              </Typography>
            </Grid>
            <Grid
              className="arrival-info-grid"
              size={columnRight_size}
              sx={gridTexts_sxStyle}
              key={`${keyId}-arrival-info-grid-${itineraryIdx}`}
            >
              <Typography
                variant="body1"
                key={`${keyId}-arrival-label-${itineraryIdx}`}
              >
                {" "}
                Arrival
              </Typography>
              <Typography
                variant="body2"
                key={`${keyId}-arrival-info-${itineraryIdx}`}
                sx={typographyFlightInfo_sxStyle}
              >
                {arrivalMonthName} {arrivalDay} {arrivalTime24h}
              </Typography>
            </Grid>
            <Grid
              className="departure-airport-grid"
              size={columnLeft_size}
              sx={gridTexts_sxStyle}
              pl={paddingLeft}
              key={`${keyId}-departure-airport-grid-${itineraryIdx}`}
            >
              <Typography
                variant="body2"
                key={`${keyId}-departure-airport-${itineraryIdx}`}
              >
                {departureAirport}
              </Typography>
            </Grid>
            <Grid
              className="arrival-airport-grid"
              size={columnRight_size}
              sx={gridTexts_sxStyle}
              key={`${keyId}-arrival-airport-grid-${itineraryIdx}`}
            >
              <Typography
                variant="body2"
                key={`${keyId}-arrival-airport-${itineraryIdx}`}
              >
                {arrivalAirport}
              </Typography>
            </Grid>
            <Grid
              className="airlines-name-grid"
              size={7}
              sx={gridTexts_sxStyle}
              pl={paddingLeft}
              key={`${keyId}-airlines-name-grid-${itineraryIdx}`}
            >
              <Typography
                variant="body2"
                key={`${keyId}-airlines-name-${itineraryIdx}`}
              >
                {itinerary_airlines}
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            className="duration-info-grid"
            size={{ xs: 3, md: 4 }}
            columnSpacing={0}
            key={`${keyId}-duration-info-grid-${itineraryIdx}`}
          >
            <Grid
              className="hours-grid"
              size={12}
              sx={gridTexts_sxStyle}
              ml={2}
              key={`${keyId}-hours-grid-${itineraryIdx}`}
            >
              <Typography
                variant="body1"
                key={`${keyId}-duration-label-${itineraryIdx}`}
              >
                {" "}
                Duration
              </Typography>
              <Typography
                variant="body2"
                key={`${keyId}-duratino-info-${itineraryIdx}`}
              >
                {durationStr} {stopsStr}
              </Typography>
              {itinerary.segments.map((segment, idx) => {
                const layOverTime = segment.layoverTime;
                if (layOverTime != null) {
                  //get code of departure, which is the airport you stay during the layover time
                  const layoverIATACodeLocation: string =
                    segment.departure.iataCode;
                  const airportName: string | null =
                    locations[layoverIATACodeLocation]?.airportName;

                  //get layover time to put into string. format ISO_8601
                  let layoverStr: string = "";
                  const days = layOverTime.match(/P(.*?)D/);
                  const hours = layOverTime.match(/T(.*?)H/);
                  const minutes = layOverTime.match(/H(.*?)M/);

                  if (days && days[1] != "0") {
                    layoverStr += `${days[1]}d `;
                  }

                  if (hours) {
                    layoverStr += `${hours[1]}h `;
                  }

                  if (minutes) {
                    layoverStr += `${minutes[1]}m`;
                  }
                  return (
                    <Typography
                      variant="body2"
                      key={`${keyId}-stop-${idx}`}
                      sx={typographyFlightInfo_sxStyle}
                    >
                      {layoverStr} in {airportName} ({layoverIATACodeLocation})
                    </Typography>
                  );
                }
                return null;
              })}
            </Grid>
          </Grid>
        </Fragment>
      );
    });
  };

  const handleOnClickflightResult: React.MouseEventHandler<
    HTMLButtonElement
  > = () => {
    const stateDetails = {
      flightResult: flightResult,
      locations: locations,
      orderType: orderType,
    };
    navigate(
      `${baseFlight_path}/details/from/${sourceLocation}/to/${destinationLocation}/${flightResult.id}`,
      {
        state: stateDetails,
      }
    );
  };
  return (
    // <>
    <Box
      className="flight-card"
      sx={FC_sxStyle}
      key={`${keyId}-main-box`}
      data-testid={`${keyId}-main-box`}
    >
      <Grid
        className="main-grid"
        container
        width={"100%"}
        columnSpacing={0}
        key={`${keyId}-main-grid`}
      >
        <Grid
          id="left-child-grid"
          container
          columnSpacing={0}
          size={{ xs: 9, md: 9 }}
          sx={leftGrid_sxStyle}
          key={`${keyId}-left-child-grid`}
        >
          {renderCardInfo()}
        </Grid>
        <Grid
          className="right-child-grid"
          size={{ xs: 3, md: 3 }}
          sx={rightGrid_sxStyle}
          key={`${keyId}-right-child-grid`}
        >
          <Box sx={rightContainer_sxStyle} key={`${keyId}-right-child-box`}>
            <Typography
              variant="subtitle1"
              sx={travelerLabel_sxStyle}
              key={`${keyId}-right-child-box-label-price-traveler`}
            >
              Price per traveler
            </Typography>
            <Typography
              variant="body1"
              sx={travelerPrice_sxStyle}
              key={`${keyId}-right-child-box-price-traveler`}
            >
              {currencyCode}
              {currencySymbols[currencyCode]}{" "}
              {flightResult.travelerPricings[0].price.total}
            </Typography>
            <Typography
              variant="body2"
              sx={totalPrice_sxStyle}
              key={`${keyId}-right-child-box-total-price`}
            >
              Total price: {currencyCode}
              {currencySymbols[currencyCode]} {flightResult.price.total}
            </Typography>
            <Button
              variant="contained"
              sx={detailsBtn_sxStyles}
              onClick={handleOnClickflightResult}
              key={`${keyId}-right-child-box-button-details`}
            >
              View Details
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
    // {/* {oneWay ?<></>:<></>}</> */}
  );
};
