package no.hlf.godlyd.api.services.implementations;

import no.hlf.godlyd.api.model.Bruker;
import no.hlf.godlyd.api.repository.BrukerRepo;
import no.hlf.godlyd.api.services.BrukerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import java.util.List;

@Service
public class BrukerServiceImpl implements BrukerService {

    @Autowired
    private BrukerRepo brukerRepo;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;



    public void save(Bruker bruker){
        bruker.setPassord(bCryptPasswordEncoder.encode(bruker.getPassord()));
        brukerRepo.save(bruker);
    }

    public Bruker findByBrukernavn(String brukernavn){
        return brukerRepo.findByBrukernavn(brukernavn);
    }

    public Bruker createBruker(Bruker bruker){
        Bruker b = brukerRepo.findByBrukernavn(bruker.getBrukernavn());
        if(b == null){
            save(bruker);
            return bruker;
        }
        return null;
    }

    public List<Bruker> getAllBrukere(){
        return brukerRepo.findAll();
    }



}
