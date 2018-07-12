package no.hlf.godlyd.api.services.implementations;

import no.hlf.godlyd.api.exception.ResourceNotFoundException;
import no.hlf.godlyd.api.model.TeleslyngeVurdering;
import no.hlf.godlyd.api.model.Vurdering;
import no.hlf.godlyd.api.repository.TeleslyngeRepo;
import no.hlf.godlyd.api.repository.VurderingRepo;
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
    public List<Vurdering> getTeleslyngerByBruker(Integer brukerid) {
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
    public TeleslyngeVurdering createTeleslynge(TeleslyngeVurdering teleslynge) {
        return teleslyngeRepo.save(teleslynge);
    }



}
