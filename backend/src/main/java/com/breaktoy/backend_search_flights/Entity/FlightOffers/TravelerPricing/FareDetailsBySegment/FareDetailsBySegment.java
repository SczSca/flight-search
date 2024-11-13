package com.breaktoy.backend_search_flights.Entity.FlightOffers.TravelerPricing.FareDetailsBySegment;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
@Setter
@Getter
public class FareDetailsBySegment {
    private String segmentId;
    private String cabin;
    @JsonProperty("class")
    private String FDClass;
    private IncludedCheckedBags includedCheckedBags;
    private List<Amenities> amenities;
}
