package com.breaktoy.backend_search_flights.Entity.FlightOffers.FOPrice;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;

@JsonIgnoreProperties(ignoreUnknown = true)
@Setter
@Getter
public class Fees {
  private String amount;
  private String type;
}
