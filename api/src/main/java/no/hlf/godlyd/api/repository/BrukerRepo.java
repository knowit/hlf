package no.hlf.godlyd.api.repository;

import no.hlf.godlyd.api.model.Bruker;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BrukerRepo extends CrudRepository<Bruker, Integer> {

    Optional<Bruker> findByAuth0UserId(String auth0UserId);

    List<Bruker> findAll();
}