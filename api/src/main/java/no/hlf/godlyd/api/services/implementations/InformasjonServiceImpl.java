package no.hlf.godlyd.api.services.implementations;

import no.hlf.godlyd.api.exception.ResourceNotFoundException;
import no.hlf.godlyd.api.model.InformasjonVurdering;
import no.hlf.godlyd.api.model.Vurdering;
import no.hlf.godlyd.api.repository.InformasjonRepo;
import no.hlf.godlyd.api.repository.VurderingRepo;
import no.hlf.godlyd.api.services.InformasjonService;
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
    public List<Vurdering> getInformasjonByBruker(Integer brukerid) {
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
    public InformasjonVurdering createInformasjon(InformasjonVurdering informasjon) {
        return informasjonRepo.save(informasjon);
    }

}
