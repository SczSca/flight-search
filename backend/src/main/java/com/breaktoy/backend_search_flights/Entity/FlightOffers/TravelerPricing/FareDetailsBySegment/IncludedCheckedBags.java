package com.breaktoy.backend_search_flights.Entity.FlightOffers.TravelerPricing.FareDetailsBySegment;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;

@JsonIgnoreProperties(ignoreUnknown = true)
@Setter
@Getter
public class IncludedCheckedBags {
    private Integer quantity;
}
