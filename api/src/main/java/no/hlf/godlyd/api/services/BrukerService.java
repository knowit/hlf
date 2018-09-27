package no.hlf.godlyd.api.services;

import no.hlf.godlyd.api.model.Bruker;

import java.util.List;
import java.util.Optional;

public interface BrukerService {
    Optional<Bruker> getBrukerFromAuth0UserId(String auth0UserId);
    Bruker getBrukerFromId(Integer id);
    Bruker updateBruker(String authorization);
    Bruker getBrukerFromAuthToken(String authorization);
    List<Bruker> getAllBrukere();
    boolean deleteMyAccount(String authorization);
}
