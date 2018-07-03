package no.hlf.godlyd.api.controller;

import no.hlf.godlyd.api.model.Bruker;
import no.hlf.godlyd.api.model.Vurdering;
import no.hlf.godlyd.api.services.VurderingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/vurderinger")
public class VurderingController {

    @Autowired
    VurderingService vurderingService;

    @GetMapping()
    public Map<String, List<Vurdering>> getAllVurderinger(){
        return vurderingService.getAllVurderinger();
    }

    @GetMapping("/id={id}")
    public Vurdering getVurderingById(@PathVariable(value = "id") Integer id){
        return vurderingService.getVurderingFromId(id);
    }

    @GetMapping("/brukerId={registrator}")
    public List<Vurdering> getVurderingerByBruker(@PathVariable(value = "registrator") Bruker bruker){
        return vurderingService.getVurderingerByBruker(bruker);
    }

    // Opprette en ny vurdering
    @PostMapping(produces = {"application/json"})
    @ResponseStatus(HttpStatus.CREATED)
    public Vurdering createVurdering(@RequestBody Vurdering vurdering){
        return vurderingService.createVurdering(vurdering);
    }

    // Slett en vurdering
    @DeleteMapping()
    public ResponseEntity<?> deleteVurdering(@PathVariable(value = "id") Integer id){
        return vurderingService.deleteVurdering(id);
    }


}
