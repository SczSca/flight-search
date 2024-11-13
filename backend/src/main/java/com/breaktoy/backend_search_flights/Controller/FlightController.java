package com.breaktoy.backend_search_flights.Controller;

import com.breaktoy.backend_search_flights.Entity.IATAItem;
import com.breaktoy.backend_search_flights.Model.AccessTokenResponse;
import com.breaktoy.backend_search_flights.Service.FlightService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class FlightController {
    private final FlightService flightService;

    @GetMapping("/info/IATA")
    public ResponseEntity<List<IATAItem>> getIATARecommendations(
        @RequestParam(value = "keyword", required = true) String keyword
    ){
        return flightService.getIATAsRecommendations(keyword);
    }

}
