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

    Page<Vurdering> findByRegistratorId(Integer registratorId, Pageable pageable);

    Page<Vurdering> findByStedPlaceId(String placeId, Pageable pageable);

    List<Vurdering> findByStedId(Integer id);

    List<Vurdering> findByStedPlaceId(String placeId);

    List<Vurdering> findByStedPlaceIdAndDatoGreaterThan(String placeId, LocalDate dato);

    List<Vurdering> findByStedPlaceIdAndRegistratorId(String placeId, Integer registratorId);

    List<Integer> findRegistratorIdByStedId(Integer stedId);

    boolean existsById(Integer id);

}
