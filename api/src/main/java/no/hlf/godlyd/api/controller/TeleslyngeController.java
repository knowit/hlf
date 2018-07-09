package no.hlf.godlyd.api.controller;

import no.hlf.godlyd.api.model.TeleslyngeVurdering;
import no.hlf.godlyd.api.model.Vurdering;
import no.hlf.godlyd.api.services.TeleslyngeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
//import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/vurdering/teleslynge")
public class TeleslyngeController {

    @Autowired
    TeleslyngeService teleslyngeService;

    @GetMapping()
    public List<TeleslyngeVurdering> getAllTeleslyngeVurderinger() {
        return teleslyngeService.getAllTeleslynger();
    }

    @GetMapping("/brukerId/{registrator}")
    public List<Vurdering> getTeleslyngerByBruker(@PathVariable(value = "registrator") Integer brukerid) {
        return teleslyngeService.getTeleslyngerByBruker(brukerid);
    }

    @GetMapping("/placeId/{placeId}")
    public List<Vurdering> getTeleslyngeVurderingerBySted(@PathVariable(value = "placeId") String placeId){
        return teleslyngeService.getTeleslyngerByPlaceId(placeId);
    }

    @PostMapping
    //@PreAuthorize("hasAuthority('add:vurderinger')")
    @ResponseStatus(HttpStatus.CREATED)
    public TeleslyngeVurdering createTeleslyngevurdering(@RequestBody TeleslyngeVurdering teleslynge) {
        return teleslyngeService.createTeleslynge(teleslynge);
    }


}