package no.hlf.godlyd.api.services.implementations;

import no.hlf.godlyd.api.exception.AccessDeniedException;
import no.hlf.godlyd.api.exception.ResourceNotFoundException;
import no.hlf.godlyd.api.model.Bruker;
import no.hlf.godlyd.api.model.LydforholdVurdering;
import no.hlf.godlyd.api.model.Sted;
import no.hlf.godlyd.api.model.Vurdering;
import no.hlf.godlyd.api.repository.LydforholdRepo;
import no.hlf.godlyd.api.repository.VurderingRepo;
import no.hlf.godlyd.api.services.BrukerService;
import no.hlf.godlyd.api.services.LydforholdService;
import no.hlf.godlyd.api.services.StedService;
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
    @Autowired
    private BrukerService brukerService;
    @Autowired
    private StedService stedService;

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
    public List<Vurdering> getLydforholdByBruker(String authorization) {
        Integer brukerid = brukerService.updateBruker(authorization).getId();
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
    public LydforholdVurdering createLydforhold(LydforholdVurdering lydforhold, String authorization) {
        Bruker bruker = brukerService.updateBruker(authorization);
        lydforhold.setRegistrator(bruker);
        Sted sted = stedService.getStedFromPlaceId(lydforhold.getSted().getPlaceId());
        if (sted != null){
            sted.addVurdering(lydforhold);
        }
        return lydforholdRepo.save(lydforhold);
    }


    @Override
    public LydforholdVurdering updateLydforhold(Integer id, LydforholdVurdering endring, String authorization){
        LydforholdVurdering lydforholdvurdering = getLydforholdFromId(id);
        Integer brukerId = brukerService.updateBruker(authorization).getId();
        if(lydforholdvurdering.getRegistrator().getId().equals(brukerId)){
            lydforholdvurdering.setKommentar(endring.getKommentar());
            lydforholdvurdering.setRangering(endring.isRangering());
            return lydforholdvurdering;
        } else{
            throw new AccessDeniedException("alter", "lydforholdvurdering, id: "+id);
        }
    }

}
