import { createContext, useMemo, useState } from "react";
import {
  ComponentWithChildren,
  FlightOffersResponse,
  FlightResultStates,
  FlightSearchRequest,
  IATAItem,
  Location,
} from "../types";
import { SelectChangeEvent } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { DateValidationError } from "@mui/x-date-pickers";
import { currencyItems, flightResultsStates } from "../utils";
import { useDebounce } from "../hooks/useDebounce";
import { blankLocations } from "../utils/blankValues";

interface searchFlightContextI {
  getLocalStorageWithExpiry: (
    key: string
  ) => FlightOffersResponse | FlightSearchRequest | null;
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

  setFlightResultsState: React.Dispatch<
    React.SetStateAction<FlightResultStates>
  >;
  setLocalStorageWithExpiry: (
    key: string,
    value: FlightOffersResponse | FlightSearchRequest
  ) => void;
  setLocations: React.Dispatch<React.SetStateAction<Record<string, Location>>>;
  arrivalIATAItems: IATAItem[];
  arrivalIATAOptions: string[];
  arrivalIATAStr: string;
  checkedNonStop: boolean;
  currency: string;
  debouncedIATADepartureReq: string;
  debouncedIATAArrivalReq: string;
  departureDate: Dayjs | null;
  departureIATAItems: IATAItem[];
  departureIATAOptions: string[];
  departureIATAStr: string;
  errorDepartureDateMessage: string;
  errorArrivalDateMessage: string;
  flightResultsState: FlightResultStates;
  locations: Record<string, Location>;
  tomorrow: dayjs.Dayjs;
}

export const searchFlightContext = createContext<searchFlightContextI>(null!);
searchFlightContext.displayName = "searchFlightProvider";

export const SearchFlightProvider = ({ children }: ComponentWithChildren) => {
  /** States for Search Form */
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

  const [flightResultsState, setFlightResultsState] =
    useState<FlightResultStates>(flightResultsStates);

  const [locations, setLocations] =
    useState<Record<string, Location>>(blankLocations);

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
  };
  const handleDepartureIATAChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDepartureIATAStr(event.target.value);
  };

  const handleDPDepartureChange = (newValue: Dayjs | null) => {
    setDepartureDate(newValue);
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

  const setLocalStorageWithExpiry = (
    key: string,
    value: FlightOffersResponse | FlightSearchRequest
  ) => {
    //30 * 60 * 1000 is 30 mins
    const expirationTime: number = 30 * 60 * 1000;
    const now = new Date();
    const item = {
      value,
      expiry: now.getTime() + expirationTime, // current time + time-to-live (in ms)
    };
    localStorage.setItem(key, JSON.stringify(item));
  };

  const getLocalStorageWithExpiry = (
    key: string
  ): FlightOffersResponse | FlightSearchRequest | null => {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) {
      return null;
    }

    const item = JSON.parse(itemStr);
    const now = new Date();

    // If the expiry time has passed, remove the item and return null
    if (now.getTime() > item.expiry) {
      localStorage.removeItem(key);
      return null;
    }

    return item.value as FlightOffersResponse | FlightSearchRequest;
  };

  return (
    <searchFlightContext.Provider
      value={{
        getLocalStorageWithExpiry,
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
        flightResultsState,
        locations,
        tomorrow,
      }}
    >
      {children}
    </searchFlightContext.Provider>
  );
};
