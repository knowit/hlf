package no.hlf.godlyd.api.repository;

import no.hlf.godlyd.api.model.Adresse;
import no.hlf.godlyd.api.model.Sted;
import no.hlf.godlyd.api.model.Tag;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StedRepo extends CrudRepository<Sted, Integer> {

    boolean existsByNavnIgnoreCase(String navn);

    List<Sted> findByNavnIgnoreCase(String navn);

    Sted findByPlacesId(String placesId);

    List<Sted> findByTags(Tag tag);

    List<Sted> findByAdresse(Adresse adresse);
}