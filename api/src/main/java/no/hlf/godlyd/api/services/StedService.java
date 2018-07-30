package no.hlf.godlyd.api.services;

import no.hlf.godlyd.api.model.Sted;

import java.util.List;

public interface StedService {

    List<Sted> getAllSteder();

    boolean existsByPlaceId(String placeId);

    Sted getStedFromId(Integer id);

    Sted getStedFromPlaceId(String placeId);

    Sted updateSted(String placeId);

}
