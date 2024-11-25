import { Box, Typography } from "@mui/material";
import { boxModal_sxStyle, lefChild_sxStyle, SC_sxStyle } from "./SC_sxStyles";
import {
  Aircraft,
  currencyValues,
  Location,
  Operating,
  Segments,
  TravelerInfo,
  TravelerPricings,
} from "../../types";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import ModalDetails from "../ModalDetails/ModalDetails";

dayjs.extend(localizedFormat);
dayjs.locale("en");

interface Props {
  details: {
    travelerPricings: TravelerPricings[];
    itineraries: {
      duration: string;
      segment: Segments;
    };
  };
  locations: Record<string, Location>;
  currencyCode: currencyValues;
  keyId: string;
}

export const SegmentCard = ({ details, locations, keyId }: Props) => {
  const itinerary = details.itineraries;
  const departureIATACodeStr = itinerary.segment.departure.iataCode;

  const departureAirportStr = locations[departureIATACodeStr].airportName;

  const departureDate: dayjs.Dayjs = dayjs(itinerary.segment.departure.at);
  const departureFormattedDate = departureDate.format("YYYY-MM-DD HH:mm"); // e.g. 2024-11-20 12:50

  const arrivalIATACodeStr = itinerary.segment.arrival.iataCode;
  const arrivalAirportStr = locations[arrivalIATACodeStr].airportName;
  const arrivalDate: dayjs.Dayjs = dayjs(itinerary.segment.arrival.at);
  const arrivalFormattedDate: string = arrivalDate.format("YYYY-MM-DD HH:mm"); // number of day

  const segmentAirline: string = itinerary.segment.airlineName;
  const segmentCarrierCode: string = itinerary.segment.carrierCode;

  const operating: Operating | null = itinerary.segment.operating;
  let operatingAirline: string = "";
  let operatingCarrierCode: string = "";

  if (operating != null) {
    operatingAirline = operating.airlineName;
    operatingCarrierCode = operating.carrierCode;
  }
  let airlinesStr: string = `${segmentAirline} (${segmentCarrierCode})`;

  if (segmentCarrierCode != operatingCarrierCode) {
    airlinesStr += `, ${operatingAirline} (${operatingCarrierCode})`;
  }

  const aircraft: Aircraft = itinerary.segment.aircraft;
  const aircraftStr: string = `${aircraft.name} (${aircraft.code})`;

  const segmentTravelerInfo: TravelerInfo[] = [];
  details.travelerPricings.map((travelerPricing) => {
    travelerPricing.fareDetailsBySegment.some((fareDetailsBySegmentItem) => {
      if (
        fareDetailsBySegmentItem.segmentId == details.itineraries.segment.id
      ) {
        const travelerInfo: TravelerInfo = {
          travelerId: travelerPricing.travelerId,
          travelerType: travelerPricing.travelerType,
          fareDetailsBySegment: fareDetailsBySegmentItem,
        };
        segmentTravelerInfo.push(travelerInfo);
        return true;
      }
    });
  });

  return (
    <Box
      className="segment-card"
      sx={SC_sxStyle}
      key={`${keyId}-box-segment-card`}
      data-testid={`${keyId}-box-segment-card`}
    >
      <Box
        className="segment-left-child"
        sx={lefChild_sxStyle}
        key={`${keyId}-box-segment-card-left-child`}
      >
        <Typography
          variant="body1"
          fontSize={16.5}
          key={`${keyId}-box-segment-card-date`}
        >
          {departureFormattedDate} ----- {arrivalFormattedDate}
        </Typography>
        <Typography
          variant="body1"
          fontSize={14.5}
          key={`${keyId}-box-segment-card-airports`}
        >
          {departureAirportStr} ({departureIATACodeStr}) ----{" "}
          {arrivalAirportStr} ({arrivalIATACodeStr})
        </Typography>
        <Typography
          variant="body1"
          fontSize={13}
          key={`${keyId}-box-segment-card-airlines`}
        >
          {airlinesStr} {aircraftStr}
        </Typography>
      </Box>
      <Box
        className="segment-right-child"
        sx={boxModal_sxStyle}
        key={`${keyId}-box-segment-card-right-child`}
      >
        <ModalDetails
          travelerInfo={segmentTravelerInfo}
          key={`${keyId}-box-segment-card-modal-details`}
          keyId={`${keyId}-box-segment-card-modal-details`}
        />
      </Box>
    </Box>
  );
};
