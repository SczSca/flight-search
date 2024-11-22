import { Box, Divider, Typography } from "@mui/material";
import { currencyValues, FOPrice, TravelerPricings } from "../../types";
import { currencySymbols } from "../../utils";

interface Props {
  price: FOPrice;
  travelerPricings: {
    travelerId: string;
    travelerType: string;
    price: {
      total: string;
      currency: currencyValues;
      base: string;
    };
  }[];
}
export const PriceColumn = ({ price, travelerPricings }: Props) => {
  const currencyStr = `${price.currency}${currencySymbols[price.currency]}`;

  const paddingLeftMain = 2;
  const paddingLeftTravelerPrice = 2.5;

  const renderFees: () => JSX.Element[] = () => {
    return price.fees.map((fee) => {
      return (
        <>
          <Typography variant="body1" pl={paddingLeftTravelerPrice}>
            {fee.type}: {currencyStr}
            {fee.amount}
          </Typography>
        </>
      );
    });
  };
  const renderTravelerPrices: () => JSX.Element[] = () => {
    return travelerPricings.map((traveler) => {
      return (
        <>
          <Box pl={paddingLeftMain}>
            <Typography variant="subtitle1" component="h3" pl={1}>
              Traveler:
              {traveler.travelerId} {traveler.travelerType}
            </Typography>
            <Typography variant="body1" pl={paddingLeftTravelerPrice}>
              Base: {currencyStr}
              {traveler.price.base}
            </Typography>
            <Typography variant="body1" pl={paddingLeftTravelerPrice}>
              Total: {currencyStr}
              {traveler.price.total}
            </Typography>
          </Box>
          <Divider sx={{ mb: 1, mt: 1 }} />
        </>
      );
    });
  };

  return (
    <>
      <Box pl={paddingLeftMain}>
        <Typography variant="h5" component="h2">
          Price breakdown
        </Typography>
        <Typography variant="body1" pl={paddingLeftTravelerPrice}>
          Base: {currencyStr}
          {price.base}
        </Typography>
        <Typography
          variant="body1"
          fontWeight={600}
          fontSize={20}
          pl={paddingLeftTravelerPrice}
        >
          Total: {currencyStr}
          {price.grandTotal}
        </Typography>
        <Typography variant="h6" component="h3">
          Fees:
        </Typography>
        {renderFees()}
        <Typography variant="h6" component="h3">
          Travelers:
        </Typography>
      </Box>
      <Divider />
      {renderTravelerPrices()}
    </>
  );
};
