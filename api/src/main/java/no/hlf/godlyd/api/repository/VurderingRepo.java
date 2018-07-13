package no.hlf.godlyd.api.repository;

import no.hlf.godlyd.api.model.Vurdering;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VurderingRepo extends CrudRepository<Vurdering, Integer> {

    @Query(value = "SELECT v FROM Vurdering v WHERE v.registrator.id = ?1")
    List<Vurdering> findByRegistrator(Integer brukerid);

    @Query(value = "SELECT v FROM Vurdering v WHERE v.sted.id = ?1")
    List<Vurdering> findByStedId(Integer id);

    @Query(value = "SELECT v FROM Vurdering v WHERE v.sted.placeId = ?1")
    List<Vurdering> findByPlaceId(String placeid);

    @Query(value = "SELECT v FROM Vurdering v WHERE v.sted.placeId = ?1 AND v.registrator.id = ?2")
    List<Vurdering> findByPlaceIdAndRegistrator(String placeId, Integer brukerId);

}
