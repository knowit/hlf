package no.hlf.godlyd.api.services;

import no.hlf.godlyd.api.model.Sted;

import java.util.List;

public interface StedService {

    List<Sted> getAllSteder();

    boolean existsByPlaceId(String placeId);

    Sted getStedFromId(Integer id);

    /*
    List<Sted> getStederByTag(Integer tagid);

    List<Sted> getStederByAdresse(Integer adresseid);
    */

    Sted getStedFromPlaceId(String placeId);

    //List<Sted> getStederByNavn(String navn);

    Sted updateSted(String placeId);

}
