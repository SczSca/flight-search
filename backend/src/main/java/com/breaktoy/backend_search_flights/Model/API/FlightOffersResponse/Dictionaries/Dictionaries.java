package com.breaktoy.backend_search_flights.Model.API.FlightOffersResponse.Dictionaries;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;

import java.util.HashMap;

@JsonIgnoreProperties(ignoreUnknown = true)
@Setter
@Getter
public class Dictionaries {
    private HashMap<String, Location> locations;
    private HashMap<String, String> aircraft;
    private HashMap<String, String> carriers;
}
