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

    @GetMapping
    public List<Bruker> getAllBrukere(){
        return brukerService.getAllBrukere();
    }

    @GetMapping("/brukernavn/{id}")
    public Bruker getBrukerFromBrukernavn(@PathVariable(value = "id") String id){
        return brukerService.getBrukerFromId(Integer.getInteger(id));
    }

    @GetMapping("/internal/brukernavn/{auth0Id}")
    public Bruker getBrukerFromBrukernavnInternal(@PathVariable(value = "auth0Id") String auth0Id){
        return brukerService.getBrukerFromAuth0UserId(auth0Id);
    }

    @PostMapping()
    @ResponseStatus
    public Bruker updateBruker(@RequestHeader("Authorization")String auth){
        return brukerService.updateBruker(auth);
    }

}
