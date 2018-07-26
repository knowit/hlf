package no.hlf.godlyd.api.services;

import no.hlf.godlyd.api.model.Vurdering;

import java.util.List;
import java.util.Map;

public interface VurderingService {


    public List<Vurdering> getAllVurderinger();
    public Vurdering createVurdering(Vurdering vurdering);
    public List<Vurdering> getAllVurderingerByPlaceID(String placeId);
    public int getRegistratorCount(String placeId);
    public Map<String, Map<String, Integer>> getReviewStats(String placeId);
    /*Map<String, List<Vurdering>> getAllVurderinger();

    List<Vurdering> getVurderingerByStedId(Integer id);

    List<Vurdering> getAllVurderingerByPlaceId(String placeId);

    Page<Vurdering> getVurderingerByPlaceId(String placeId, Pageable pagable);

    Vurdering getVurderingFromId(Integer id);

    List<Vurdering> getVurderingerByBruker(String authorization);

    List<Vurdering> getVurderingerByPlaceIdAndBruker(String placeId, String authorization);

    ResponseEntity<?> deleteVurdering(Integer id, String authorization);

    Map<String, List<Vurdering>> sorterVurderinger(List<Vurdering> vurderinger);

    List<Integer> getRegistratorsByPlaceId(String placeId);

    List<Vurdering> getAllPropertyReviews();

    Vurdering getPropertyReviewFromId(Integer id);

    List<Vurdering> getPropertyReviewsByUser(String authorization);

    List<Vurdering> getPropertyReviewsByPlaceId(String placeId);

    Vurdering createPropertyReview(Vurdering property, String authorization);

    Vurdering updatePropertyReview(Integer id, Vurdering endring, String authorization);*/
}
