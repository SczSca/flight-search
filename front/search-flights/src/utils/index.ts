import { IATAItem } from "../types";

export const currencyItems: string[] = ["USD", "MXN", "EUR"];

//comment and or remove when endpoints restablish
export const IATAItems: IATAItem[] = [
  {
    name: "BENITO JUAREZ INTL",
    iataCode: "MEX",
    detailedName: "MEXICO CITY/MX:BENITO JUAREZ I",
  },
  {
    name: "INTERNATIONAL",
    iataCode: "CUN",
    detailedName: "CANCUN/MX:INTERNATIONAL",
  },
  {
    name: "MALPENSA",
    iataCode: "MXP",
    detailedName: "MILAN/IT:MALPENSA",
  },
  {
    name: "MIGUEL HIDALGO INTL",
    iataCode: "GDL",
    detailedName: "GUADALAJARA/MX:MIGUEL HIDALGO",
  },
  {
    name: "MARIANO ESCOBEDO INTL",
    iataCode: "MTY",
    detailedName: "MONTERREY/MX:MARIANO ESCOBEDO",
  },
  {
    name: "A.L. RODRIGUEZ INTL",
    iataCode: "TIJ",
    detailedName: "TIJUANA/MX:A.L. RODRIGUEZ INTL",
  },
  {
    name: "G.DIAZ ORDAZ INTL",
    iataCode: "PVR",
    detailedName: "PUERTO VALLARTA/MX:G.DIAZ ORDA",
  },
  {
    name: "LOS CABOS INTL",
    iataCode: "SJD",
    detailedName: "SAN JOSE DEL CABO/MX:LOS CABOS",
  },
  {
    name: "I.PESQUEIRA GARCIA",
    iataCode: "HMO",
    detailedName: "HERMOSILLO/MX:I.PESQUEIRA GARC",
  },
  {
    name: "M. CRESCENCIO REJON",
    iataCode: "MID",
    detailedName: "MERIDA/MX:M. CRESCENCIO REJON",
  },
];

export const IATAOptions: string[] = [
  "MEXICO CITY/MX:BENITO JUAREZ I",
  "CANCUN/MX:INTERNATIONAL",
  "MILAN/IT:MALPENSA",
  "GUADALAJARA/MX:MIGUEL HIDALGO",
  "MONTERREY/MX:MARIANO ESCOBEDO",
  "TIJUANA/MX:A.L. RODRIGUEZ INTL",
  "PUERTO VALLARTA/MX:G.DIAZ ORDA",
  "SAN JOSE DEL CABO/MX:LOS CABOS",
  "HERMOSILLO/MX:I.PESQUEIRA GARC",
  "MERIDA/MX:M. CRESCENCIO REJON",
];
