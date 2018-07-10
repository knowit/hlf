package no.hlf.godlyd.api.controller;

import no.hlf.godlyd.api.services.BrukerService;
import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/brukere")
public class BrukerController {

    @Autowired
    private BrukerService brukerService;
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
