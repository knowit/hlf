package no.hlf.godlyd.api.repository;

import no.hlf.godlyd.api.model.Vurdering;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;


import java.util.List;

@Repository
public interface VurderingRepo extends CrudRepository<Vurdering, Integer> {

    List<Vurdering> findByRegistrator(Integer brukerid);

    List<Vurdering> findByStedId(Integer id);

    List<Vurdering> findByStedPlaceId(String placeId);

    @Query(value = "SELECT v FROM Vurdering v WHERE v.sted.placeId = ?1 ORDER BY v.dato DESC")
    Page<Vurdering> findByPlaceIdPage(String placeid, Pageable pagable);


    List<Vurdering> findLydforholdByStedPlaceId(String placeId);

    List<Vurdering> findLydutjevningByStedPlaceId(String placeId);

    List<Vurdering> findInformasjonByStedPlaceId(String placeId);

    List<Vurdering> findTeleslyngeByStedPlaceId(String placeId);


    @Query(value = "SELECT v FROM Vurdering v WHERE v.sted.placeId = ?1 AND v.registrator.id = ?2")
    List<Vurdering> findByPlaceIdAndRegistrator(String placeId, Integer brukerId);

    @Query(value = "SELECT v.registrator.id FROM Vurdering v WHERE v.sted.id = ?1 GROUP BY v.registrator.id")
    List<Integer> findRegistratorsByStedId(Integer stedId);


    boolean existsById(Integer id);

}
