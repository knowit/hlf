package no.hlf.godlyd.api.services;

import no.hlf.godlyd.api.model.Bruker;

import java.util.List;

public interface BrukerService {

    void save(Bruker bruker);

    Bruker findByBrukernavn(String brukernavn);

    Bruker createBruker(Bruker bruker);

    List<Bruker> getAllBrukere();

    Bruker login(Bruker bruker);

}
