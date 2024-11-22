import { Button, Container, Typography } from "@mui/material";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { containerTop } from "./HR_sxStyles";
import { baseFlight_path } from "../../utils";

export const HeaderResults = () => {
  const { sourceLocation, destinationLocation } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  let title, buttonText;
  let handleOnClick: React.MouseEventHandler<HTMLButtonElement>;

  if (location.pathname.includes("search")) {
    title = `Flights from ${sourceLocation} to ${destinationLocation} Airport`;
    buttonText = "Back to Search Form";
    handleOnClick = () => {
      navigate("/");
    };
  } else if (location.pathname.includes("details")) {
    title = "Flight Details";
    buttonText = "Back to Results";
    handleOnClick = () => {
      navigate(
        `${baseFlight_path}/search/from/${sourceLocation}/to/${destinationLocation}`
      );
    };
  }

  return (
    <>
      <Container maxWidth="xl" sx={containerTop}>
        <Button onClick={handleOnClick}>{buttonText}</Button>
        <Typography variant="h1" fontSize={"2.5rem"}>
          {title}
        </Typography>
      </Container>
      <Outlet />
    </>
  );
};
