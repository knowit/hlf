package no.hlf.godlyd.api.controller;

import no.hlf.godlyd.api.model.Bruker;
import no.hlf.godlyd.api.model.TeleslyngeVurdering;
import no.hlf.godlyd.api.services.TeleslyngeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/teleslyngeVurderinger")
public class TeleslyngeController {

    @Autowired
    TeleslyngeService teleslyngeService;

    @GetMapping()
    public List<TeleslyngeVurdering> getAllTeleslynger() {
        return teleslyngeService.getAllTeleslynger();
    }

    @GetMapping("/id={id}")
    public TeleslyngeVurdering getTeleslyngerById(@PathVariable(value = "id") Integer id) {
        return teleslyngeService.getTeleslyngeFromId(id);
    }

    /*
    @GetMapping("/brukerId={registrator}")
    public List<TeleslyngeVurdering> getTeleslyngeerByBruker(@PathVariable(value = "registrator") Bruker bruker) {
        return teleslyngeService.getTeleslyngerByBruker(bruker);
    }
    */
    // getTeleslyngeerBySted ?


    // Opprette en ny teleslynge
    @PostMapping
    @PreAuthorize("hasAuthority('add:vurderinger')")
    @ResponseStatus(HttpStatus.CREATED)
    public TeleslyngeVurdering createTeleslyngeVurdering(@RequestBody TeleslyngeVurdering teleslynge) {
        return teleslyngeService.createTeleslynge(teleslynge);
    }

    /*
    // Slett en teleslynge
    @DeleteMapping()
    public ResponseEntity<?> deleteSted(@PathVariable(value = "id") Integer id){
        return stedService.deleteSted(id);
    }
    */

}