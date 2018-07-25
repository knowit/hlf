package no.hlf.godlyd.api.services.implementations;

import no.hlf.godlyd.api.exception.AccessDeniedException;
import no.hlf.godlyd.api.exception.ResourceNotFoundException;
import no.hlf.godlyd.api.model.Bruker;
import no.hlf.godlyd.api.model.LydforholdVurdering;
import no.hlf.godlyd.api.model.Sted;
import no.hlf.godlyd.api.model.Vurdering;
import no.hlf.godlyd.api.repository.LydforholdRepo;
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
        List<Vurdering> alleVurderinger = vurderingService.getVurderingerByBruker(authorization);
        Map<String, List<Vurdering>> sortert = vurderingService.sorterVurderinger(alleVurderinger);

        return sortert.get("Lydforholdvurderinger");
    }

    @Override
    public List<Vurdering> getLydforholdByPlaceId(String placeId){
        List<Vurdering> alleVurderinger = vurderingService.getAllVurderingerByPlaceId(placeId);
        Map<String, List<Vurdering>> sortert = vurderingService.sorterVurderinger(alleVurderinger);

        return sortert.get("Lydforholdvurderinger");
    }
    @Override
    public LydforholdVurdering createLydforhold(LydforholdVurdering lydforhold, String authorization) {
        Sted sted = stedService.updateSted(lydforhold.getSted().getPlaceId());
        Bruker bruker = brukerService.updateBruker(authorization);
        LydforholdVurdering i = new LydforholdVurdering();
        i.setSted(sted);
        i.setRegistrator(bruker);
        i.setDato(lydforhold.getDato());
        i.setRangering(lydforhold.isRangering());
        i.setKommentar(lydforhold.getKommentar());
        return lydforholdRepo.save(i);
    }

    @Override
    public LydforholdVurdering updateLydforhold(Integer id, LydforholdVurdering endring, String authorization){
        if(lydforholdRepo.existsById(id)){
            LydforholdVurdering lydforhold = getLydforholdFromId(id);
            Bruker bruker = brukerService.updateBruker(authorization);
            if(lydforhold.getRegistrator().getId().equals(bruker.getId())){
                lydforhold.setKommentar(endring.getKommentar());
                lydforhold.setRangering(endring.isRangering());
                lydforhold.setDato(endring.getDato());
                return lydforholdRepo.save(lydforhold);
            } else{
                throw new AccessDeniedException("alter", "Lydforholdvurdering", "id", id);   // Placeholder
            }
        } else{
            throw new ResourceNotFoundException("Lydforholdvurdering", "id", id);
        }
    }
}
