package no.hlf.godlyd.api.controller;

import no.hlf.godlyd.api.model.Bruker;
import no.hlf.godlyd.api.services.BrukerService;
import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/brukere")
public class BrukerController {

    @Autowired
    private BrukerService brukerService;

    @GetMapping
    public List<Bruker> getAllBrukernavn(){
        return brukerService.getAllBrukere();
    }

    @GetMapping("/brukernavn/{brukernavn}")
    public Bruker getBrukerFromBrukernavn(@PathVariable(value = "brukernavn") String brukernavn){
        return brukerService.getBrukerFromBrukernavn(brukernavn);
    }

    /*
    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @PostMapping("/registrering")
    public void registrering(@RequestBody Bruker bruker){
        bruker.setPassord(bCryptPasswordEncoder.encode(bruker.getPassord()));
        brukerRepo.save(bruker);
    }
    */

}
