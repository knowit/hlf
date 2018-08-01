package no.hlf.godlyd.api.services;

import no.hlf.godlyd.api.model.LydforholdVurdering;
import no.hlf.godlyd.api.model.Vurdering;

import java.util.List;

public interface LydforholdService {

    List<LydforholdVurdering> getAllLydforhold();

    LydforholdVurdering getLydforholdFromId(Integer id);

    List<Vurdering> getLydforholdByBruker(Integer brukerid);

    List<Vurdering> getLydforholdByPlaceId(String placeId);

    LydforholdVurdering createLydforhold(LydforholdVurdering lydforhold);
}