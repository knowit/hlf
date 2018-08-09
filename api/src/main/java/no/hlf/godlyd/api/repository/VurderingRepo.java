package no.hlf.godlyd.api.repository;

import no.hlf.godlyd.api.model.Vurdering;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;


import java.util.Date;
import java.util.List;

@Repository
public interface VurderingRepo extends CrudRepository<Vurdering, Integer> {

    List<Vurdering> findByRegistrator(Integer brukerid);

    List<Vurdering> findByStedId(Integer id);

    List<Vurdering> findByStedPlaceId(String placeId);

    List<Vurdering> findByStedPlaceIdAndDatoGreaterThan(String placeId, Date dato);

    @Query(value = "SELECT v FROM Vurdering v WHERE v.sted.placeId = ?1 ORDER BY v.dato DESC")
    Page<Vurdering> findByPlaceIdPage(String placeid, Pageable pagable);


    List<Vurdering> findLydforholdByStedPlaceId(String placeId);

    List<Vurdering> findLydutjevningByStedPlaceId(String placeId);

    List<Vurdering> findInformasjonByStedPlaceId(String placeId);

    List<Vurdering> findTeleslyngeByStedPlaceId(String placeId);


    List<Vurdering> findByStedPlaceIdAndRegistratorId(String placeId, Integer registratorId);

    List<Integer> findRegistratorIdByStedId(Integer stedId);


    boolean existsById(Integer id);

}
