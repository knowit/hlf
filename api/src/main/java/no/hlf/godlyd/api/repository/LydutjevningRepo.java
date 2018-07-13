package no.hlf.godlyd.api.repository;

import no.hlf.godlyd.api.model.LydutjevningVurdering;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LydutjevningRepo extends CrudRepository<LydutjevningVurdering, Integer> {

}
