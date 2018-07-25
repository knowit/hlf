package no.hlf.godlyd.api.controller;

import no.hlf.godlyd.api.model.InformasjonVurdering;
import no.hlf.godlyd.api.model.Vurdering;
import no.hlf.godlyd.api.services.InformasjonService;
import no.hlf.godlyd.api.services.StedService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/vurderinger/informasjon")
public class InformasjonController {

    @Autowired
    InformasjonService informasjonService;
    @Autowired
    StedService stedService;

    @GetMapping()
    public List<InformasjonVurdering> getAllInformasjonVurderinger() {
        return informasjonService.getAllInformasjon();
    }

    @GetMapping("/bruker")
    public List<Vurdering> getInformasjonByBruker(@RequestHeader("Authorization") String auth) {
        return informasjonService.getInformasjonByBruker(auth);
    }

    @GetMapping("/place/{placeId}")
    public List<Vurdering> getInformasjonVurderingerBySted(@PathVariable(value = "placeId") String placeId){
        return informasjonService.getInformasjonByPlaceId(placeId);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public InformasjonVurdering createInformasjonvurdering(
            @RequestBody InformasjonVurdering informasjon,
            @RequestHeader("Authorization") String auth) {
        return informasjonService.createInformasjon(informasjon, auth);
    }

    @PutMapping("/{id}")
    public InformasjonVurdering updateInformajsonvurdering(@PathVariable(value = "id") Integer id,
                                                           @RequestBody InformasjonVurdering endring,
                                                           @RequestHeader("Authorization") String auth){
        return informasjonService.updateInformasjon(id, endring, auth);
    }

}