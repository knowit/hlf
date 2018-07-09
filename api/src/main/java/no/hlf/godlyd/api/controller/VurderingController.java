package no.hlf.godlyd.api.controller;

import no.hlf.godlyd.api.model.Vurdering;
import no.hlf.godlyd.api.services.VurderingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/vurdering")
public class VurderingController {

    @Autowired
    VurderingService vurderingService;

    @GetMapping()
    public Map<String, List<Vurdering>> getAllVurderinger(){
        return vurderingService.getAllVurderinger();
    }

    @GetMapping("/id/{id}")
    public Vurdering getVurderingById(@PathVariable(value = "id") Integer id){
        return vurderingService.getVurderingFromId(id);
    }

    @GetMapping("/brukerId/{registrator}")
    public List<Vurdering> getVurderingerByBruker(@PathVariable(value = "registrator") Integer brukerid){
        return vurderingService.getVurderingerByBruker(brukerid);
    }

    @GetMapping("/placeId/{placeId}")
    public List<Vurdering> getVurderingByPlaceId(@PathVariable(value = "placeId") String placeId){
        return vurderingService.getVurderingerByPlaceId(placeId);
    }

    @DeleteMapping("/id/{id}")
    public ResponseEntity<?> deleteVurdering(@PathVariable(value = "id") Integer id){
        return vurderingService.deleteVurdering(id);
    }

    /*
    // Opprette en ny vurdering
    @PostMapping(produces = {"application/json"})
    @ResponseStatus(HttpStatus.CREATED)
    public Vurdering createVurdering(@RequestBody Vurdering vurdering){
        return vurderingService.createVurdering(vurdering);
    }
    */
}
