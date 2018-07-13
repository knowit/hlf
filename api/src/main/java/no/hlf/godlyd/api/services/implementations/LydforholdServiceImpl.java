package no.hlf.godlyd.api.services.implementations;

import no.hlf.godlyd.api.exception.ResourceNotFoundException;
import no.hlf.godlyd.api.model.LydforholdVurdering;
import no.hlf.godlyd.api.model.Vurdering;
import no.hlf.godlyd.api.repository.LydforholdRepo;
import no.hlf.godlyd.api.repository.VurderingRepo;
import no.hlf.godlyd.api.services.LydforholdService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class LydforholdServiceImpl implements LydforholdService {

    @Autowired
    private LydforholdRepo lydforholdRepo;
    @Autowired
    private VurderingRepo vurderingRepo;
    @Autowired
    private VurderingServiceImpl vurderingService;

    // Methods:
    @Override
    public List<LydforholdVurdering> getAllLydforhold() {
        return (List<LydforholdVurdering>) lydforholdRepo.findAll();
    }

    @Override
    public LydforholdVurdering getLydforholdFromId(Integer id) {
        return lydforholdRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Lydforhold", "id", id));
    }

    @Override
    public List<Vurdering> getLydforholdByBruker(Integer brukerid) {
        List<Vurdering> alleVurderinger = vurderingRepo.findByRegistrator(brukerid);
        Map<String, List<Vurdering>> sortert = vurderingService.sorterVurderinger(alleVurderinger);

        return sortert.get("Lydforholdvurderinger");
    }

    @Override
    public List<Vurdering> getLydforholdByPlaceId(String placeId){
        List<Vurdering> alleVurderinger = vurderingRepo.findByPlaceId(placeId);
        Map<String, List<Vurdering>> sortert = vurderingService.sorterVurderinger(alleVurderinger);

        return sortert.get("Lydforholdvurderinger");
    }

    @Override
    public LydforholdVurdering createLydforhold(LydforholdVurdering lydforhold) {
        return lydforholdRepo.save(lydforhold);
    }

}
