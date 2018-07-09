package no.hlf.godlyd.api.controller;

import no.hlf.godlyd.api.model.Bruker;
import no.hlf.godlyd.api.repository.BrukerRepo;
import no.hlf.godlyd.api.services.BrukerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.ServletException;
import java.util.List;

@RestController
@RequestMapping("/brukere")
public class BrukerController {

    @Autowired
    private BrukerRepo brukerRepo;

    @Autowired
    private BrukerService brukerService;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @GetMapping()
    public List<Bruker> bruker(){
        return brukerService.getAllBrukere();
    }

    @GetMapping("/innlogging")
    public String innlogging(){
        return "innlogging";
    }

    @GetMapping("/registrering")
    public String registrering(){
        return "registrering";
    }

    @PostMapping("/registrering")
    public void registrering(@RequestBody Bruker bruker){
        bruker.setPassord(bCryptPasswordEncoder.encode(bruker.getPassord()));
        brukerRepo.save(bruker);
    }

    @PostMapping("/innlogging")
    public String innlogging(@RequestBody Bruker bruker) throws ServletException {
        return brukerService.login(bruker);
    }

}
