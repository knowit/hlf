package no.hlf.godlyd.api.services;

import no.hlf.godlyd.api.model.LydforholdVurdering;
import no.hlf.godlyd.api.model.Vurdering;

import java.util.List;

public interface PropertyService {

    List<Vurdering> getAllPropertyReviews();

    Vurdering getPropertyReviewFromId(Integer id);

    List<Vurdering> getPropertyReviewsByUser(String authorization);

    List<Vurdering> getPropertyReviewsByPlaceId(String placeId);

    Vurdering createPropertyReview(Vurdering property, String authorization);

    Vurdering updatePropertyReview(Integer id, Vurdering endring, String authorization);
}
