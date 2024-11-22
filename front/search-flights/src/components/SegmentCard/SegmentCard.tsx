import { Box, Typography } from "@mui/material";
import { boxModal_sxStyle, lefChild_sxStyle, SC_sxStyle } from "./SC_sxStyles";
import {
  Aircraft,
  currencyValues,
  FareDetailsBySegment,
  FOPrice,
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
  from: string;
  to: string;
  isReturn: boolean; // comparar si tenemos mas de un itinerario
  details: {
    // id: string;
    // price: FOPrice;
    travelerPricings: TravelerPricings[];
    // travelerPricings: {
    //   travelerId: string;
    //   price: {
    //     total: string;
    //     currency: string;
    //   };
    //   fareDetailsBySegment: FareDetailsBySegment;
    // }[];
    itineraries: {
      duration: string;
      segment: Segments;
      //   segment: {
      //     departure: {
      //       iataCode: string;
      //       at: string;
      //     };
      //     arrival: {
      //       iataCode: string;
      //       at: string;
      //     };
      //     aircraft: Aircraft;
      //     operating: Operating;
      //     airlineName: string;
      //     carrierCode: string;
      //     layoverTime: string | null;
      //   };
    };
  };
  //   locations: Record<string, string>;
  locations: Record<string, Location>;
  currencyCode: currencyValues;
}

export const SegmentCard = ({ details, locations }: Props) => {
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

  const operatingAirline: string = itinerary.segment.operating.airlineName;
  const operatingCarrierCode: string = itinerary.segment.operating.carrierCode;
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
    <Box className="segment-card" sx={SC_sxStyle}>
      <Box className="segment-left-child" sx={lefChild_sxStyle}>
        <Typography variant="body1" fontSize={16.5}>
          {departureFormattedDate} ----- {arrivalFormattedDate}
        </Typography>
        <Typography variant="body1" fontSize={14.5}>
          {departureAirportStr} ({departureIATACodeStr}) ----{" "}
          {arrivalAirportStr} ({arrivalIATACodeStr})
        </Typography>
        <Typography variant="body1" fontSize={13}>
          {airlinesStr} {aircraftStr}
        </Typography>
      </Box>
      <Box className="segment-right-child" sx={boxModal_sxStyle}>
        <ModalDetails travelerInfo={segmentTravelerInfo} />
      </Box>
    </Box>
  );
};
