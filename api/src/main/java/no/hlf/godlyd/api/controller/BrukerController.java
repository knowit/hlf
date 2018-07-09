package no.hlf.godlyd.api.controller;

import no.hlf.godlyd.api.model.Bruker;
import no.hlf.godlyd.api.services.BrukerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.ServletException;
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

    @PostMapping("/registrering")
    public void registrering(@RequestBody Bruker bruker){
        brukerService.createBruker(bruker);
    }

    @PostMapping("/innlogging")
    public String innlogging(@RequestBody Bruker bruker) throws ServletException {
        return brukerService.login(bruker);
    }

}
