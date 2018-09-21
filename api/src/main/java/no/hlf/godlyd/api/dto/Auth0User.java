package no.hlf.godlyd.api.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Auth0User {

    @JsonProperty("user_id")
    private String userId;

    @JsonProperty("given_name")
    private String givenName;

    @JsonProperty("family_name")
    private String familyName;

    @JsonProperty("picture")
    private String picture;

    public String getUserId() {
        return userId;
    }

    public String getGivenName() {
        return givenName;
    }

    public String getFamilyName() {
        return familyName;
    }

    public String getPicture() {
        return picture;
    }
}
