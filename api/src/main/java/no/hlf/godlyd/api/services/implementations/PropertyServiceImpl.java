package no.hlf.godlyd.api.services.implementations;

import no.hlf.godlyd.api.exception.AccessDeniedException;
import no.hlf.godlyd.api.exception.ResourceNotFoundException;
import no.hlf.godlyd.api.model.*;
import no.hlf.godlyd.api.repository.VurderingRepo;
import no.hlf.godlyd.api.services.BrukerService;
import no.hlf.godlyd.api.services.PropertyService;
import no.hlf.godlyd.api.services.StedService;
import no.hlf.godlyd.api.services.VurderingService;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class PropertyServiceImpl implements PropertyService {

    @Autowired
    private VurderingRepo vurderingsRepo;

    @Autowired
    private StedService stedService;

    @Autowired
    private BrukerService brukerService;

    @Autowired
    private VurderingService vurderingService;


    @Override
    public List<Vurdering> getAllPropertyReviews() {

        ArrayList<Vurdering> result  = new ArrayList<>();

        vurderingsRepo.findAll().forEach(result::add);
        return result;
    }

    @Override
    public Vurdering getPropertyReviewFromId(Integer id) {
        return vurderingsRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Informasjon", "id", id));
    }

    @Override
    public List<Vurdering> getPropertyReviewsByUser(String authorization) {
        List<Vurdering> alleVurderinger = vurderingService.getVurderingerByBruker(authorization);
        Map<String, List<Vurdering>> sortert = vurderingService.sorterVurderinger(alleVurderinger);

        return sortert.get("Informasjonvurderinger");
    }

    @Override
    public List<Vurdering> getPropertyReviewsByPlaceId(String placeId) {
        List<Vurdering> alleVurderinger = vurderingService.getAllVurderingerByPlaceId(placeId);
        Map<String, List<Vurdering>> sortert = vurderingService.sorterVurderinger(alleVurderinger);

        return sortert.get("Informasjonvurderinger");
    }

    @Override
    public Vurdering createPropertyReview(Vurdering property, String authorization) {
        Sted sted = stedService.getStedFromPlaceId(property.getSted().getPlaceId());
        if(sted==null) {
            sted = new Sted(property.getSted().getPlaceId());
        }
        Bruker bruker = brukerService.updateBruker(authorization);
        InformasjonVurdering i = new InformasjonVurdering();
        i.setSted(sted);
        i.setRegistrator(bruker);
        i.setDato(property.getDato());
        i.setRangering(property.isRangering());
        i.setKommentar(property.getKommentar());
        return vurderingsRepo.save(i);
    }

    @Override
    public Vurdering updatePropertyReview(Integer id, Vurdering endring, String authorization) {
        if(vurderingsRepo.existsById(id)){
            Vurdering informasjon = getPropertyReviewFromId(id);
            Bruker bruker = brukerService.updateBruker(authorization);
            if(informasjon.getRegistrator().getId().equals(bruker.getId())){
                informasjon.setKommentar(endring.getKommentar());
                informasjon.setRangering(endring.isRangering());
                informasjon.setDato(endring.getDato());
                return vurderingsRepo.save(informasjon);
            } else{
                throw new AccessDeniedException("alter", "Informasjonsvurdering", "id", id);   // Placeholder
            }
        } else{
            throw new ResourceNotFoundException("Informasjonsvurdering", "id", id);
        }
    }
}
