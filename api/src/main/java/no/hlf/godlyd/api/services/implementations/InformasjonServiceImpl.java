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
        public List<Vurdering> getInformasjonByBruker(String authorization) {
        List<Vurdering> alleVurderinger = vurderingService.getVurderingerByBruker(authorization);
        Map<String, List<Vurdering>> sortert = vurderingService.sorterVurderinger(alleVurderinger);

        return sortert.get("Informasjonvurderinger");
    }

    @Override
    public List<Vurdering> getInformasjonByPlaceId(String placeId){
        List<Vurdering> alleVurderinger = vurderingService.getAllVurderingerByPlaceId(placeId);
        Map<String, List<Vurdering>> sortert = vurderingService.sorterVurderinger(alleVurderinger);

        return sortert.get("Informasjonvurderinger");
    }

    @Override
    public InformasjonVurdering createInformasjon(InformasjonVurdering informasjon, String authorization) {
        Sted sted = stedService.updateSted(informasjon.getSted().getPlaceId());
        Bruker bruker = brukerService.updateBruker(authorization);
        InformasjonVurdering i = new InformasjonVurdering();
        i.setSted(sted);
        i.setRegistrator(bruker);
        i.setDato(informasjon.getDato());
        i.setRangering(informasjon.isRangering());
        i.setKommentar(informasjon.getKommentar());
        return informasjonRepo.save(i);
    }

    @Override
    public InformasjonVurdering updateInformasjon(Integer id, InformasjonVurdering endring, String authorization){
        if(informasjonRepo.existsById(id)){
            InformasjonVurdering informasjon = getInformasjonFromId(id);
            Bruker bruker = brukerService.updateBruker(authorization);
            if(informasjon.getRegistrator().getId().equals(bruker.getId())){
                informasjon.setKommentar(endring.getKommentar());
                informasjon.setRangering(endring.isRangering());
                informasjon.setDato(endring.getDato());
                return informasjonRepo.save(informasjon);
            } else{
                throw new AccessDeniedException("alter", "Informasjonsvurdering", "id", id);   // Placeholder
            }
        } else{
            throw new ResourceNotFoundException("Informasjonsvurdering", "id", id);
        }
    }
}
