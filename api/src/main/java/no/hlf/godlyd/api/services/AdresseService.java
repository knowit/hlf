package no.hlf.godlyd.api.services;

import no.hlf.godlyd.api.model.Adresse;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface AdresseService {

    List<Adresse> getAllAdresser();

    Adresse createAdresse(Adresse adresse);

    Adresse getAdresseFromId(Integer id);

    ResponseEntity<?> deleteAdresse(Integer id);

}
