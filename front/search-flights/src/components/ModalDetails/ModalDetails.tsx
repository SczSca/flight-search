import { Box, Button, Divider, Modal, Typography } from "@mui/material";
import { useState } from "react";
import { Box_sxStyle } from "./MD_sxStyles";
import {
  currencyValues,
  FareDetailsBySegment,
  TravelerInfo,
} from "../../types";
interface Props {
  travelerInfo: TravelerInfo[];
}
const ModalDetails = ({ travelerInfo }: Props) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const renderTravelersInfo: () => JSX.Element[] = () => {
    return travelerInfo.map((travelerInfoItem) => {
      const amenities = travelerInfoItem.fareDetailsBySegment.amenities;
      return (
        <>
          <Typography
            className="modal-traveler-title"
            variant="h5"
            component="h3"
          >
            Traveler {travelerInfoItem.travelerId}{" "}
            {travelerInfoItem.travelerType}
          </Typography>
          <Typography className="modal-traveler-cabin" sx={{ mt: 2 }}>
            Category: {travelerInfoItem.fareDetailsBySegment.cabin}
          </Typography>
          <Typography className="modal-traveler-class" sx={{ mt: 2 }}>
            Class: {travelerInfoItem.fareDetailsBySegment.class}
          </Typography>
          <Typography
            className="modal-traveler-amenities-title"
            variant="h6"
            sx={{ mt: 2 }}
          >
            Amenities
          </Typography>

          {amenities?.map((amenity) => {
            return (
              <>
                <Typography className="modal-traveler-amenities" sx={{ mt: 2 }}>
                  Name: {amenity.description}
                </Typography>
                <Typography className="modal-traveler-amenities" sx={{ mt: 2 }}>
                  Included: {String(!amenity.isChargeable)}
                </Typography>
              </>
            );
          })}
          <Divider sx={{ mt: 2, mb: 2 }} />
        </>
      );
    });
  };

  return (
    <>
      <Button onClick={handleOpen}>Traveler Details</Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={Box_sxStyle}>{renderTravelersInfo()}</Box>
      </Modal>
    </>
  );
};

export default ModalDetails;
