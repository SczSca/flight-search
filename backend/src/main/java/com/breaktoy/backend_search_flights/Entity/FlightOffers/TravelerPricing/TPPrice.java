package com.breaktoy.backend_search_flights.Entity.FlightOffers.TravelerPricing;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;

@JsonIgnoreProperties(ignoreUnknown = true)
@Setter
@Getter
public class TPPrice {
    private String currency;
    private String total;
    private String base;
}
