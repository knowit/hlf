package no.hlf.godlyd.api.services.implementations;

import no.hlf.godlyd.api.exception.ResourceNotFoundException;
import no.hlf.godlyd.api.model.LydutjevningVurdering;
import no.hlf.godlyd.api.model.Vurdering;
import no.hlf.godlyd.api.repository.LydutjevningRepo;
import no.hlf.godlyd.api.repository.VurderingRepo;
import no.hlf.godlyd.api.services.LydutjevningService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class LydutjevningServiceImpl implements LydutjevningService {

    @Autowired
    private LydutjevningRepo lydutjevningRepo;
    @Autowired
    private VurderingRepo vurderingRepo;
    @Autowired
    private VurderingServiceImpl vurderingService;

    // Methods:
    @Override
    public List<LydutjevningVurdering> getAllLydutjevninger() {
        return (List<LydutjevningVurdering>) lydutjevningRepo.findAll();
    }

    @Override
    public LydutjevningVurdering getLydutjevningFromId(Integer id) {
        return lydutjevningRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Lydutjevning", "id", id));
    }

    @Override
    public List<Vurdering> getLydutjevningByBruker(Integer brukerid) {
        List<Vurdering> alleVurderinger = vurderingRepo.findByRegistrator(brukerid);
        Map<String, List<Vurdering>> sortert = vurderingService.sorterVurderinger(alleVurderinger);

        return sortert.get("Lydutjevningvurderinger");
    }

    @Override
    public List<Vurdering> getLydutjevningByPlaceId(String placeId){
        List<Vurdering> alleVurderinger = vurderingRepo.findByPlaceId(placeId);
        Map<String, List<Vurdering>> sortert = vurderingService.sorterVurderinger(alleVurderinger);

        return sortert.get("Lydutjevningvurderinger");
    }

    @Override
    public LydutjevningVurdering createLydutjevning(LydutjevningVurdering lydutjevning) {
        return lydutjevningRepo.save(lydutjevning);
    }

}
