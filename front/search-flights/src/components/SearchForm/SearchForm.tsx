import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Autocomplete,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { baseFlight_path, currencyItems } from "../../utils";
import { searchFlightContext } from "../../context/SearchFlightContext";
import { APIConsumerContext } from "../../context/APIConsumerContext";
import { FlightResultStates, FlightSearchRequest, IATAItem } from "../../types";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

export const SearchForm = () => {
  const {
    arrivalIATAItems,
    arrivalIATAOptions,
    arrivalIATAStr,
    checkedNonStop,
    currency,
    debouncedIATAArrivalReq,
    debouncedIATADepartureReq,
    departureDate,
    departureIATAItems,
    departureIATAOptions,
    departureIATAStr,
    errorArrivalDateMessage,
    errorDepartureDateMessage,
    flightResultsState,
    tomorrow,
    handleArrivalIATAChange,
    handleCheckChange,
    handleDepartureIATAChange,
    handleDPDepartureChange,
    handleSelectChange,
    handleSetMinArrDate,
    setArrivalIATAItems,
    setArrivalIATAOptions,
    setArrivalIATAStr,
    setDepartureIATAItems,
    setDepartureIATAOptions,
    setDepartureIATAStr,
    setErrorArrivalDate,
    setErrorDepartureDate,
    setFlightResultsState,
    setLocalStorageWithExpiry,
    setLocations,
  } = useContext(searchFlightContext);
  const navigate = useNavigate();

  const FormSxStyles = {
    display: "flex",
    flexDirection: "column",
    gap: 2,
    width: "50%",
  };

  const { handleGetRecommendations, handleGetFlightOffers } =
    useContext(APIConsumerContext);

  const [hasMounted, setHasMounted] = useState<boolean>(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const nonStopCheckbox = form.querySelector<HTMLInputElement>(
      'input[name="nonStop"]'
    )!;

    const formElements = new FormData(form);
    const formData = Object.fromEntries(
      formElements
    ) as unknown as FlightSearchRequest;
    formData.nonStop = nonStopCheckbox.checked;
    formData.departureDate = dayjs(departureDate).format("YYYY-MM-DD");
    if (formData.returnDate) {
      formData.returnDate = dayjs(formData.returnDate).format("YYYY-MM-DD");
    }
    let departureName: string = formData.originLocationCode.split(":")[1];
    departureName = departureName.split(" ").join("-");
    let arrivalName: string = formData.destinationLocationCode.split(":")[1];
    arrivalName = arrivalName.split(" ").join("-");

    for (let i = 0; i < departureIATAItems.length; i++) {
      if (formData.originLocationCode == departureIATAItems[i].detailedName) {
        formData.originLocationCode = departureIATAItems[i].iataCode;
        break;
      }
    }
    for (let i = 0; i < arrivalIATAItems.length; i++) {
      if (
        formData.destinationLocationCode == arrivalIATAItems[i].detailedName
      ) {
        formData.destinationLocationCode = arrivalIATAItems[i].iataCode;
        break;
      }
    }
    formData.order = "default";
    handleGetFlightOffers(formData)
      .then((flightResults) => {
        const state: FlightResultStates = flightResultsState;
        state.default = flightResults;
        state.renderInfo = flightResults;
        setFlightResultsState(state);
        // setFlightResultsDefault(flightResults);
        setLocations(flightResults.dictionaries.locations);
        setLocalStorageWithExpiry(
          `${departureName}-${arrivalName}-response-default`,
          flightResults
        );
        setLocalStorageWithExpiry(
          `${departureName}-${arrivalName}-request`,
          formData
        );
        navigate(
          `${baseFlight_path}/search/from/${departureName}/to/${arrivalName}`,
          {
            state: formData,
          }
        );
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    //this prevents to make calls when component is mounted
    if (hasMounted) {
      let keyword: string;
      if (debouncedIATAArrivalReq) {
        keyword = arrivalIATAStr;
      } else {
        keyword = departureIATAStr;
      }
      //this prevents
      if (keyword) {
        handleGetRecommendations(keyword)
          .then((IATAItems: IATAItem[]) => {
            let IATAOptions: string[] = [];
            IATAItems.map((IATAItem: IATAItem) => {
              IATAOptions.push(IATAItem.detailedName);
            });
            if (debouncedIATAArrivalReq) {
              setArrivalIATAItems(IATAItems);
              setArrivalIATAOptions(IATAOptions);
            } else {
              setDepartureIATAItems(IATAItems);
              setDepartureIATAOptions(IATAOptions);
            }
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
      }
      setArrivalIATAStr("");
      setDepartureIATAStr("");
    }
  }, [debouncedIATAArrivalReq, debouncedIATADepartureReq]);

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={FormSxStyles}
      data-testid="search-form"
    >
      <Autocomplete
        options={departureIATAOptions}
        //ooptions when API not workin
        // options={IATAOptions}
        loading={true}
        renderInput={(params) => (
          <TextField
            {...params}
            required
            label="Departure Airport"
            name="originLocationCode"
            value={departureIATAStr}
            onChange={handleDepartureIATAChange}
          />
        )}
      />
      <Autocomplete
        options={arrivalIATAOptions}
        //ooptions when API not workin
        // options={IATAOptions}
        loading={true}
        renderInput={(params) => (
          <TextField
            {...params}
            required
            label="Arrival Airport"
            name="destinationLocationCode"
            value={arrivalIATAStr}
            onChange={handleArrivalIATAChange}
          />
        )}
      />
      <DatePicker
        label="Departure Date"
        name="departureDate"
        defaultValue={tomorrow}
        onChange={handleDPDepartureChange}
        views={["year", "month", "day"]}
        onError={(newError) => setErrorDepartureDate(newError)}
        slotProps={{
          textField: {
            helperText: errorDepartureDateMessage,
            //FormerHelperTextProps and sx are to handle empty value custom error
            FormHelperTextProps: {
              style: { color: "#d32f2f" },
            },
            sx: {
              "& .MuiOutlinedInput-root fieldset": {
                borderColor: departureDate ? "defaultColor" : "#d32f2f",
              },
              "& .MuiInputLabel-root": {
                color: departureDate ? "defaultColor" : "#d32f2f",
              },
            },
          },
        }}
        minDate={tomorrow}
      />
      <DatePicker
        label="Arrival Date"
        name="returnDate"
        // defaultValue={tomorrow}
        views={["year", "month", "day"]}
        onError={(newError) => setErrorArrivalDate(newError)}
        slotProps={{
          textField: {
            helperText: errorArrivalDateMessage,
          },
        }}
        minDate={handleSetMinArrDate(departureDate)}
      />
      <TextField
        type="number"
        required
        label="Adults"
        name="adults"
        slotProps={{
          htmlInput: {
            min: 1,
          },
        }}
        onInput={(e) => {
          const target = e.target as HTMLInputElement; // Cast to HTMLInputElement
          if (target.value && parseInt(target.value) < 1) {
            target.setCustomValidity("There must be at least one adult");
          } else {
            target.setCustomValidity("");
          }
        }}
      />
      <FormControl>
        <InputLabel id="currency-select-label">Currency</InputLabel>
        <Select
          required
          labelId="currency-select-label"
          id="currency-select"
          label="Currency"
          name="currencyCode"
          defaultValue={currencyItems[0]}
          value={currency}
          onChange={handleSelectChange}
        >
          {currencyItems.map((currencyItem: string) => {
            const idStr: string = `currency-item-${currencyItem}`;
            return (
              <MenuItem id={idStr} key={idStr} value={currencyItem}>
                {currencyItem}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <FormControlLabel
        control={
          <Checkbox
            name="nonStop"
            checked={checkedNonStop}
            onChange={handleCheckChange}
            inputProps={{ "aria-label": "controlled" }}
          />
        }
        label={"Direct Flight"}
      />
      <Button type="submit" variant="contained">
        Submit
      </Button>
    </Box>
  );
};
