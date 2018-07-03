package no.hlf.godlyd.api.repository;

import no.hlf.godlyd.api.Gruppe;
import no.hlf.godlyd.api.model.Tag;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TagRepo extends CrudRepository<Tag, Integer> {

    boolean existsByNavnIgnoreCase(String navn);

    Tag findByNavnIgnoreCase(String navn);

    List<Tag> findByGruppe(Gruppe gruppe);


}