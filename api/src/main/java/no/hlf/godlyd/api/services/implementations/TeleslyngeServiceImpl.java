package no.hlf.godlyd.api.services.implementations;

import no.hlf.godlyd.api.exception.AccessDeniedException;
import no.hlf.godlyd.api.exception.ResourceNotFoundException;
import no.hlf.godlyd.api.model.Sted;
import no.hlf.godlyd.api.model.TeleslyngeVurdering;
import no.hlf.godlyd.api.model.Vurdering;
import no.hlf.godlyd.api.repository.TeleslyngeRepo;
import no.hlf.godlyd.api.repository.VurderingRepo;
import no.hlf.godlyd.api.services.BrukerService;
import no.hlf.godlyd.api.services.StedService;
import no.hlf.godlyd.api.services.TeleslyngeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class TeleslyngeServiceImpl implements TeleslyngeService {

    @Autowired
    private TeleslyngeRepo teleslyngeRepo;
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
    public List<TeleslyngeVurdering> getAllTeleslynger() {
        return (List<TeleslyngeVurdering>) teleslyngeRepo.findAll();
    }

    @Override
    public TeleslyngeVurdering getTeleslyngeFromId(Integer id) {
        return teleslyngeRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Teleslynge", "id", id));
    }

    @Override
    public List<Vurdering> getTeleslyngerByBruker(String authorization) {
        Integer brukerid = brukerService.updateBruker(authorization).getId();
        List<Vurdering> alleVurderinger = vurderingRepo.findByRegistrator(brukerid);
        Map<String, List<Vurdering>> sortert = vurderingService.sorterVurderinger(alleVurderinger);

        return sortert.get("Teleslyngevurderinger");
    }

    @Override
    public List<Vurdering> getTeleslyngerByPlaceId(String placeId){
        List<Vurdering> alleVurderinger = vurderingRepo.findByPlaceId(placeId);
        Map<String, List<Vurdering>> sortert = vurderingService.sorterVurderinger(alleVurderinger);

        return sortert.get("Teleslyngevurderinger");
    }

    @Override
    public TeleslyngeVurdering createTeleslynge(TeleslyngeVurdering teleslynge, String authorization) {
        teleslynge.setRegistrator(brukerService.updateBruker(authorization));
        Sted sted = stedService.getStedFromPlaceId(teleslynge.getSted().getPlaceId());
        if (sted != null){
            sted.addVurdering(teleslynge);
        }
        return teleslyngeRepo.save(teleslynge);
    }

    @Override
    public TeleslyngeVurdering updateTeleslynge(Integer id, TeleslyngeVurdering endring, String authorization){

        Integer brukerId = brukerService.updateBruker(authorization).getId();
        TeleslyngeVurdering teleslyngevurdering = getTeleslyngeFromId(id);
        if(teleslyngevurdering.getRegistrator().getId().equals(brukerId)){
            teleslyngevurdering.setKommentar(endring.getKommentar());
            teleslyngevurdering.setRangering(endring.isRangering());
            return teleslyngevurdering;
        } else{
            throw new AccessDeniedException("alter", "informasjonsvurdering, id: "+id);
        }
    }



}
