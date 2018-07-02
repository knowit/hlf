package no.hlf.godlyd.api.services;

import no.hlf.godlyd.api.model.Adresse;
import no.hlf.godlyd.api.model.Sted;
import no.hlf.godlyd.api.model.Tag;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface StedService {
    List<Sted> getAllSteder();

    Sted getStedFromId(Integer id);

    List<Sted> getStederByTag(Tag tag);

    List<Sted> getStederByAdresse(Adresse adresse);

    Sted getStedFromPlacesId(String placesId);

    List<Sted> getStederByNavn(String navn);

    //Sted createSted(Sted sted);
    //ResponseEntity<?> deleteSted(Integer id);


}
