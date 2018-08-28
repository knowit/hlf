package no.hlf.godlyd.api.repository;

import no.hlf.godlyd.api.model.StedInformasjon;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StedInformasjonRepo extends CrudRepository<StedInformasjon, String> {
    boolean existsByPlaceId(String placeId);
    StedInformasjon findByPlaceId(String placeId);
}