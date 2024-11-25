package com.breaktoy.backend_search_flights.Entity;

import lombok.Builder;
import lombok.Getter;

import java.util.HashMap;

@Builder
@Getter
public class Flight {
    private String IATACode;
    private String airportName;
    private HashMap<String, HashMap> destination;
}
