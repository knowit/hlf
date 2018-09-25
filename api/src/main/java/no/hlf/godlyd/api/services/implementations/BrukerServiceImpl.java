package no.hlf.godlyd.api.services.implementations;

import com.auth0.jwt.exceptions.JWTDecodeException;
import no.hlf.godlyd.api.dto.Auth0User;
import no.hlf.godlyd.api.exception.ResourceNotFoundException;
import no.hlf.godlyd.api.model.AccessToken;
import no.hlf.godlyd.api.model.Bruker;
import no.hlf.godlyd.api.repository.BrukerRepo;
import no.hlf.godlyd.api.services.AccessTokenService;
import no.hlf.godlyd.api.services.Auth0Client;
import no.hlf.godlyd.api.services.BrukerService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BrukerServiceImpl implements BrukerService {

    @Autowired
    BrukerRepo brukerRepo;

    @Autowired
    Auth0Client auth0Service;

    @Autowired
    AccessTokenService accessTokenService;

    private static final Logger logger = LoggerFactory.getLogger(BrukerServiceImpl.class);

    public Bruker getBrukerFromId(Integer id){
        return brukerRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Bruker", "id", id));
    }

    public Optional<Bruker> getBrukerFromAuth0UserId(String auth0UserId){
        return brukerRepo.findByAuth0UserId(auth0UserId);
    }

    public Bruker updateBruker(String authorization){
        return getBrukerFromAuth0(authorization);
    }

    public List<Bruker> getAllBrukere(){
        return brukerRepo.findAll();
    }

    public Bruker getBrukerFromAuthToken(String authorization) {
        logger.info("FETCHING BRUKER...");
        String accessToken = retrieveAccessToken(authorization);
        // Find user from cached authorization orElse fetch user information from auth0
        Optional<Bruker> optionalBruker = accessTokenService.findBrukerByAccessToken(accessToken);
        return optionalBruker.orElseGet(() -> getBrukerFromAuth0(accessToken));
    }

    private Bruker getBrukerFromAuth0(String accessToken) {
        logger.info("FETCHING BRUKER FROM AUTH0");
        Auth0User auth0User = auth0Service.getUserProfile(accessToken);
        Optional<Bruker> optionalBruker = getBrukerFromAuth0UserId(auth0User.getUserId());
        Bruker bruker = optionalBruker.orElseGet(Bruker::new);
        bruker.setFornavn(auth0User.getGivenName());
        bruker.setEtternavn(auth0User.getFamilyName());
        bruker.setImageUrl(auth0User.getPicture());
        bruker.setAuth0UserId(auth0User.getUserId());
        bruker = brukerRepo.save(bruker);

        try {
            accessTokenService.setToken(bruker, accessToken);
        } catch(JWTDecodeException e) {
            logger.info("catched JWTDecodedException: " + e.getMessage());
        }

        return bruker;
    }

    /**
     * Assumes authorization is a Bearer token. 'Bearer xxx-yyy-zzz"
     */
    private String retrieveAccessToken(String authorization) {
        return authorization.substring(7);
    }



}
