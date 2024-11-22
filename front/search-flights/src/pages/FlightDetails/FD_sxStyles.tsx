import { paddingLeft } from "../../components/FlightCard/FC_sxStyles";

const leftBoxWidth: number = 70;
const rightBoxWidth: number = 100 - leftBoxWidth;

export const boxesContainerSxStyle = {
  display: "flex",
};

export const leftBoxSxStyle = {
  width: `${leftBoxWidth}%`,
  paddingTop: 2,
  //   border: "1px solid gray",
  paddingRight: 8,
  paddingLeft: 6,
};

export const mainSxStyle = {
  alignItems: "center",
  display: "flex",
  flexDirection: "column",
  gap: 2,
  justifyContent: "center",
};

export const rightBoxSxStyle = {
  paddingTop: 2,
  paddingBottom: 4,
  width: `${rightBoxWidth}%`,
  border: "1px solid gray",
};
