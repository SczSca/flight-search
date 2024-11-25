import { Box, Divider, Typography } from "@mui/material";
import { currencyValues, FOPrice } from "../../types";
import { currencySymbols } from "../../utils";
import { Fragment } from "react";

interface Props {
  price: FOPrice;
  travelerPricings: {
    travelerId: string;
    travelerType: string;
    price: {
      total: string;
      currency: string;
      base: string;
    };
  }[];
}
export const PriceColumn = ({ price, travelerPricings }: Props) => {
  const currency = price.currency as currencyValues;

  const currencyStr = `${price.currency}${currencySymbols[currency]}`;

  const paddingLeftMain = 2;
  const paddingLeftTravelerPrice = 2.5;

  const renderFees: () => JSX.Element[] = () => {
    return price.fees.map((fee, feeIdx) => {
      return (
        <Fragment key={`fragment-fee-${feeIdx}`}>
          <Typography
            variant="body1"
            pl={paddingLeftTravelerPrice}
            key={`fee-info-${feeIdx}`}
          >
            {fee.type}: {currencyStr}
            {fee.amount}
          </Typography>
        </Fragment>
      );
    });
  };
  const renderTravelerPrices: () => JSX.Element[] = () => {
    return travelerPricings.map((traveler, travelerIdx) => {
      return (
        <Fragment key={`fragment-traveler-price-${travelerIdx}`}>
          <Box pl={paddingLeftMain} key={`box-traveler-price-${travelerIdx}`}>
            <Typography
              variant="subtitle1"
              component="h3"
              pl={1}
              key={`traveler-type-${travelerIdx}`}
            >
              Traveler:
              {traveler.travelerId} {traveler.travelerType}
            </Typography>
            <Typography
              variant="body1"
              pl={paddingLeftTravelerPrice}
              key={`traveler-base-price-${travelerIdx}`}
            >
              Base: {currencyStr}
              {traveler.price.base}
            </Typography>
            <Typography
              variant="body1"
              pl={paddingLeftTravelerPrice}
              key={`traveler-total-price-${travelerIdx}`}
            >
              Total: {currencyStr}
              {traveler.price.total}
            </Typography>
          </Box>
          <Divider
            sx={{ mb: 1, mt: 1 }}
            key={`divider-traveler-price-${travelerIdx}`}
          />
        </Fragment>
      );
    });
  };

  return (
    <>
      <Box pl={paddingLeftMain} data-testid="price-column">
        <Typography variant="h5" component="h2">
          Price breakdown
        </Typography>
        <Typography variant="h6" component="h3">
          Travelers:
        </Typography>
      </Box>
      <Divider />
      {renderTravelerPrices()}
      <Box pl={paddingLeftMain}>
        <Typography variant="body1" pl={paddingLeftTravelerPrice}>
          Total Base: {currencyStr}
          {price.base}
        </Typography>

        <Typography variant="h6" component="h3">
          Fees:
        </Typography>

        {renderFees()}
        <Typography
          variant="body1"
          fontWeight={600}
          fontSize={20}
          mt={1}
          mb={2}
        >
          Grand Total: {currencyStr}
          {price.grandTotal}
        </Typography>
      </Box>
    </>
  );
};
