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
        Bruker bruker = brukerService.updateBruker(authorization);
        lydutjevning.setRegistrator(bruker);
        Sted sted = stedService.updateSted(lydutjevning.getSted().getPlaceId());
        if (sted != null){
            sted.addVurdering(lydutjevning);
        }
        return lydutjevningRepo.save(lydutjevning);
    }

    @Override
    public LydutjevningVurdering updateLydutjevning(Integer id, LydutjevningVurdering endring, String authorization){
        LydutjevningVurdering lydutjevningvurdering = getLydutjevningFromId(id);
        Integer brukerId = brukerService.updateBruker(authorization).getId();
        if(lydutjevningvurdering.getRegistrator().getId().equals(brukerId)){
            lydutjevningvurdering.setKommentar(endring.getKommentar());
            lydutjevningvurdering.setRangering(endring.isRangering());
            return lydutjevningRepo.save(lydutjevningvurdering);
        } else{
            throw new AccessDeniedException("alter", "lydutjevningvurdering, id: "+id);
        }
    }

}
