package no.hlf.godlyd.api.services;

import no.hlf.godlyd.api.model.Bruker;
import no.hlf.godlyd.api.model.TeleslyngeVurdering;
import no.hlf.godlyd.api.model.Vurdering;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface TeleslyngeService {

    List<TeleslyngeVurdering> getAllTeleslynger();

    TeleslyngeVurdering getTeleslyngeFromId(Integer id);

    List<Vurdering> getTeleslyngerByBruker(String authorization);

    List<Vurdering> getTeleslyngerByPlaceId(String placeId);

    TeleslyngeVurdering createTeleslynge(TeleslyngeVurdering teleslynge, String authorization);

    TeleslyngeVurdering updateTeleslynge(Integer id, TeleslyngeVurdering endring, String authorization);

}
