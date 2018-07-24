package no.hlf.godlyd.api.services.implementations;

import no.hlf.godlyd.api.exception.AccessDeniedException;
import no.hlf.godlyd.api.exception.ResourceNotFoundException;
import no.hlf.godlyd.api.model.Bruker;
import no.hlf.godlyd.api.model.InformasjonVurdering;
import no.hlf.godlyd.api.model.Sted;
import no.hlf.godlyd.api.model.Vurdering;
import no.hlf.godlyd.api.repository.InformasjonRepo;
import no.hlf.godlyd.api.repository.VurderingRepo;
import no.hlf.godlyd.api.services.BrukerService;
import no.hlf.godlyd.api.services.InformasjonService;
import no.hlf.godlyd.api.services.StedService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class InformasjonServiceImpl implements InformasjonService {

    @Autowired
    private InformasjonRepo informasjonRepo;
    @Autowired
    private VurderingRepo vurderingRepo;
    @Autowired
    private VurderingServiceImpl vurderingService;
    @Autowired
    private BrukerService brukerService;
    @Autowired
    private StedService stedService;

    // Methods:
    @Override
    public List<InformasjonVurdering> getAllInformasjon() {
        return (List<InformasjonVurdering>) informasjonRepo.findAll();
    }

    @Override
    public InformasjonVurdering getInformasjonFromId(Integer id) {
        return informasjonRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Informasjon", "id", id));
    }

    @Override
        public List<Vurdering> getInformasjonByBruker(String access_token) {
        Integer brukerid = brukerService.updateBruker(access_token).getId();
        List<Vurdering> alleVurderinger = vurderingRepo.findByRegistrator(brukerid);
        Map<String, List<Vurdering>> sortert = vurderingService.sorterVurderinger(alleVurderinger);

        return sortert.get("Informasjonvurderinger");
    }

    @Override
    public List<Vurdering> getInformasjonByPlaceId(String placeId){
        List<Vurdering> alleVurderinger = vurderingRepo.findByPlaceId(placeId);
        Map<String, List<Vurdering>> sortert = vurderingService.sorterVurderinger(alleVurderinger);

        return sortert.get("Informasjonvurderinger");
    }

    @Override
    public InformasjonVurdering createInformasjon(InformasjonVurdering informasjon, String access_token) {
        Bruker bruker = brukerService.updateBruker(access_token);
        informasjon.setRegistrator(bruker);
        Sted sted = stedService.getStedFromPlaceId(informasjon.getSted().getPlaceId());
        if (sted != null){
            sted.addVurdering(informasjon);
        }
        return informasjonRepo.save(informasjon);
    }

    @Override
    public InformasjonVurdering updateInformasjon(Integer id, InformasjonVurdering endring, String access_token){
        InformasjonVurdering informasjonvurdering = getInformasjonFromId(id);
        Integer brukerId = brukerService.updateBruker(access_token).getId();
        if(informasjonvurdering.getRegistrator().getId().equals(brukerId)){
            informasjonvurdering.setKommentar(endring.getKommentar());
            informasjonvurdering.setRangering(endring.isRangering());
            return informasjonvurdering;
        } else{
            throw new AccessDeniedException("alter", "informasjonsvurdering, id: "+id);
        }
    }
}
