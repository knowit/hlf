package no.hlf.godlyd.api.services.implementations;

import no.hlf.godlyd.api.exception.AccessDeniedException;
import no.hlf.godlyd.api.exception.ResourceNotFoundException;
import no.hlf.godlyd.api.model.Bruker;
import no.hlf.godlyd.api.model.Sted;
import no.hlf.godlyd.api.model.TeleslyngeVurdering;
import no.hlf.godlyd.api.model.Vurdering;
import no.hlf.godlyd.api.repository.TeleslyngeRepo;
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
        List<Vurdering> alleVurderinger = vurderingService.getVurderingerByBruker(authorization);
        Map<String, List<Vurdering>> sortert = vurderingService.sorterVurderinger(alleVurderinger);

        return sortert.get("Teleslyngevurderinger");
    }

    @Override
    public List<Vurdering> getTeleslyngerByPlaceId(String placeId){
        List<Vurdering> alleVurderinger = vurderingService.getAllVurderingerByPlaceId(placeId);
        Map<String, List<Vurdering>> sortert = vurderingService.sorterVurderinger(alleVurderinger);

        return sortert.get("Teleslyngevurderinger");
    }

    @Override
    public TeleslyngeVurdering createTeleslynge(TeleslyngeVurdering teleslynge, String authorization) {
        Sted sted = stedService.updateSted(teleslynge.getSted().getPlaceId());
        Bruker bruker = brukerService.updateBruker(authorization);
        TeleslyngeVurdering i = new TeleslyngeVurdering();
        i.setSted(sted);
        i.setRegistrator(bruker);
        i.setDato(teleslynge.getDato());
        i.setRangering(teleslynge.isRangering());
        i.setKommentar(teleslynge.getKommentar());
        return teleslyngeRepo.save(i);
    }

    @Override
    public TeleslyngeVurdering updateTeleslynge(Integer id, TeleslyngeVurdering endring, String authorization){
        if(teleslyngeRepo.existsById(id)){
            TeleslyngeVurdering teleslynge = getTeleslyngeFromId(id);
            Bruker bruker = brukerService.updateBruker(authorization);
            if(teleslynge.getRegistrator().getId().equals(bruker.getId())){
                teleslynge.setKommentar(endring.getKommentar());
                teleslynge.setRangering(endring.isRangering());
                teleslynge.setDato(endring.getDato());
                return teleslyngeRepo.save(teleslynge);
            } else{
                throw new AccessDeniedException("alter", "Teleslyngevurdering", "id", id);   // Placeholder
            }
        } else{
            throw new ResourceNotFoundException("Teleslyngevurdering", "id", id);
        }
    }



}
