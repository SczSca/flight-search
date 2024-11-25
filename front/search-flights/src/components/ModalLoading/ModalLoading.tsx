import { Backdrop, Box, Fade, Modal } from "@mui/material";
import loadingIcon from "../../assets/travel.gif";
import { boxInFadeSxStyle } from "./ML_sxStyles";

interface Props {
  open: boolean;
}
export const ModalLoading = ({ open }: Props) => {
  return (
    <Modal
      open={open}
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 1000,
        },
      }}
    >
      <Fade in={open}>
        <Box sx={boxInFadeSxStyle}>
          <img src={loadingIcon} alt="loading icon" width="60%" height="60%" />
          <h1>Looking for Flights...</h1>
        </Box>
      </Fade>
    </Modal>
  );
};
