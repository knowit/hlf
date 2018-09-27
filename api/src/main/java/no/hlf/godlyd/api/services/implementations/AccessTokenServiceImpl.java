package no.hlf.godlyd.api.services.implementations;

import com.auth0.jwt.JWT;
import com.auth0.jwt.exceptions.JWTDecodeException;
import com.auth0.jwt.interfaces.DecodedJWT;
import no.hlf.godlyd.api.model.AccessToken;
import no.hlf.godlyd.api.model.Bruker;
import no.hlf.godlyd.api.repository.AccessTokenRepo;
import no.hlf.godlyd.api.services.AccessTokenService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AccessTokenServiceImpl implements AccessTokenService {

    @Autowired
    private AccessTokenRepo accessTokenRepo;

    private static final Logger logger = LoggerFactory.getLogger(AccessTokenServiceImpl.class);

    public Optional<Bruker> findBrukerByAccessToken(String token) {
        Optional<AccessToken> accessToken = accessTokenRepo.findFirstByToken(token);
        return accessToken.map(AccessToken::getBruker);
    }

    public AccessToken save(Bruker bruker, String authorization) throws JWTDecodeException {
        DecodedJWT jwt = JWT.decode(authorization);
        AccessToken token = new AccessToken();
        token.setToken(jwt.getToken());
        token.setExpiresAt(jwt.getExpiresAt());
        token.setTokenType(jwt.getType());
        token.setBruker(bruker);
        return accessTokenRepo.save(token);
    }

    @Override
    public void deleteAccessToken(String authorization) {
        Optional<AccessToken> accessToken = accessTokenRepo.findFirstByToken(retrieveAccessToken(authorization));
        if (! accessToken.isPresent()) return;

        logger.info("after access token");

        Bruker bruker = accessToken.get().getBruker();
        bruker.getAccessTokens().remove(accessToken.get());
        accessToken.get().setBruker(null);
        accessTokenRepo.delete(accessToken.get());
    }

    /**
     * Assumes authorization is a Bearer token. 'Bearer xxx-yyy-zzz"
     */
    private String retrieveAccessToken(String authorization) {
        return authorization.substring(7);
    }
}
