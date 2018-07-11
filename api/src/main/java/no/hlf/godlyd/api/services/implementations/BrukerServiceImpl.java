package no.hlf.godlyd.api.services.implementations;

import no.hlf.godlyd.api.model.Bruker;
import no.hlf.godlyd.api.repository.BrukerRepo;
import no.hlf.godlyd.api.services.BrukerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class BrukerServiceImpl implements BrukerService {

    @Autowired
    private BrukerRepo brukerRepo;


    public void save(Bruker bruker){

    }

    public Bruker findByAuth0UserId(String auth0UserId){
        return brukerRepo.findByAuth0UserId(auth0UserId);
    }

    public Bruker createBruker(Bruker bruker){

        return null;
    }

    public List<Bruker> getAllBrukere(){
        return brukerRepo.findAll();
    }



}
