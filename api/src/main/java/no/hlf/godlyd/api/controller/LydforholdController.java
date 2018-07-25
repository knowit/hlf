package no.hlf.godlyd.api.controller;

import no.hlf.godlyd.api.model.LydforholdVurdering;
import no.hlf.godlyd.api.model.Vurdering;
import no.hlf.godlyd.api.services.LydforholdService;
import no.hlf.godlyd.api.services.StedService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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

    @GetMapping("/bruker")
    public List<Vurdering> getLydforholderByBruker(@RequestHeader("Authorization") String auth) {
        return lydforholdService.getLydforholdByBruker(auth);
    }

    @GetMapping("/place/{placeId}")
    public List<Vurdering> getLydforholdVurderingerBySted(@PathVariable(value = "placeId") String placeId){
        return lydforholdService.getLydforholdByPlaceId(placeId);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public LydforholdVurdering createLydforholdVurderingg(
            @RequestBody LydforholdVurdering lydforhold,
            @RequestHeader("Authorization") String auth) {
        return lydforholdService.createLydforhold(lydforhold, auth);
    }

    @PutMapping("/{id}")
    public LydforholdVurdering updateLydforholdVurdering(@PathVariable(value = "id") Integer id,
                                                         @RequestBody LydforholdVurdering endring,
                                                         @RequestHeader("Authorization") String auth){
        return lydforholdService.updateLydforhold(id, endring, auth);
    }

}