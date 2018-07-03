package no.hlf.godlyd.api.controller;

import no.hlf.godlyd.api.Vurderingsstatistikk;
import no.hlf.godlyd.api.model.Adresse;
import no.hlf.godlyd.api.model.Sted;
import no.hlf.godlyd.api.model.Tag;
import no.hlf.godlyd.api.model.Vurdering;
import no.hlf.godlyd.api.services.StedService;

import no.hlf.godlyd.api.services.VurderingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


// This is the REST API
@RestController
@RequestMapping("/steder")
public class StedController {

    @Autowired
    StedService stedService;
    @Autowired
    VurderingService vurderingService;

    @GetMapping()
    public List<Sted> getAllSteder(){
        return stedService.getAllSteder();
    }

    @GetMapping("/id={id}")
    public Sted getStedById(@PathVariable(value = "id") Integer id){
        return stedService.getStedFromId(id);
    }

    @GetMapping("/placesId={placesId}")
    public Sted getStedByPlacesId(@PathVariable(value = "placesId") String placesId){
        return stedService.getStedFromPlacesId(placesId);
    }

    @GetMapping("/navn={navn}")
    public List<Sted> getStederByNavn(@PathVariable(value = "navn") String navn){
        return stedService.getStederByNavn(navn);
    }

    // Get alle tags for et sted?

    @GetMapping("/tagId={tags}")
    public List<Sted> getStederByTag(@PathVariable(value = "tags") Tag tag){
        return stedService.getStederByTag(tag);
    }

    @GetMapping("/adresseId={adresse}")
    public List<Sted> getStederByAdresse(@PathVariable(value = "adresse") Adresse adresse){
        return stedService.getStederByAdresse(adresse);
    }

    @GetMapping("/id={id}/totalvurdering")
    public Map<String, Object> getTotalvurderingForSted(@PathVariable(value = "id") Integer id){
        Sted sted = stedService.getStedFromId(id);
        List<Vurdering> vurderinger = vurderingService.getVurderingerBySted(sted);
        Map<String, List<Vurdering>> sorterteVurderinger = vurderingService.sorterVurderinger(vurderinger);

        Map<String, Object> map = new HashMap<>();

        map.put("Sted", sted);
        map.put("Totalt antall vurderinger", vurderinger.size());
        map.put("Teleslyngevurderinger", new Vurderingsstatistikk(sorterteVurderinger.get("Teleslyngevurderinger")));
        map.put("Lydforholdvurderinger", new Vurderingsstatistikk(sorterteVurderinger.get("Lydforholdvurderinger")));

        return map;
    }

    // Opprette et nytt sted
    @PostMapping()
    @ResponseStatus(HttpStatus.CREATED)
    public Sted createSted(@Valid @RequestBody Sted sted){
        return stedService.createSted(sted);
    }

    // Slett et sted
    @DeleteMapping("/id={id}")
    public ResponseEntity<?> deleteSted(@PathVariable(value = "id") Integer id){
        return stedService.deleteSted(id);
    }

}
