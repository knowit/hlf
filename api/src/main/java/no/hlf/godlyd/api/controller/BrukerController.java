package no.hlf.godlyd.api.controller;

import no.hlf.godlyd.api.model.Bruker;
import no.hlf.godlyd.api.services.BrukerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/brukere")
public class BrukerController {

    @Autowired
    private BrukerService brukerService;

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

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/registrering")
    public Bruker registrering(@RequestBody Bruker bruker){
        return brukerService.createBruker(bruker);
    }

    @PostMapping("/innlogging")
    public Bruker innlogging(@RequestBody Bruker bruker){
        return brukerService.login(bruker);
    }

}
