import { createContext, useMemo, useState } from "react";
import { ComponentWithChildren, FlightSearchRequest, IATAItem } from "../types";
import { SelectChangeEvent } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { DateValidationError } from "@mui/x-date-pickers";
import { currencyItems } from "../utils";
import { useDebounce } from "../hooks/useDebounce";

interface searchFlightContextI {
  handleDepartureIATAChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  handleArrivalIATAChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleCheckChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleDPDepartureChange: (newValue: Dayjs | null) => void;
  handleSetMinArrDate: (departureDate: Dayjs | null) => Dayjs | undefined;
  handleSelectChange: (event: SelectChangeEvent) => void;
  setArrivalIATAItems: React.Dispatch<React.SetStateAction<IATAItem[]>>;
  setArrivalIATAOptions: React.Dispatch<React.SetStateAction<string[]>>;
  setArrivalIATAStr: React.Dispatch<React.SetStateAction<string>>;
  setDepartureIATAItems: React.Dispatch<React.SetStateAction<IATAItem[]>>;
  setDepartureIATAOptions: React.Dispatch<React.SetStateAction<string[]>>;
  setDepartureIATAStr: React.Dispatch<React.SetStateAction<string>>;
  setErrorArrivalDate: React.Dispatch<
    React.SetStateAction<DateValidationError | null>
  >;
  setErrorDepartureDate: React.Dispatch<
    React.SetStateAction<DateValidationError | null>
  >;
  arrivalIATAItems: IATAItem[];
  arrivalIATAOptions: string[];
  arrivalIATAStr: string;
  debouncedIATADepartureReq: string;
  debouncedIATAArrivalReq: string;
  departureDate: Dayjs | null;
  departureIATAItems: IATAItem[];
  departureIATAOptions: string[];
  departureIATAStr: string;
  checkedNonStop: boolean;
  currency: string;
  errorDepartureDateMessage: string;
  errorArrivalDateMessage: string;
  tomorrow: dayjs.Dayjs;
}

export const searchFlightContext = createContext<searchFlightContextI>(null!);
searchFlightContext.displayName = "searchFlightProvider";

export const SearchFlightProvider = ({ children }: ComponentWithChildren) => {
  const tomorrow = dayjs().add(1, "day");

  const [departureDate, setDepartureDate] = useState<Dayjs | null>(tomorrow);

  const [checkedNonStop, setCheckedNonStop] = useState<boolean>(true);
  const [currency, setCurrency] = useState<string>(currencyItems[0]);

  const [departureIATAStr, setDepartureIATAStr] = useState<string>("");
  //use of debounceHook to request IATA recommendations based on the content of departure airport input
  const debouncedIATADepartureReq = useDebounce(departureIATAStr, 2000);

  const [arrivalIATAStr, setArrivalIATAStr] = useState<string>("");
  //use of debounceHook to request IATA recommendations based on the content of arrival airport input
  const debouncedIATAArrivalReq = useDebounce(arrivalIATAStr, 2000);

  const [arrivalIATAOptions, setArrivalIATAOptions] = useState<string[]>([]);
  const [departureIATAOptions, setDepartureIATAOptions] = useState<string[]>(
    []
  );
  const [arrivalIATAItems, setArrivalIATAItems] = useState<IATAItem[]>([]);
  const [departureIATAItems, setDepartureIATAItems] = useState<IATAItem[]>([]);

  const [errorArrivalDate, setErrorArrivalDate] =
    useState<DateValidationError | null>(null);

  const [errorDepartureDate, setErrorDepartureDate] =
    useState<DateValidationError | null>(null);

  const errorArrivalDateMessage = useMemo(() => {
    switch (errorArrivalDate) {
      case "maxDate":
      case "minDate": {
        return "Please select a date that is after the departure date";
      }

      case "invalidDate": {
        return "Your date is not valid";
      }

      default: {
        return "Arrival Date is optional";
      }
    }
  }, [errorArrivalDate]);

  const errorDepartureDateMessage = useMemo(() => {
    if (departureDate == null) {
      return "You must pick a departure date!";
    }
    switch (errorDepartureDate) {
      case "maxDate":
      case "minDate": {
        return "Please pick a date that is beyond today.";
      }

      case "invalidDate": {
        return "Your date is not valid";
      }

      default: {
        return "";
      }
    }
  }, [errorDepartureDate]);

  const handleArrivalIATAChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setArrivalIATAStr(event.target.value);
  };

  const handleCheckChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedNonStop(event.target.checked);
    // if (!checkedNonStop) {
    //   setLabelValue(labelValues[0]);
    // } else {
    //   setLabelValue(labelValues[1]);
    // }
  };
  const handleDepartureIATAChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDepartureIATAStr(event.target.value);
  };

  const handleDPDepartureChange = (newValue: Dayjs | null) => {
    setDepartureDate(newValue);
    console.log(newValue);
    // setDepartureDate(event.target.value);
    // console.log(event.target.value);
  };

  const handleSelectChange = (event: SelectChangeEvent) => {
    setCurrency(event.target.value as string);
  };

  const handleSetMinArrDate = (
    departureDate: Dayjs | null
  ): Dayjs | undefined => {
    if (departureDate == null) {
      return undefined;
    } else {
      return departureDate;
    }
  };

  return (
    <searchFlightContext.Provider
      value={{
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
        arrivalIATAItems,
        arrivalIATAOptions,
        arrivalIATAStr,
        debouncedIATAArrivalReq,
        debouncedIATADepartureReq,
        departureDate,
        departureIATAItems,
        departureIATAOptions,
        departureIATAStr,
        checkedNonStop,
        currency,
        errorArrivalDateMessage,
        errorDepartureDateMessage,
        tomorrow,
      }}
    >
      {children}
    </searchFlightContext.Provider>
  );
};
