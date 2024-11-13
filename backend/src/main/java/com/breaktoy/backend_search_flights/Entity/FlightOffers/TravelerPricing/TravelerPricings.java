package com.breaktoy.backend_search_flights.Entity.FlightOffers.TravelerPricing;

import com.breaktoy.backend_search_flights.Entity.FlightOffers.TravelerPricing.FareDetailsBySegment.FareDetailsBySegment;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
@Setter
@Getter
public class TravelerPricings {
    private String travelerId;
    private String travelerType;
    private TPPrice price;
    private List<FareDetailsBySegment> fareDetailsBySegment;

}
