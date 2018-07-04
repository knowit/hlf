package no.hlf.godlyd.api.repository;

import no.hlf.godlyd.api.model.Adresse;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AdresseRepo extends CrudRepository<Adresse, Integer> {

    @Override
    List<Adresse> findAll();

}
