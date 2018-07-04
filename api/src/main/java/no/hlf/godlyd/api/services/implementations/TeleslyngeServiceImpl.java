package no.hlf.godlyd.api.services.implementations;

import no.hlf.godlyd.api.exception.ResourceNotFoundException;
import no.hlf.godlyd.api.model.TeleslyngeVurdering;
import no.hlf.godlyd.api.repository.TeleslyngeRepo;
import no.hlf.godlyd.api.services.TeleslyngeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TeleslyngeServiceImpl implements TeleslyngeService {

    @Autowired
    private TeleslyngeRepo teleslyngeRepo;

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

    /*
    @Override
    public List<TeleslyngeVurdering> getTeleslyngerByBruker(Bruker bruker) {
        return null; //teleslyngeRepo.findByRegistrator(bruker);
    }
    */

    @Override
    public TeleslyngeVurdering createTeleslynge(TeleslyngeVurdering teleslynge) {
        return teleslyngeRepo.save(teleslynge);
    }

}
