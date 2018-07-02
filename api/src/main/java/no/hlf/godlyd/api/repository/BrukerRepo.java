package no.hlf.godlyd.api.repository;

import no.hlf.godlyd.api.model.Bruker;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BrukerRepo extends CrudRepository<Bruker, Integer> {

    Bruker findByBrukernavn(String brukernavn);
}