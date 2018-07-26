package no.hlf.godlyd.api.controller;

import no.hlf.godlyd.api.model.InformasjonVurdering;
import no.hlf.godlyd.api.model.Vurdering;
import no.hlf.godlyd.api.services.PropertyService;
import no.hlf.godlyd.api.services.StedService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/vurderinger")
public class PropertyController {


    @Autowired
    private PropertyService propertyService;


    @GetMapping("/bruker")
    public List<Vurdering> getPropertyReviewsByBruker(@RequestHeader("Authorization") String auth) {
        return propertyService.getPropertyReviewsByUser(auth);
    }

    @GetMapping("/place/{placeId}")
    public List<Vurdering> getPropertyReviewsByPlace(@PathVariable(value = "placeId") String placeId){
        return propertyService.getPropertyReviewsByPlaceId(placeId);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Vurdering createPropertyReview(
            @RequestBody InformasjonVurdering informasjon,
            @RequestHeader("Authorization") String auth) {
        return propertyService.createPropertyReview(informasjon, auth);
    }

    @PutMapping("/{id}")
    public Vurdering updateInformajsonvurdering(@PathVariable(value = "id") Integer id,
                                                           @RequestBody Vurdering endring,
                                                           @RequestHeader("Authorization") String auth){
        return propertyService.updatePropertyReview(id, endring, auth);
    }



}
