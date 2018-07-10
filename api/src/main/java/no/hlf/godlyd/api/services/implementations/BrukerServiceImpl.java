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
    BrukerRepo brukerRepo;

    @Override
    public List<Bruker> getAllBrukere(){ return (List<Bruker>) brukerRepo.findAll(); }

    @Override
    public Bruker getBrukerFromBrukernavn(String brukernavn){
        return brukerRepo.findByBrukernavn(brukernavn);
    }

}
