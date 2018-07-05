package no.hlf.godlyd.api.services;

import no.hlf.godlyd.api.model.Bruker;
import no.hlf.godlyd.api.model.Sted;
import no.hlf.godlyd.api.model.Vurdering;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;

public interface VurderingService {

    Map<String, List<Vurdering>> getAllVurderinger();

    List<Vurdering> getVurderingerBySted(Integer stedid);

    Vurdering getVurderingFromId(Integer id);

    List<Vurdering> getVurderingerByBruker(Integer brukerid);

    Vurdering createVurdering(Vurdering vurdering);

    ResponseEntity<?> deleteVurdering(Integer id);

    Map<String, List<Vurdering>> sorterVurderinger(List<Vurdering> vurderinger);
}
