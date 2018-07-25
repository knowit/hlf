package no.hlf.godlyd.api.services.implementations;

import no.hlf.godlyd.api.exception.ResourceNotFoundException;
import no.hlf.godlyd.api.model.Bruker;
import no.hlf.godlyd.api.repository.BrukerRepo;
import no.hlf.godlyd.api.security.Auth0Connection;
import no.hlf.godlyd.api.services.BrukerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Hashtable;
import java.util.List;

@Service
public class BrukerServiceImpl implements BrukerService {

    @Autowired
    BrukerRepo brukerRepo;

    public Bruker getBrukerFromId(Integer id){
        return brukerRepo.findBrukerById(id);
    }

    public Bruker getBrukerFromAuth0UserId(String auth0UserId){
        return brukerRepo.findByAuth0UserId(auth0UserId);
    }
    public Bruker updateBruker(String authorization){
        Bruker bruker = getCredentials(authorization);
        Bruker b = getBrukerFromAuth0UserId(bruker.getAuth0UserId());
        if(b == null){
            throw new ResourceNotFoundException("Bruker", "authorization", authorization);
        }
        b.setAuth0UserId(bruker.getAuth0UserId());
        b.setFornavn(bruker.getFornavn());
        b.setEtternavn(bruker.getEtternavn());
        b.setImageUrl(bruker.getImageUrl());
        brukerRepo.save(b);
        return b;
    }

    public List<Bruker> getAllBrukere(){
        return brukerRepo.findAll();
    }

    private Bruker getCredentials(String authorization){
        try{
            Bruker bruker = new Bruker();
            Auth0Connection con = new Auth0Connection();
            Hashtable<String, Object> userInfo = con.getUserProfile(authorization);
            bruker.setAuth0UserId(userInfo.get("user_id").toString());
            bruker.setFornavn(userInfo.get("given_name").toString());
            bruker.setEtternavn(userInfo.get("family_name").toString());
            bruker.setImageUrl(userInfo.get("picture").toString());
            return bruker;

        }
        catch (Exception e){

        }
        return null;
    }

}
