package no.hlf.godlyd.api.controller;

import no.hlf.godlyd.api.model.LydforholdVurdering;
import no.hlf.godlyd.api.model.Sted;
import no.hlf.godlyd.api.model.TeleslyngeVurdering;
import no.hlf.godlyd.api.model.Vurdering;
import no.hlf.godlyd.api.services.LydforholdService;
import no.hlf.godlyd.api.services.StedService;
import no.hlf.godlyd.api.services.TeleslyngeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
//import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/vurderinger/lydforhold")
public class LydforholdController {

    @Autowired
    LydforholdService lydforholdService;
    @Autowired
    StedService stedService;

    @GetMapping()
    public List<LydforholdVurdering> getAllLydforholdVurderinger() {
        return lydforholdService.getAllLydforhold();
    }

    @GetMapping("/brukerId/{registrator}")
    public List<Vurdering> getLydforholderByBruker(@PathVariable(value = "registrator") Integer brukerid) {
        return lydforholdService.getLydforholdByBruker(brukerid);
    }

    @GetMapping("/placeId/{placeId}")
    public List<Vurdering> getLydforholdVurderingerBySted(@PathVariable(value = "placeId") String placeId){
        return lydforholdService.getLydforholdByPlaceId(placeId);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public LydforholdVurdering createLydforholdvurdering(@RequestBody LydforholdVurdering lydforhold) {
        Sted sted = stedService.getStedFromPlaceId(lydforhold.getSted().getPlaceId());
        if (sted != null){
            sted.addVurdering(lydforhold);
        }
        return lydforholdService.createLydforhold(lydforhold);
    }

    @PutMapping("/id/{id}")
    public LydforholdVurdering updateLydforholdvurdering(@PathVariable(value = "id") Integer id,
                                                         @RequestBody LydforholdVurdering endring){

        LydforholdVurdering lydforholdvurdering = lydforholdService.getLydforholdFromId(id);
        lydforholdvurdering.setKommentar(endring.getKommentar());
        lydforholdvurdering.setRangering(endring.isRangering());

        LydforholdVurdering oppdatert = lydforholdService.createLydforhold(lydforholdvurdering);
        return oppdatert;
    }

}