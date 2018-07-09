package no.hlf.godlyd.api.controller;

import no.hlf.godlyd.api.model.InformasjonVurdering;
import no.hlf.godlyd.api.model.TeleslyngeVurdering;
import no.hlf.godlyd.api.model.Vurdering;
import no.hlf.godlyd.api.services.InformasjonService;
import no.hlf.godlyd.api.services.TeleslyngeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
//import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/vurdering/informasjon")
public class InformasjonController {

    @Autowired
    InformasjonService informasjonService;

    @GetMapping()
    public List<InformasjonVurdering> getAllInformasjonVurderinger() {
        return informasjonService.getAllInformasjon();
    }

    @GetMapping("/brukerId/{registrator}")
    public List<Vurdering> getInformasjonByBruker(@PathVariable(value = "registrator") Integer brukerid) {
        return informasjonService.getInformasjonByBruker(brukerid);
    }

    @GetMapping("/placeId/{placeId}")
    public List<Vurdering> getInformasjonVurderingerBySted(@PathVariable(value = "placeId") String placeId){
        return informasjonService.getInformasjonByPlaceId(placeId);
    }

    @PostMapping
    //@PreAuthorize("hasAuthority('add:vurderinger')")
    @ResponseStatus(HttpStatus.CREATED)
    public InformasjonVurdering createInformasjonvurdering(@RequestBody InformasjonVurdering informasjon) {
        return informasjonService.createInformasjon(informasjon);
    }


}