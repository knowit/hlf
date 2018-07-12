package no.hlf.godlyd.api.services;

import no.hlf.godlyd.api.model.Bruker;

import java.util.List;

public interface BrukerService {

    void save(Bruker bruker);

    Bruker findByAuth0UserId(String auth0UserId);

    Bruker updateBruker(String access_token);

    List<Bruker> getAllBrukere();

    Bruker login(String authorization_code);


}
