package no.hlf.godlyd.api.controller;

import no.hlf.godlyd.api.model.InformasjonVurdering;
import no.hlf.godlyd.api.model.Sted;
import no.hlf.godlyd.api.model.TeleslyngeVurdering;
import no.hlf.godlyd.api.model.Vurdering;
import no.hlf.godlyd.api.services.InformasjonService;
import no.hlf.godlyd.api.services.StedService;
import no.hlf.godlyd.api.services.TeleslyngeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
//import org.springframework.security.access.prepost.PreAuthorize;
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

    @GetMapping("/bruker/{registrator}")
    public List<Vurdering> getInformasjonByBruker(@PathVariable(value = "registrator") Integer brukerid) {
        return informasjonService.getInformasjonByBruker(brukerid);
    }

    @GetMapping("/place/{placeId}")
    public List<Vurdering> getInformasjonVurderingerBySted(@PathVariable(value = "placeId") String placeId){
        return informasjonService.getInformasjonByPlaceId(placeId);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public InformasjonVurdering createInformasjonvurdering(@RequestBody InformasjonVurdering informasjon) {
        Sted sted = stedService.getStedFromPlaceId(informasjon.getSted().getPlaceId());
        if (sted != null){
            sted.addVurdering(informasjon);
        }
        return informasjonService.createInformasjon(informasjon);
    }

    @PutMapping("/{id}")
    public InformasjonVurdering updateInformajsonvurdering(@PathVariable(value = "id") Integer id,
                                                           @RequestBody InformasjonVurdering endring){

        InformasjonVurdering informasjonvurdering = informasjonService.getInformasjonFromId(id);
        informasjonvurdering.setKommentar(endring.getKommentar());
        informasjonvurdering.setRangering(endring.isRangering());

        InformasjonVurdering oppdatert = informasjonService.createInformasjon(informasjonvurdering);
        return oppdatert;
    }

}