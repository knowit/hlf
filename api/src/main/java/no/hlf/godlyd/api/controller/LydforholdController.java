package no.hlf.godlyd.api.controller;

import no.hlf.godlyd.api.model.LydforholdVurdering;
import no.hlf.godlyd.api.model.TeleslyngeVurdering;
import no.hlf.godlyd.api.model.Vurdering;
import no.hlf.godlyd.api.services.LydforholdService;
import no.hlf.godlyd.api.services.TeleslyngeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
//import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/vurdering/lydforhold")
public class LydforholdController {

    @Autowired
    LydforholdService lydforholdService;

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
    //@PreAuthorize("hasAuthority('add:vurderinger')")
    @ResponseStatus(HttpStatus.CREATED)
    public LydforholdVurdering createLydforholdvurdering(@RequestBody LydforholdVurdering lydforhold) {
        return lydforholdService.createLydforhold(lydforhold);
    }


}