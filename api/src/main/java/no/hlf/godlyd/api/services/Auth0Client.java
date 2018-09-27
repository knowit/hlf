package no.hlf.godlyd.api.services;

import no.hlf.godlyd.api.dto.Auth0User;

public interface Auth0Client {
    Auth0User getUserProfile(String authorization);
    boolean deleteMyAccount(String auth0Id);
}
