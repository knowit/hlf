package no.hlf.godlyd.api.services;

import no.hlf.godlyd.api.model.Sted;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface StedService {

    List<Sted> getAllSteder();

    Sted getStedFromId(Integer id);

    /*
    List<Sted> getStederByTag(Integer tagid);

    List<Sted> getStederByAdresse(Integer adresseid);
    */

    Sted getStedFromPlaceId(String placeId);

    //List<Sted> getStederByNavn(String navn);

    Sted createSted(Sted sted);

    ResponseEntity<?> deleteSted(Integer id);


}
