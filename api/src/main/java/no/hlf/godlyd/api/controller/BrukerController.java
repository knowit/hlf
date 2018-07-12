package no.hlf.godlyd.api.controller;

import no.hlf.godlyd.api.model.Bruker;
import no.hlf.godlyd.api.services.BrukerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/brukere")
public class BrukerController {

    @Autowired
    private BrukerService brukerService;

    @GetMapping
    @ResponseBody
    public List<Bruker> bruker(){
        return brukerService.getAllBrukere();
    }

    @GetMapping("/profil")
    @ResponseBody
    public Bruker profil(@RequestHeader("Authorization") String authorization){
        return brukerService.updateBruker(authorization.substring(7));
    }

    @GetMapping("/login")
    @ResponseBody
    public Bruker login(@RequestHeader("Authorization") String auth){
        return brukerService.login(auth.substring(7));
    }
}
