package no.hlf.godlyd.api.services;

import com.fasterxml.jackson.databind.node.ArrayNode;
import no.hlf.godlyd.api.model.Vurdering;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Map;

public interface VurderingService {

    Map<String, List<Vurdering>> getAllVurderinger();

    List<Vurdering> getVurderingerByStedId(Integer id);

    List<Vurdering> getAllVurderingerByPlaceId(String placeId);

    List<Vurdering> getAllVurderingerByPlaceIdNewerThan(String placeId, LocalDate dato);

    ArrayNode getVurderingerByPlaceId(String placeId, LocalDate dato, Pageable pagable);

    Vurdering getVurderingFromId(Integer id);

    List<Vurdering> getVurderingerByBruker(String authorization);

    List<Vurdering> getVurderingerByPlaceIdAndBruker(String placeId, String authorization);

    List<Vurdering> getVurderingerByTypeAndPlaceId(String vurderingstype, String placeId);

    Vurdering createVurdering(Vurdering vurdering, String authorization);

    Vurdering updateVurdering(Integer id, Vurdering endring, String authorization);

    ResponseEntity<?> deleteVurdering(Integer id, String authorization);

    Map<String, List<Vurdering>> sorterVurderinger(List<Vurdering> vurderinger);

    List<Integer> getRegistratorsByPlaceId(String placeId);
}
