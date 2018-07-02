package no.hlf.godlyd.api.repository;

import no.hlf.godlyd.api.model.Bruker;
import no.hlf.godlyd.api.model.Sted;
import no.hlf.godlyd.api.model.Vurdering;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VurderingRepo extends CrudRepository<Vurdering, Integer> {

    List<Vurdering> findByRegistrator(Bruker registrator);

    List<Vurdering> findBySted(Sted sted);


}
