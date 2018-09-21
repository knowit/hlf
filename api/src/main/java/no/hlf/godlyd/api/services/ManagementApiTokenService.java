package no.hlf.godlyd.api.services;

import no.hlf.godlyd.api.model.ManagementApiToken;

import java.util.Optional;

public interface ManagementApiTokenService {
    Optional<ManagementApiToken> getLatestValidToken();
    ManagementApiToken setToken(ManagementApiToken token);
}
