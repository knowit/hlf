package no.hlf.godlyd.api.services;

import no.hlf.godlyd.api.model.Vurdering;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

public interface VurderingService {

    Map<String, List<Vurdering>> getAllVurderinger();

    List<Vurdering> getAllVurderingerByPlaceId(String placeId);

    List<Vurdering> getAllVurderingerByPlaceIdNewerThan(String placeId, LocalDate dato);

    Page<Vurdering> getVurderingerByPlaceId(String placeId, Pageable pagable);
    Page<Vurdering> getVurderingerByBruker(String authorization, Pageable pageable);


    Vurdering getVurderingFromId(Integer id);

    List<Vurdering> getVurderingerByPlaceIdAndBruker(String placeId, String authorization);

    Vurdering createVurdering(Vurdering vurdering, String authorization);

    Vurdering updateVurdering(Integer id, Vurdering endring, String authorization);

    Vurdering deleteVurdering(Integer id, String authorization);

    List<Vurdering> deleteVurderingerByPlaceIdAndRegistrator(String placeId, String authorization);

    Map<String, List<Vurdering>> sorterVurderinger(List<Vurdering> vurderinger);

    List<Integer> getRegistratorsByPlaceId(String placeId);

    Map<String, Object> getTotalVurderingStatistikk(String placeId);

    Vurdering removeRangeringFromVurdering(Integer vurderingId, String authorization);
}
