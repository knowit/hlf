package no.hlf.godlyd.api.repository;

import no.hlf.godlyd.api.model.Sted;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StedRepo extends CrudRepository<Sted, Integer> {

    boolean existsByPlaceId(String placeId);

    Sted findByPlaceId(String placeId);
}