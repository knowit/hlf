package no.hlf.godlyd.api.repository;

import no.hlf.godlyd.api.model.TeleslyngeVurdering;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TeleslyngeRepo extends CrudRepository<TeleslyngeVurdering, Integer> {
}
