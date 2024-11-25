package com.breaktoy.backend_search_flights.Model.API;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.breaktoy.backend_search_flights.Entity.IATAItem;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
@Getter
@RequiredArgsConstructor
public class IATAResponse {
    @JsonProperty("data")
    private List<IATAItem> data;


}
