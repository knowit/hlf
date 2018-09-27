package no.hlf.godlyd.api.services;

import no.hlf.godlyd.api.model.AccessToken;
import no.hlf.godlyd.api.model.Bruker;

import java.util.Optional;

public interface AccessTokenService {
    Optional<Bruker> findBrukerByAccessToken(String token);
    AccessToken save(Bruker bruker, String authorization);
    void deleteAccessToken(String authorization);
}
