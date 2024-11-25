package com.breaktoy.backend_search_flights.Model.API;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class AccessTokenResponse {
    private String type;
    private String username;
    private String application_name;
    private String client_id;
    private String token_type;
    private String access_token;
    private int expires_in;
    private String state;
    private String scope;
}
