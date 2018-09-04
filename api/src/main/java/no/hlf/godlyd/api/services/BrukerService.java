package no.hlf.godlyd.api.services;

import no.hlf.godlyd.api.model.Bruker;
import java.util.List;

public interface BrukerService {

    Bruker getBrukerFromAuth0UserId(String auth0UserId);

    Bruker getBrukerFromId(Integer id);

    Bruker updateBruker(String authorization);

    List<Bruker> getAllBrukere();

}
