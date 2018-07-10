package no.hlf.godlyd.api.services;

import no.hlf.godlyd.api.model.Bruker;

import java.util.List;

public interface BrukerService {

    List<Bruker> getAllBrukere();

    Bruker getBrukerFromBrukernavn(String brukernavn);

}
