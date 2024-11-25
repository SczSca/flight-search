import { Box, Button, Divider, Modal, Typography } from "@mui/material";
import { Fragment, useState } from "react";
import { Box_sxStyle } from "./MD_sxStyles";
import { TravelerInfo } from "../../types";
interface Props {
  travelerInfo: TravelerInfo[];
  keyId: string;
}
const ModalDetails = ({ travelerInfo, keyId }: Props) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const renderTravelersInfo: () => JSX.Element[] = () => {
    return travelerInfo.map((travelerInfoItem, travelerInfoItemIdx) => {
      const amenities = travelerInfoItem.fareDetailsBySegment.amenities;
      return (
        <Fragment key={`fragment-modal-traveler-${travelerInfoItemIdx}`}>
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
        </Fragment>
      );
    });
  };

  return (
    <Fragment key={`${keyId}-fragment`}>
      <Button onClick={handleOpen}>Traveler Details</Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={Box_sxStyle}>{renderTravelersInfo()}</Box>
      </Modal>
    </Fragment>
  );
};

export default ModalDetails;
