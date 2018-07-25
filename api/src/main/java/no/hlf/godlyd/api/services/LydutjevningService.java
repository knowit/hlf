package no.hlf.godlyd.api.services;

import no.hlf.godlyd.api.model.LydutjevningVurdering;
import no.hlf.godlyd.api.model.Vurdering;

import java.util.List;

public interface LydutjevningService {

    List<LydutjevningVurdering> getAllLydutjevninger();

    LydutjevningVurdering getLydutjevningFromId(Integer id);

    List<Vurdering> getLydutjevningByBruker(String authorization);

    List<Vurdering> getLydutjevningByPlaceId(String placeId);

    LydutjevningVurdering createLydutjevning(LydutjevningVurdering lydutjevning, String authorization);

    LydutjevningVurdering updateLydutjevning(Integer id, LydutjevningVurdering endring, String authorization);

}
