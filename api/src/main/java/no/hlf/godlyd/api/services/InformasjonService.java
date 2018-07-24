package no.hlf.godlyd.api.services;

import no.hlf.godlyd.api.model.InformasjonVurdering;
import no.hlf.godlyd.api.model.Vurdering;

import java.util.List;

public interface InformasjonService {

    List<InformasjonVurdering> getAllInformasjon();

    InformasjonVurdering getInformasjonFromId(Integer id);

    List<Vurdering> getInformasjonByBruker(String access_token);

    List<Vurdering> getInformasjonByPlaceId(String placeId);

    InformasjonVurdering createInformasjon(InformasjonVurdering informasjon, String access_token);

    InformasjonVurdering updateInformasjon(Integer id, InformasjonVurdering endring, String access_token);

}
