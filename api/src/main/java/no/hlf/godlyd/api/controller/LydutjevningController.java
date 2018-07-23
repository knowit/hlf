package no.hlf.godlyd.api.controller;

import no.hlf.godlyd.api.model.*;
import no.hlf.godlyd.api.services.LydutjevningService;
import no.hlf.godlyd.api.services.StedService;
import no.hlf.godlyd.api.services.TeleslyngeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
//import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/vurderinger/lydutjevning")
public class LydutjevningController {

    @Autowired
    LydutjevningService lydutjevningService;
    @Autowired
    StedService stedService;

    @GetMapping()
    public List<LydutjevningVurdering> getAllLydutjevningVurderinger() {
        return lydutjevningService.getAllLydutjevninger();
    }

    @GetMapping("/bruker/{registrator}")
    public List<Vurdering> getLydutjevningByBruker(@PathVariable(value = "registrator") Integer brukerid) {
        return lydutjevningService.getLydutjevningByBruker(brukerid);
    }

    @GetMapping("/place/{placeId}")
    public List<Vurdering> getLydutjevningVurderingerBySted(@PathVariable(value = "placeId") String placeId){
        return lydutjevningService.getLydutjevningByPlaceId(placeId);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public LydutjevningVurdering createLydutjevningvurdering(@RequestBody LydutjevningVurdering lydutjevning) {
        Sted sted = stedService.getStedFromPlaceId(lydutjevning.getSted().getPlaceId());
        if (sted != null){
            sted.addVurdering(lydutjevning);
        }
        return lydutjevningService.createLydutjevning(lydutjevning);
    }

    @PutMapping("/{id}")
    public LydutjevningVurdering updateLydutjevningvurdering(@PathVariable(value = "id") Integer id,
                                                             @RequestBody LydutjevningVurdering endring){

        LydutjevningVurdering lydutjevningvurdering = lydutjevningService.getLydutjevningFromId(id);
        lydutjevningvurdering.setKommentar(endring.getKommentar());
        lydutjevningvurdering.setRangering(endring.isRangering());

        LydutjevningVurdering oppdatert = lydutjevningService.createLydutjevning(lydutjevningvurdering);
        return oppdatert;
    }

}