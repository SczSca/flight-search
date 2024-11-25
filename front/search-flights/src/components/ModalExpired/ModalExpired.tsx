import { Backdrop, Box, Button, Fade, Modal, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { boxInFadeSxStyle } from "./ME_sxStyles";

interface Props {
  open: boolean;
}

export const ModalExpired = ({ open }: Props) => {
  const navigate = useNavigate();

  const handleGoBackOnClick = () => {
    navigate("/");
  };
  return (
    <>
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
            <Typography variant="h5" component="h2">
              Flights results have expired, go back to the search form
            </Typography>
            <Button onClick={handleGoBackOnClick}>Go Back</Button>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};
