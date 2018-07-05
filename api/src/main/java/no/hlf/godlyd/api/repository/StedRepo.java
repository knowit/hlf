package no.hlf.godlyd.api.repository;

import no.hlf.godlyd.api.model.Sted;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StedRepo extends CrudRepository<Sted, Integer> {

    //List<Sted> findByNavnIgnoreCase(String navn);

    Sted findByPlaceId(String placeId);

    /*
    @Query(value = "SELECT s FROM Sted s INNER JOIN s.tags t where t.id = ?1")
    List<Sted> findByTag(Integer tagid);

    @Query(value = "SELECT s FROM Sted s WHERE s.adresse.id = ?1")
    List<Sted> findByAdresse(Integer adresseid);
    */
}