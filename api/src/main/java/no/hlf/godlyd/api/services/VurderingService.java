package no.hlf.godlyd.api.services;

import no.hlf.godlyd.api.model.Bruker;
import no.hlf.godlyd.api.model.Sted;
import no.hlf.godlyd.api.model.Vurdering;

import java.util.List;
import java.util.Map;

public interface VurderingService {

    Map<String, List<Vurdering>> getAllVurderinger();

    List<Vurdering> getVurderingerBySted(Sted sted);

    Vurdering getVurderingFromId(Integer id);

    List<Vurdering> getVurderingerByBruker(Bruker bruker);

    // getVurderingerBySted ?

    Vurdering createVurdering(Vurdering vurdering);

    Map<String, List<Vurdering>> sorterVurderinger(List<Vurdering> vurderinger);
}
