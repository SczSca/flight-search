package com.breaktoy.backend_search_flights.Entity.FlightOffers;

import com.breaktoy.backend_search_flights.Entity.FlightOffers.FOPrice.FOPrice;
import com.breaktoy.backend_search_flights.Entity.FlightOffers.Itineraries.Itineraries;
import com.breaktoy.backend_search_flights.Entity.FlightOffers.TravelerPricing.TravelerPricings;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
@Setter
@Getter
public class FlightOffers {
    private String id;
    private Boolean oneWay;
    private Integer numberOfBookableSeats;
    private List<Itineraries> itineraries;
    private FOPrice price;
    private List<TravelerPricings> travelerPricings;
    
}
