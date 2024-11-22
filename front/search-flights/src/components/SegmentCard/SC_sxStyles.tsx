const leftChildWidth = 70;
const rightChildWidth = 100 - leftChildWidth;

export const boxModal_sxStyle = {
  display: "flex",
  alighItems: "center",
  justifyContent: "center",
  width: `${rightChildWidth}%`,
};

export const SC_sxStyle = {
  display: "flex",
  width: "85%",
  border: "1px solid gray",
  borderRadius: ".5rem",
  paddingTop: 1,
  paddingBottom: 1,
  marginTop: 3,
  marginBottom: 4,
};

export const lefChild_sxStyle = {
  display: "flex",
  textAlign: "center",
  flexDirection: "column",
  width: `${leftChildWidth}%`,
  //   border: "1px solid red",
};
