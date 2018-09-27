package no.hlf.godlyd.api.services.implementations;

import com.auth0.jwt.JWT;
import com.auth0.jwt.interfaces.DecodedJWT;
import no.hlf.godlyd.api.dto.Auth0Response;
import no.hlf.godlyd.api.dto.Auth0User;
import no.hlf.godlyd.api.model.ManagementApiToken;
import no.hlf.godlyd.api.services.Auth0Client;
import no.hlf.godlyd.api.services.ManagementApiTokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Service
public class Auth0ClientImpl implements Auth0Client {

    @Value(value="${com.auth0.issuer}")
    private String issuer;

    @Value("${com.auth0.management.clientId}")
    private String managementClientId;

    @Value("${com.auth0.management.clientSecret}")
    private String managementClientSecret;

    @Value("${com.auth0.management.apiAudience}")
    private String managementAudience;

    @Value("${com.auth0.tokenUrl}")
    private String tokenUrl;

    @Autowired
    private ManagementApiTokenService managementTokenService;

    /**
     *
     * @param accessToken Header from the user accessing the API. 'xxx-yyy-zzz'
     * @return Auth0User
     */
    public Auth0User getUserProfile(String accessToken) {

        // Todo: Check that JWT has not expired

        DecodedJWT jwt = JWT.decode(accessToken);
        String auth0UserId = jwt.getSubject();

        String resourceUrl = managementAudience +  "users/" + auth0UserId;
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        ManagementApiToken managementApiToken = managementTokenService
                .getLatestValidToken().orElseGet(() -> managementTokenService.setToken(getManagementAPIToken()));

        headers.set("Authorization", "Bearer " + managementApiToken.getAccessToken());
        HttpEntity<String> http = new HttpEntity<>(headers);
        ResponseEntity<Auth0User> response = restTemplate.exchange(resourceUrl, HttpMethod.GET, http, Auth0User.class);

        // Todo check that response.getBody is not null

        return response.getBody();
    }

    public boolean deleteMyAccount(String auth0UserId) {

        String resourceUrl = managementAudience + "users/" + auth0UserId;
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        ManagementApiToken managementApiToken = managementTokenService
                .getLatestValidToken().orElseGet(() -> managementTokenService.setToken(getManagementAPIToken()));

        headers.set("Authorization", "Bearer " + managementApiToken.getAccessToken());
        HttpEntity<String> http = new HttpEntity<>(headers);
        ResponseEntity<String> response = restTemplate.exchange(resourceUrl, HttpMethod.DELETE, http, String.class);
        return response.getStatusCode().value() == 204;
    }

    /**
     *
     * Retrieves the access token of the management api
     *
     * @return String management access token
     * @throws RuntimeException If no access token could be retrieved
     */
    private ManagementApiToken getManagementAPIToken() {

        RestTemplate restTemplate = new RestTemplate();

        String resourceUrl = tokenUrl;

        HttpHeaders headers = new HttpHeaders();
        headers.set("Content-Type", "application/json");

        Map<String, String> body = new HashMap<>();
        body.put("client_id", managementClientId);
        body.put("client_secret", managementClientSecret);
        body.put("audience", managementAudience);
        body.put("grant_type", "client_credentials");

        HttpEntity<Object> http = new HttpEntity<>(body, headers);
        ResponseEntity<Auth0Response> response = restTemplate.exchange(resourceUrl, HttpMethod.POST, http, Auth0Response.class);

        if(response.getBody() != null) {
            Auth0Response auth0Response = response.getBody();
            ManagementApiToken managementApiToken = new ManagementApiToken();
            managementApiToken.setAccessToken(auth0Response.getAccessToken());
            managementApiToken.setScope(auth0Response.getScope());
            managementApiToken.setTokenType(auth0Response.getTokenType());
            managementApiToken.setExpiresAt((System.currentTimeMillis() / 1000) + auth0Response.getExpiresIn());
            return managementApiToken;
        }

        throw new RuntimeException("Could not fetch access token from authorization server.");
    }

}
