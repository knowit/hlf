package no.hlf.godlyd.api.repository;

import no.hlf.godlyd.api.model.Bruker;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BrukerRepo extends CrudRepository<Bruker, Integer> {

    Bruker findByAuth0UserId(String auth0UserId);

    List<Bruker> findAll();
}