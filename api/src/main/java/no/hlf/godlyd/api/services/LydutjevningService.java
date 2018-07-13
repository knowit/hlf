package no.hlf.godlyd.api.services;

import no.hlf.godlyd.api.model.LydutjevningVurdering;
import no.hlf.godlyd.api.model.Vurdering;

import java.util.List;

public interface LydutjevningService {

    List<LydutjevningVurdering> getAllLydutjevninger();

    LydutjevningVurdering getLydutjevningFromId(Integer id);

    List<Vurdering> getLydutjevningByBruker(Integer brukerid);

    List<Vurdering> getLydutjevningByPlaceId(String placeId);

    LydutjevningVurdering createLydutjevning(LydutjevningVurdering lydutjevning);
}
