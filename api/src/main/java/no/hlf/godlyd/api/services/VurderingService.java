package no.hlf.godlyd.api.services;

import no.hlf.godlyd.api.model.Vurdering;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;

public interface VurderingService {

    Map<String, List<Vurdering>> getAllVurderinger();

    List<Vurdering> getVurderingerByStedId(Integer id);

    List<Vurdering> getAllVurderingerByPlaceId(String placeId);

    Page<Vurdering> getVurderingerByPlaceId(String placeId, Pageable pagable);

    Vurdering getVurderingFromId(Integer id);

    List<Vurdering> getVurderingerByBruker(String authorization);

    List<Vurdering> getVurderingerByPlaceIdAndBruker(String placeId, String authorization);

    ResponseEntity<?> deleteVurdering(Integer id, String authorization);

    Map<String, List<Vurdering>> sorterVurderinger(List<Vurdering> vurderinger);

    List<Integer> getRegistratorsByPlaceId(String placeId);
}
