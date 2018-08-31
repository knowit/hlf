package no.hlf.godlyd.api.services.implementations;

import no.hlf.godlyd.api.exception.ResourceNotFoundException;
import no.hlf.godlyd.api.model.Bruker;
import no.hlf.godlyd.api.repository.BrukerRepo;
import no.hlf.godlyd.api.security.Auth0Connection;
import no.hlf.godlyd.api.services.BrukerService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Hashtable;
import java.util.List;

@Service
public class BrukerServiceImpl implements BrukerService {

    @Autowired
    BrukerRepo brukerRepo;

    @Autowired
    Auth0Connection con;

    private static final Logger logger = LoggerFactory.getLogger(BrukerServiceImpl.class);

    public Bruker getBrukerFromId(Integer id){
        return brukerRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Bruker", "id", id));
    }

    public Bruker getBrukerFromAuth0UserId(String auth0UserId){
        logger.info("auth0UserId: " + auth0UserId);
        Bruker bruker = brukerRepo.findByAuth0UserId(auth0UserId);
        if (bruker != null){
            return bruker;
        } else {
            logger.info("Inside getBrukerFromAuth0UserId - did not find user");
            throw new ResourceNotFoundException("Bruker", "auth0UserId", auth0UserId);
        }
    }

    public Bruker updateBruker(String authorization){
        logger.info("inside updateBruker");
        Bruker bruker = getCredentials(authorization);
        Bruker b;
        try{
            b = getBrukerFromAuth0UserId(bruker.getAuth0UserId());
        } catch(ResourceNotFoundException e){
            logger.info("inside updateBruker - catched exception: " + e.getMessage());
            b = new Bruker();
            b.setAuth0UserId(bruker.getAuth0UserId());
        }
        b.setFornavn(bruker.getFornavn());
        b.setEtternavn(bruker.getEtternavn());
        b.setImageUrl(bruker.getImageUrl());
        brukerRepo.save(b);
        logger.info("inside updateBruker returning bruker: " + b.toString());
        return b;
    }

    public List<Bruker> getAllBrukere(){
        return brukerRepo.findAll();
    }

    private Bruker getCredentials(String authorization) {
        Bruker bruker = new Bruker();
        Hashtable<String, Object> userInfo = con.getUserProfile(authorization);
        bruker.setAuth0UserId(userInfo.get("user_id").toString());
        bruker.setFornavn(userInfo.get("given_name").toString());
        bruker.setEtternavn(userInfo.get("family_name").toString());
        String image = userInfo.get("picture").toString().replaceFirst("https//", "https://");
        bruker.setImageUrl(image);
        return bruker;
    }

}
