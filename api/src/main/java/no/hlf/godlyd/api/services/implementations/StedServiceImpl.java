package no.hlf.godlyd.api.services.implementations;

import com.fasterxml.jackson.databind.JsonNode;
import no.hlf.godlyd.api.exception.ResourceNotFoundException;
import no.hlf.godlyd.api.model.Sted;
import no.hlf.godlyd.api.model.StedInformasjon;
import no.hlf.godlyd.api.repository.StedInformasjonRepo;
import no.hlf.godlyd.api.repository.StedRepo;
import no.hlf.godlyd.api.services.KartService;
import no.hlf.godlyd.api.services.StedService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
public class StedServiceImpl implements StedService {

    @Autowired
    private StedRepo stedRepo;

    @Autowired
    private StedInformasjonRepo stedInformasjonRepo;

    @Autowired
    private KartService kartService;

    private static final Logger logger = LoggerFactory.getLogger(StedServiceImpl.class);

    // Methods:
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
    public Sted updateSted(String placeId){
        Sted sted = stedRepo.findByPlaceId(placeId);
        StedInformasjon stedInformasjon = stedInformasjonRepo.findByPlaceId(placeId);

        if(sted == null){
            sted = new Sted(placeId);
            stedRepo.save(sted);
        }

        if(stedInformasjon == null) {
            try {
                String stedsnavn = kartService.getStedsNavnFromPlaceId(placeId);
                stedInformasjon = new StedInformasjon(placeId, stedsnavn);
                stedInformasjonRepo.save(stedInformasjon);
                logger.info("lagret ny stedsinformasjon i databasen");
            } catch(IOException e) {
                logger.info("could not get contact with google maps");
            }
        }
        return sted;
    }
}
