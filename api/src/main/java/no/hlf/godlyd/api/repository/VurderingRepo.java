package no.hlf.godlyd.api.repository;

import no.hlf.godlyd.api.model.Bruker;
import no.hlf.godlyd.api.model.Vurdering;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;


import java.util.List;

@Repository
public interface VurderingRepo extends CrudRepository<Vurdering, Integer> {

    @Query(value = "SELECT v FROM Vurdering v WHERE v.registrator.id = ?1")
    List<Vurdering> findByRegistrator(Integer brukerid);

    @Query(value = "SELECT v FROM Vurdering v WHERE v.sted.id = ?1")
    List<Vurdering> findByStedId(Integer id);

    @Query(value = "SELECT v FROM Vurdering v WHERE v.sted.placeId = ?1 ORDER BY v.dato DESC")
    List<Vurdering> findByPlaceId(String placeid);

    @Query(value = "SELECT v FROM Vurdering v WHERE v.sted.placeId = ?1 ORDER BY v.dato DESC")
    Page<Vurdering> findByPlaceIdPage(String placeid, Pageable pagable);

    @Query(value = "SELECT v FROM Vurdering v WHERE v.sted.placeId = ?1 AND v.registrator.id = ?2")
    List<Vurdering> findByPlaceIdAndRegistrator(String placeId, Integer brukerId);

    @Query(value = "SELECT v.registrator.id FROM Vurdering v WHERE v.sted.id = ?1 GROUP BY v.registrator.id")
    List<Integer> findRegistratorsByStedId(Integer stedId);

}
