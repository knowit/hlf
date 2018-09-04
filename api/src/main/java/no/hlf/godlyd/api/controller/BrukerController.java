package no.hlf.godlyd.api.controller;

import no.hlf.godlyd.api.model.Bruker;
import no.hlf.godlyd.api.services.BrukerService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

import java.util.List;



@RestController
@RequestMapping("/brukere")
public class BrukerController {

    @Autowired
    private BrukerService brukerService;

    private static final Logger logger = LoggerFactory.getLogger(BrukerController.class);

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
        return brukerService.getBrukerFromAuth0UserId(auth0Id);
    }

    @GetMapping("/login")
    public Bruker loginBruker(@RequestHeader("Authorization")String auth) {
        logger.info("inside loginBruker 1/2");
        Bruker bruker = brukerService.updateBruker(auth);
        logger.info("inside loginBruker 2/2");
        return bruker;
    }

}
