package no.hlf.godlyd.api.controller;

import no.hlf.godlyd.api.model.TeleslyngeVurdering;
import no.hlf.godlyd.api.model.Vurdering;
import no.hlf.godlyd.api.services.StedService;
import no.hlf.godlyd.api.services.TeleslyngeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/vurderinger/teleslynge")
public class TeleslyngeController {

    @Autowired
    TeleslyngeService teleslyngeService;
    @Autowired
    StedService stedService;

    @GetMapping()
    public List<TeleslyngeVurdering> getAllTeleslyngeVurderinger() {
        return teleslyngeService.getAllTeleslynger();
    }

    @GetMapping("/bruker/{registrator}")
    public List<Vurdering> getTeleslyngerByBruker(@RequestHeader("Authorization") String authorization) {
        return teleslyngeService.getTeleslyngerByBruker(authorization);
    }

    @GetMapping("/place/{placeId}")
    public List<Vurdering> getTeleslyngeVurderingerBySted(@PathVariable(value = "placeId") String placeId){
        return teleslyngeService.getTeleslyngerByPlaceId(placeId);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public TeleslyngeVurdering createTeleslyngeVurdering(
            @RequestBody TeleslyngeVurdering teleslynge,
            @RequestHeader("Authorization") String auth) {
        return teleslyngeService.createTeleslynge(teleslynge, auth);
    }

    @PutMapping("/{id}")
    public TeleslyngeVurdering updateTeleslyngeVurdering(@PathVariable(value = "id") Integer id,
                                                         @RequestBody TeleslyngeVurdering endring,
                                                         @RequestHeader("Authorization") String auth){
        return teleslyngeService.updateTeleslynge(id, endring, auth);
    }

}