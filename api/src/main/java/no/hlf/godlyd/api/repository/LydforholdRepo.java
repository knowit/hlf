package no.hlf.godlyd.api.repository;

import no.hlf.godlyd.api.model.LydforholdVurdering;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LydforholdRepo extends CrudRepository<LydforholdVurdering, Integer> {



}
