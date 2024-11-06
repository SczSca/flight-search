package com.breaktoy.backend_search_flights.Entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;

@JsonIgnoreProperties(ignoreUnknown = true)
@Setter
@Getter
public class IATAItem {
    private String name;
    private String iataCode;
}
