package no.hlf.godlyd.api.controller;

import no.hlf.godlyd.api.model.LydutjevningVurdering;
import no.hlf.godlyd.api.model.TeleslyngeVurdering;
import no.hlf.godlyd.api.model.Vurdering;
import no.hlf.godlyd.api.services.LydutjevningService;
import no.hlf.godlyd.api.services.TeleslyngeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
//import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/vurdering/lydutjevning")
public class LydutjevningController {

    @Autowired
    LydutjevningService lydutjevningService;

    @GetMapping()
    public List<LydutjevningVurdering> getAllLydutjevningVurderinger() {
        return lydutjevningService.getAllLydutjevninger();
    }

    @GetMapping("/brukerId/{registrator}")
    public List<Vurdering> getLydutjevningByBruker(@PathVariable(value = "registrator") Integer brukerid) {
        return lydutjevningService.getLydutjevningByBruker(brukerid);
    }

    @GetMapping("/placeId/{placeId}")
    public List<Vurdering> getLydutjevningVurderingerBySted(@PathVariable(value = "placeId") String placeId){
        return lydutjevningService.getLydutjevningByPlaceId(placeId);
    }

    @PostMapping
    //@PreAuthorize("hasAuthority('add:vurderinger')")
    @ResponseStatus(HttpStatus.CREATED)
    public LydutjevningVurdering createLydutjevningvurdering(@RequestBody LydutjevningVurdering lydutjevning) {
        return lydutjevningService.createLydutjevning(lydutjevning);
    }


}