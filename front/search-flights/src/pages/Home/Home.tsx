import { useContext, useEffect, useState } from "react";
import { Box } from "@mui/material";
import { SearchForm } from "../../components/SearchForm/SearchForm";
import { APIConsumerContext } from "../../context/APIConsumerContext";
import { sxStyle, titleSxStyle } from "./H_sxStyles";
import { ModalLoading } from "../../components/ModalLoading/ModalLoading";

export const Home = () => {
  const [open, setOpen] = useState(true);

  const { loading } = useContext(APIConsumerContext);
  useEffect(() => {
    // closes modal when `loading` switches to false

    setOpen(loading);
  }, [loading]);

  return (
    <Box sx={sxStyle}>
      <Box component={"h1"} sx={titleSxStyle} data-testid="heading-home">
        Home
      </Box>
      <ModalLoading open={open} data-testid="modal-loading" />
      <SearchForm />
    </Box>
  );
};
