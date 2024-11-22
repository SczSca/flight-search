export const responseDummy = {
  dictionaries: {
    locations: {
      DMK: {
        cityCode: "BKK",
        countryCode: "TH",
        airportName: "BANGKOK/TH:DON MUEANG INTL",
      },
      BKK: {
        cityCode: "BKK",
        countryCode: "TH",
        airportName: "BANGKOK/TH:SUVARNABHUMI INTL",
      },
      DPS: {
        cityCode: "DPS",
        countryCode: "ID",
        airportName: null,
      },
      XMN: {
        cityCode: "XMN",
        countryCode: "CN",
        airportName: "XIAMEN/CN:GAOQI INTL",
      },
      SYD: {
        cityCode: "SYD",
        countryCode: "AU",
        airportName: null,
      },
    },
    aircraft: {},
    carriers: {},
  },
  data: [
    {
      id: "1",
      oneWay: false,
      numberOfBookableSeats: 9,
      itineraries: [
        {
          duration: "PT14H30M",
          segments: [
            {
              departure: {
                iataCode: "SYD",
                terminal: "0",
                at: "2024-11-22T07:15:00",
              },
              arrival: {
                iataCode: "DPS",
                terminal: "0",
                at: "2024-11-22T10:45:00",
              },
              carrierCode: "OD",
              airlineName: "BATIK AIR MALAYSIA",
              number: "172",
              aircraft: {
                code: "738",
                name: "BOEING 737-800",
              },
              operating: {
                carrierCode: "OD",
                airlineName: "BATIK AIR MALAYSIA",
              },
              duration: "PT6H30M",
              layoverTime: null,
              id: "3",
            },
            {
              departure: {
                iataCode: "DPS",
                terminal: "D",
                at: "2024-11-22T14:15:00",
              },
              arrival: {
                iataCode: "DMK",
                terminal: "0",
                at: "2024-11-22T17:45:00",
              },
              carrierCode: "ID",
              airlineName: "BATIK AIR INDONESIA",
              number: "7637",
              aircraft: {
                code: "738",
                name: "BOEING 737-800",
              },
              operating: {
                carrierCode: "ID",
                airlineName: "BATIK AIR INDONESIA",
              },
              duration: "PT4H30M",
              layoverTime: "P0DT3H30M",
              id: "4",
            },
          ],
        },
        {
          duration: "PT12H25M",
          segments: [
            {
              departure: {
                iataCode: "DMK",
                terminal: "1",
                at: "2024-11-25T13:50:00",
              },
              arrival: {
                iataCode: "DPS",
                terminal: "D",
                at: "2024-11-25T19:05:00",
              },
              carrierCode: "ID",
              airlineName: "BATIK AIR INDONESIA",
              number: "7636",
              aircraft: {
                code: "738",
                name: "BOEING 737-800",
              },
              operating: {
                carrierCode: "ID",
                airlineName: "BATIK AIR INDONESIA",
              },
              duration: "PT4H15M",
              layoverTime: null,
              id: "5",
            },
            {
              departure: {
                iataCode: "DPS",
                terminal: "0",
                at: "2024-11-25T21:10:00",
              },
              arrival: {
                iataCode: "SYD",
                terminal: "0",
                at: "2024-11-26T06:15:00",
              },
              carrierCode: "OD",
              airlineName: "BATIK AIR MALAYSIA",
              number: "171",
              aircraft: {
                code: "738",
                name: "BOEING 737-800",
              },
              operating: {
                carrierCode: "OD",
                airlineName: "BATIK AIR MALAYSIA",
              },
              duration: "PT6H5M",
              layoverTime: "P0DT2H5M",
              id: "6",
            },
          ],
        },
      ],
      price: {
        currency: "USD",
        total: "889.20",
        base: "600.00",
        fees: [
          {
            amount: "0.00",
            type: "SUPPLIER",
          },
          {
            amount: "0.00",
            type: "TICKETING",
          },
        ],
        grandTotal: "889.20",
      },
      travelerPricings: [
        {
          travelerId: "1",
          travelerType: "ADULT",
          price: {
            currency: "USD",
            total: "444.60",
            base: "300.00",
          },
          fareDetailsBySegment: [
            {
              segmentId: "3",
              cabin: "ECONOMY",
              includedCheckedBags: {
                quantity: null,
                weight: null,
                weightUnit: null,
              },
              amenities: null,
              class: "X",
            },
            {
              segmentId: "4",
              cabin: "ECONOMY",
              includedCheckedBags: {
                quantity: null,
                weight: null,
                weightUnit: null,
              },
              amenities: null,
              class: "X",
            },
            {
              segmentId: "5",
              cabin: "ECONOMY",
              includedCheckedBags: {
                quantity: null,
                weight: null,
                weightUnit: null,
              },
              amenities: null,
              class: "X",
            },
            {
              segmentId: "6",
              cabin: "ECONOMY",
              includedCheckedBags: {
                quantity: null,
                weight: null,
                weightUnit: null,
              },
              amenities: null,
              class: "X",
            },
          ],
        },
        {
          travelerId: "2",
          travelerType: "ADULT",
          price: {
            currency: "USD",
            total: "444.60",
            base: "300.00",
          },
          fareDetailsBySegment: [
            {
              segmentId: "3",
              cabin: "ECONOMY",
              includedCheckedBags: {
                quantity: null,
                weight: null,
                weightUnit: null,
              },
              amenities: null,
              class: "X",
            },
            {
              segmentId: "4",
              cabin: "ECONOMY",
              includedCheckedBags: {
                quantity: null,
                weight: null,
                weightUnit: null,
              },
              amenities: null,
              class: "X",
            },
            {
              segmentId: "5",
              cabin: "ECONOMY",
              includedCheckedBags: {
                quantity: null,
                weight: null,
                weightUnit: null,
              },
              amenities: null,
              class: "X",
            },
            {
              segmentId: "6",
              cabin: "ECONOMY",
              includedCheckedBags: {
                quantity: null,
                weight: null,
                weightUnit: null,
              },
              amenities: null,
              class: "X",
            },
          ],
        },
      ],
    },
    {
      id: "2",
      oneWay: false,
      numberOfBookableSeats: 4,
      itineraries: [
        {
          duration: "PT16H",
          segments: [
            {
              departure: {
                iataCode: "SYD",
                terminal: "1",
                at: "2024-11-22T12:50:00",
              },
              arrival: {
                iataCode: "XMN",
                terminal: "3",
                at: "2024-11-22T18:25:00",
              },
              carrierCode: "MF",
              airlineName: "XIAMEN AIRLINES",
              number: "802",
              aircraft: {
                code: "789",
                name: "BOEING 787-9",
              },
              operating: {
                carrierCode: "MF",
                airlineName: "XIAMEN AIRLINES",
              },
              duration: "PT8H35M",
              layoverTime: null,
              id: "1",
            },
            {
              departure: {
                iataCode: "XMN",
                terminal: "3",
                at: "2024-11-22T22:10:00",
              },
              arrival: {
                iataCode: "BKK",
                terminal: null,
                at: "2024-11-23T00:50:00",
              },
              carrierCode: "MF",
              airlineName: "XIAMEN AIRLINES",
              number: "843",
              aircraft: {
                code: "738",
                name: "BOEING 737-800",
              },
              operating: {
                carrierCode: "MF",
                airlineName: "XIAMEN AIRLINES",
              },
              duration: "PT3H40M",
              layoverTime: "P0DT3H45M",
              id: "2",
            },
          ],
        },
        {
          duration: "PT18H35M",
          segments: [
            {
              departure: {
                iataCode: "BKK",
                terminal: null,
                at: "2024-11-25T12:15:00",
              },
              arrival: {
                iataCode: "XMN",
                terminal: "3",
                at: "2024-11-25T16:20:00",
              },
              carrierCode: "MF",
              airlineName: "XIAMEN AIRLINES",
              number: "854",
              aircraft: {
                code: "738",
                name: "BOEING 737-800",
              },
              operating: {
                carrierCode: "MF",
                airlineName: "XIAMEN AIRLINES",
              },
              duration: "PT3H5M",
              layoverTime: null,
              id: "7",
            },
            {
              departure: {
                iataCode: "XMN",
                terminal: "3",
                at: "2024-11-25T22:30:00",
              },
              arrival: {
                iataCode: "SYD",
                terminal: "1",
                at: "2024-11-26T10:50:00",
              },
              carrierCode: "MF",
              airlineName: "XIAMEN AIRLINES",
              number: "801",
              aircraft: {
                code: "789",
                name: "BOEING 787-9",
              },
              operating: {
                carrierCode: "MF",
                airlineName: "XIAMEN AIRLINES",
              },
              duration: "PT9H20M",
              layoverTime: "P0DT6H10M",
              id: "8",
            },
          ],
        },
      ],
      price: {
        currency: "USD",
        total: "992.80",
        base: "366.00",
        fees: [
          {
            amount: "0.00",
            type: "SUPPLIER",
          },
          {
            amount: "0.00",
            type: "TICKETING",
          },
        ],
        grandTotal: "992.80",
      },
      travelerPricings: [
        {
          travelerId: "1",
          travelerType: "ADULT",
          price: {
            currency: "USD",
            total: "496.40",
            base: "183.00",
          },
          fareDetailsBySegment: [
            {
              segmentId: "1",
              cabin: "ECONOMY",
              includedCheckedBags: {
                quantity: 1,
                weight: null,
                weightUnit: null,
              },
              amenities: [
                {
                  description: "CHECKED BAG 1PC OF 23KG 158CM",
                  isChargeable: false,
                },
                {
                  description: "REFUNDABLE  TICKET",
                  isChargeable: true,
                },
                {
                  description: "CHANGEABLE  TICKET",
                  isChargeable: true,
                },
              ],
              class: "U",
            },
            {
              segmentId: "2",
              cabin: "ECONOMY",
              includedCheckedBags: {
                quantity: 1,
                weight: null,
                weightUnit: null,
              },
              amenities: [
                {
                  description: "CHECKED BAG 1PC OF 23KG 158CM",
                  isChargeable: false,
                },
                {
                  description: "REFUNDABLE  TICKET",
                  isChargeable: true,
                },
                {
                  description: "CHANGEABLE  TICKET",
                  isChargeable: true,
                },
              ],
              class: "S",
            },
            {
              segmentId: "7",
              cabin: "ECONOMY",
              includedCheckedBags: {
                quantity: 1,
                weight: null,
                weightUnit: null,
              },
              amenities: [
                {
                  description: "CHECKED BAG 1PC OF 23KG 158CM",
                  isChargeable: false,
                },
                {
                  description: "REFUNDABLE  TICKET",
                  isChargeable: true,
                },
                {
                  description: "CHANGEABLE  TICKET",
                  isChargeable: true,
                },
              ],
              class: "S",
            },
            {
              segmentId: "8",
              cabin: "ECONOMY",
              includedCheckedBags: {
                quantity: 1,
                weight: null,
                weightUnit: null,
              },
              amenities: [
                {
                  description: "CHECKED BAG 1PC OF 23KG 158CM",
                  isChargeable: false,
                },
                {
                  description: "REFUNDABLE  TICKET",
                  isChargeable: true,
                },
                {
                  description: "CHANGEABLE  TICKET",
                  isChargeable: true,
                },
              ],
              class: "S",
            },
          ],
        },
        {
          travelerId: "2",
          travelerType: "ADULT",
          price: {
            currency: "USD",
            total: "496.40",
            base: "183.00",
          },
          fareDetailsBySegment: [
            {
              segmentId: "1",
              cabin: "ECONOMY",
              includedCheckedBags: {
                quantity: 1,
                weight: null,
                weightUnit: null,
              },
              amenities: [
                {
                  description: "CHECKED BAG 1PC OF 23KG 158CM",
                  isChargeable: false,
                },
                {
                  description: "REFUNDABLE  TICKET",
                  isChargeable: true,
                },
                {
                  description: "CHANGEABLE  TICKET",
                  isChargeable: true,
                },
              ],
              class: "U",
            },
            {
              segmentId: "2",
              cabin: "ECONOMY",
              includedCheckedBags: {
                quantity: 1,
                weight: null,
                weightUnit: null,
              },
              amenities: [
                {
                  description: "CHECKED BAG 1PC OF 23KG 158CM",
                  isChargeable: false,
                },
                {
                  description: "REFUNDABLE  TICKET",
                  isChargeable: true,
                },
                {
                  description: "CHANGEABLE  TICKET",
                  isChargeable: true,
                },
              ],
              class: "S",
            },
            {
              segmentId: "7",
              cabin: "ECONOMY",
              includedCheckedBags: {
                quantity: 1,
                weight: null,
                weightUnit: null,
              },
              amenities: [
                {
                  description: "CHECKED BAG 1PC OF 23KG 158CM",
                  isChargeable: false,
                },
                {
                  description: "REFUNDABLE  TICKET",
                  isChargeable: true,
                },
                {
                  description: "CHANGEABLE  TICKET",
                  isChargeable: true,
                },
              ],
              class: "S",
            },
            {
              segmentId: "8",
              cabin: "ECONOMY",
              includedCheckedBags: {
                quantity: 1,
                weight: null,
                weightUnit: null,
              },
              amenities: [
                {
                  description: "CHECKED BAG 1PC OF 23KG 158CM",
                  isChargeable: false,
                },
                {
                  description: "REFUNDABLE  TICKET",
                  isChargeable: true,
                },
                {
                  description: "CHANGEABLE  TICKET",
                  isChargeable: true,
                },
              ],
              class: "S",
            },
          ],
        },
      ],
    },
  ],
};
