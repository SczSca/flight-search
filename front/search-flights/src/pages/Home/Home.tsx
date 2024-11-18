import React, { useContext, useEffect } from "react";
import loadingIcon from "../../assets/travel.gif";
import { Backdrop, Box, Fade, Modal } from "@mui/material";
import { SearchForm } from "../../components/SearchForm/SearchForm";
import { APIConsumerContext } from "../../context/APIConsumerContext";

const sxStyle = {
  display: "flex",
  flexDirection: "column",
  gap: 2,
  alignItems: "center",
  justifyContent: "center",
};

const titleSxStyle = {
  marginTop: 4,
  marginBottom: 4,
};

const style = {
  position: "absolute",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  // border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const Home = () => {
  const [open, setOpen] = React.useState(true);
  // const handleOpen = () => setOpen(true);

  const { loading } = useContext(APIConsumerContext);
  useEffect(() => {
    // Cierra el modal automáticamente cuando `loadingT` es false

    setOpen(loading);
  }, [loading]);
  return (
    <Box sx={sxStyle}>
      <Box component={"h1"} sx={titleSxStyle}>
        Home
      </Box>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 1000,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <img
              src={loadingIcon}
              alt="loading icon"
              width="60%"
              height="60%"
            />
            <h1>Looking for Flights...</h1>
          </Box>
        </Fade>
      </Modal>
      <SearchForm></SearchForm>
    </Box>
  );
};
