package no.hlf.godlyd.api.services.implementations;

import no.hlf.godlyd.api.exception.ResourceNotFoundException;
import no.hlf.godlyd.api.model.Sted;
import no.hlf.godlyd.api.repository.StedRepo;
import no.hlf.godlyd.api.services.StedService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StedServiceImpl implements StedService {

    @Autowired
    private StedRepo stedRepo;

    @Override
    public List<Sted> getAllSteder() {
        return (List<Sted>) stedRepo.findAll();
    }

    @Override
    public boolean existsByPlaceId(String placeId){ return stedRepo.existsByPlaceId(placeId);}

    @Override
    public Sted getStedFromId(Integer id) {
        return stedRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Sted", "id", id));
    }

    @Override
    public Sted getStedFromPlaceId(String placeId) {
        Sted sted = stedRepo.findByPlaceId(placeId);
        if (sted != null) {
            return sted;
        } else {
            throw new ResourceNotFoundException("Sted", "placeId", placeId);
        }
    }

    @Override
    public Sted updateSted(Sted s){
        Sted sted = stedRepo.findByPlaceId(s.getPlaceId());

        if(sted == null){
            sted = new Sted(s.getPlaceId());
            stedRepo.save(sted);
        }

        return sted;
    }

    public Sted opprettSted(Sted s) {
        return stedRepo.save(s);
    }
}
