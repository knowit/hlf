package no.hlf.godlyd.api.repository;

import no.hlf.godlyd.api.model.Vurdering;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface VurderingRepo extends PagingAndSortingRepository<Vurdering, Integer> {

    List<Vurdering> findByRegistratorId(Integer brukerid);

    //@Query(value = "SELECT v FROM Vurdering v WHERE v.registrator.id = ?1 AND v.dato > ?2 ORDER BY v.dato DESC")
    //Page<Vurdering> findByRegistratorIdPage(Integer registrationId, LocalDate dato, Pageable pageable);

    Page<Vurdering> findByRegistratorId(Integer registratorId, Pageable pageable);
    Page<Vurdering> findByStedPlaceId(String placeId, Pageable pageable);

    List<Vurdering> findByStedId(Integer id);

    List<Vurdering> findByStedPlaceId(String placeId);

    List<Vurdering> findByStedPlaceIdAndDatoGreaterThan(String placeId, LocalDate dato);

    List<Vurdering> findLydforholdByStedPlaceId(String placeId);

    List<Vurdering> findLydutjevningByStedPlaceId(String placeId);

    List<Vurdering> findInformasjonByStedPlaceId(String placeId);

    List<Vurdering> findTeleslyngeByStedPlaceId(String placeId);

    List<Vurdering> findByStedPlaceIdAndRegistratorId(String placeId, Integer registratorId);

    List<Integer> findRegistratorIdByStedId(Integer stedId);

    boolean existsById(Integer id);

}
