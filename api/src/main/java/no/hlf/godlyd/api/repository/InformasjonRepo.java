package no.hlf.godlyd.api.repository;

import no.hlf.godlyd.api.model.InformasjonVurdering;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InformasjonRepo extends CrudRepository<InformasjonVurdering, Integer> {
}
