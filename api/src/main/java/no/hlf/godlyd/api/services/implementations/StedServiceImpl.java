package no.hlf.godlyd.api.services.implementations;

import no.hlf.godlyd.api.exception.ResourceNotFoundException;
import no.hlf.godlyd.api.model.Adresse;
import no.hlf.godlyd.api.model.Sted;
import no.hlf.godlyd.api.model.Tag;
import no.hlf.godlyd.api.repository.StedRepo;
import no.hlf.godlyd.api.services.StedService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StedServiceImpl implements StedService {

    @Autowired
    private StedRepo stedRepo;

    //public StedServiceImpl(StedRepo stedRepo) {this.stedRepo = stedRepo;}

    // Methods:
    @Override
    public List<Sted> getAllSteder() {
        return (List<Sted>) stedRepo.findAll();
    }

    @Override
    public Sted getStedFromId(Integer id) {
        return stedRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Sted", "id", id));
    }

    @Override
    public Sted getStedFromPlacesId(String placesId) {
        return stedRepo.findByPlacesId(placesId);
    }

    @Override
    public List<Sted> getStederByNavn(String navn) {
        //if (!stedRepo.existsByNavnIgnoreCase(navn)){ throw new ResourceNotFoundException("Sted", "navn", navn); }
        return stedRepo.findByNavnIgnoreCase(navn);
    }

    @Override
    public List<Sted> getStederByTag(Tag tag) {
        return stedRepo.findByTags(tag);
    }

    @Override
    public List<Sted> getStederByAdresse(Adresse adresse){
        return stedRepo.findByAdresse(adresse);
    }

    @Override
    public Sted createSted(Sted sted) {
        return stedRepo.save(sted);
    }

    @Override
    public ResponseEntity<?> deleteSted(Integer id) {
        Sted sted = stedRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Sted", "id", id));

        stedRepo.delete(sted);
        return ResponseEntity.ok().build();
    }
}
