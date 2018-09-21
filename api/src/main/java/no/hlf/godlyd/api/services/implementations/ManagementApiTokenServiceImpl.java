package no.hlf.godlyd.api.services.implementations;

import no.hlf.godlyd.api.model.ManagementApiToken;
import no.hlf.godlyd.api.repository.ManagementApiTokenRepo;
import no.hlf.godlyd.api.services.ManagementApiTokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ManagementApiTokenServiceImpl implements ManagementApiTokenService {

    @Autowired
    private ManagementApiTokenRepo managementApiTokenRepo;

    public Optional<ManagementApiToken> getLatestValidToken() {
        long currentTimestamp = System.currentTimeMillis() / 1000;
        return managementApiTokenRepo.findFirstByExpiresAtGreaterThanEqual(currentTimestamp);
    }

    public ManagementApiToken setToken(ManagementApiToken token) {
        return managementApiTokenRepo.save(token);
    }
}
