package com.breaktoy.backend_search_flights.Entity.FlightOffers.FOPrice;

import com.breaktoy.backend_search_flights.Entity.FlightOffers.TravelerPricing.TPPrice;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
@Setter
@Getter
public class FOPrice extends TPPrice {
    private List<Fees> fees;
    private String grandTotal;
}
