package no.hlf.godlyd.api.controller;

import no.hlf.godlyd.api.model.*;
import no.hlf.godlyd.api.services.LydutjevningService;
import no.hlf.godlyd.api.services.StedService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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

    @GetMapping("/bruker")
    public List<Vurdering> getLydutjevningByBruker(@RequestHeader("Authorization") String auth) {
        return lydutjevningService.getLydutjevningByBruker(auth);
    }

    @GetMapping("/place/{placeId}")
    public List<Vurdering> getLydutjevningVurderingerBySted(@PathVariable(value = "placeId") String placeId){
        return lydutjevningService.getLydutjevningByPlaceId(placeId);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public LydutjevningVurdering createLydutjevningvurdering(
            @RequestBody LydutjevningVurdering lydutjevning,
            @RequestHeader("Authorization") String auth) {
        return lydutjevningService.createLydutjevning(lydutjevning, auth);
    }

    @PutMapping("/{id}")
    public LydutjevningVurdering updateLydutjevningvurdering(@PathVariable(value = "id") Integer id,
                                                             @RequestBody LydutjevningVurdering endring,
                                                             @RequestHeader("Authorization") String auth){
        return lydutjevningService.updateLydutjevning(id, endring, auth);
    }

}