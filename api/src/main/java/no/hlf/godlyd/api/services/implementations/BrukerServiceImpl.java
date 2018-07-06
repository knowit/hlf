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
        bruker.setPassord(bruker.getPassord());
        brukerRepo.save(bruker);
    }

    public Bruker findByBrukernavn(String brukernavn){
        return brukerRepo.findByBrukernavn(brukernavn);
    }

    public Bruker createBruker(Bruker bruker){
        return brukerRepo.save(bruker);
    }

    public List<Bruker> getAllBrukere(){
        return brukerRepo.findAll();
    }

    public Bruker login(Bruker bruker){
        Bruker b = brukerRepo.findByBrukernavn(bruker.getBrukernavn());
        if(b != null){
            if(b.getPassord().equals(bruker.getPassord())){
                return b;
            }
        }
        return null;
    }


}
