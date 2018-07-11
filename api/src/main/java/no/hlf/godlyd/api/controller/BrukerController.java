package no.hlf.godlyd.api.controller;

import no.hlf.godlyd.api.model.Bruker;
import no.hlf.godlyd.api.security.Auth0Connection;
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
    public String profil(@RequestHeader("Authorization") String authorization) throws Exception{
        Bruker bruker = brukerService.updateBruker(authorization.substring(7));
        String response = "userId: "+bruker.getAuth0UserId()
                +"\nfornavn: "+bruker.getFornavn()
                +"\netternavn: "+bruker.getEtternavn();
        return response;

    }

}
