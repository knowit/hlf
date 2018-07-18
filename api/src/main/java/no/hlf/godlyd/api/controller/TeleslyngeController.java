package no.hlf.godlyd.api.controller;

import no.hlf.godlyd.api.model.Sted;
import no.hlf.godlyd.api.model.TeleslyngeVurdering;
import no.hlf.godlyd.api.model.Vurdering;
import no.hlf.godlyd.api.services.StedService;
import no.hlf.godlyd.api.services.TeleslyngeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/vurdering/teleslynge")
public class TeleslyngeController {

    @Autowired
    TeleslyngeService teleslyngeService;
    @Autowired
    StedService stedService;

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
    @ResponseStatus(HttpStatus.CREATED)
    public TeleslyngeVurdering createTeleslyngevurdering(@RequestBody TeleslyngeVurdering teleslynge) {
        return teleslyngeService.createTeleslynge(teleslynge);
    }

    @PutMapping("/id/{id}")
    public TeleslyngeVurdering updateTeleslyngevurdering(@PathVariable(value = "id") Integer id,
                                               @RequestBody TeleslyngeVurdering endring){

        TeleslyngeVurdering teleslyngevurdering = teleslyngeService.getTeleslyngeFromId(id);
        teleslyngevurdering.setKommentar(endring.getKommentar());
        teleslyngevurdering.setRangering(endring.isRangering());

        TeleslyngeVurdering oppdatert = teleslyngeService.createTeleslynge(teleslyngevurdering);
        return oppdatert;
    }

}