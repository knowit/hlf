package no.hlf.godlyd.api.services.implementations;

import no.hlf.godlyd.api.exception.AccessDeniedException;
import no.hlf.godlyd.api.exception.ResourceNotFoundException;
import no.hlf.godlyd.api.model.Bruker;
import no.hlf.godlyd.api.model.LydutjevningVurdering;
import no.hlf.godlyd.api.model.Sted;
import no.hlf.godlyd.api.model.Vurdering;
import no.hlf.godlyd.api.repository.LydutjevningRepo;
import no.hlf.godlyd.api.services.BrukerService;
import no.hlf.godlyd.api.services.LydutjevningService;
import no.hlf.godlyd.api.services.StedService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class LydutjevningServiceImpl implements LydutjevningService {

    @Autowired
    private LydutjevningRepo lydutjevningRepo;
    @Autowired
    private VurderingServiceImpl vurderingService;
    @Autowired
    private BrukerService brukerService;
    @Autowired
    private StedService stedService;

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
    public List<Vurdering> getLydutjevningByBruker(String authorization){
        List<Vurdering> alleVurderinger = vurderingService.getVurderingerByBruker(authorization);
        Map<String, List<Vurdering>> sortert = vurderingService.sorterVurderinger(alleVurderinger);

        return sortert.get("Lydutjevningvurderinger");
    }

    @Override
    public List<Vurdering> getLydutjevningByPlaceId(String placeId){
        List<Vurdering> alleVurderinger = vurderingService.getAllVurderingerByPlaceId(placeId);
        Map<String, List<Vurdering>> sortert = vurderingService.sorterVurderinger(alleVurderinger);

        return sortert.get("Lydutjevningvurderinger");
    }

    @Override
    public LydutjevningVurdering createLydutjevning(LydutjevningVurdering lydutjevning, String authorization) {
        Sted sted = stedService.updateSted(lydutjevning.getSted().getPlaceId());
        Bruker bruker = brukerService.updateBruker(authorization);
        LydutjevningVurdering i = new LydutjevningVurdering();
        i.setSted(sted);
        i.setRegistrator(bruker);
        i.setDato(lydutjevning.getDato());
        i.setRangering(lydutjevning.isRangering());
        i.setKommentar(lydutjevning.getKommentar());
        return lydutjevningRepo.save(i);
    }

    @Override
    public LydutjevningVurdering updateLydutjevning(Integer id, LydutjevningVurdering endring, String authorization){
        if(lydutjevningRepo.existsById(id)){
            LydutjevningVurdering lydutjevning = getLydutjevningFromId(id);
            Bruker bruker = brukerService.updateBruker(authorization);
            if(lydutjevning.getRegistrator().getId().equals(bruker.getId())){
                lydutjevning.setKommentar(endring.getKommentar());
                lydutjevning.setRangering(endring.isRangering());
                lydutjevning.setDato(endring.getDato());
                return lydutjevningRepo.save(lydutjevning);
            } else{
                throw new AccessDeniedException("alter", "Lydutjevningvurdering", "id", id);   // Placeholder
            }
        } else{
            throw new ResourceNotFoundException("Lydutjevningvurdering", "id", id);
        }
    }

}
