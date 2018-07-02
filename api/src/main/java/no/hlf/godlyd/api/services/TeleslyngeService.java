package no.hlf.godlyd.api.services;

import no.hlf.godlyd.api.model.Bruker;
import no.hlf.godlyd.api.model.TeleslyngeVurdering;

import java.util.List;

public interface TeleslyngeService {

    List<TeleslyngeVurdering> getAllTeleslynger();

    TeleslyngeVurdering getTeleslyngeFromId(Integer id);

   // List<TeleslyngeVurdering> getTeleslyngerByBruker(Bruker bruker);

    // getVurderingerBySted ?

    TeleslyngeVurdering createTeleslynge(TeleslyngeVurdering teleslynge);
}
