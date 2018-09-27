package no.hlf.godlyd.api.controller;

import no.hlf.godlyd.api.exception.ResourceNotFoundException;
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

    @GetMapping("/{id}")
    public Bruker getBrukerFromId(@PathVariable(value = "id") Integer id){
        return brukerService.getBrukerFromId(id);
    }

    @GetMapping("/auth0id/{auth0Id}")
    public Bruker getBrukerFromAuth0UserId(@PathVariable(value = "auth0Id") String auth0Id){
        return brukerService
                .getBrukerFromAuth0UserId(auth0Id)
                .orElseThrow(() -> new ResourceNotFoundException("Bruker", "auth0Id", auth0Id));
    }

    @GetMapping("/fetch-updated-user-information")
    public Bruker fetchUserInformationFromAuth0(@RequestHeader("Authorization") String auth) {
        return brukerService.getBrukerFromAuthToken(auth);
    }

    @DeleteMapping("/min-konto")
    public HttpStatus deleteMyAccount(@RequestHeader("Authorization") String auth) {
        brukerService.deleteMyAccount(auth);
        return HttpStatus.NO_CONTENT;
    }

}
