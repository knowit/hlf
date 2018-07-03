package no.hlf.godlyd.api.services.implementations;

import no.hlf.godlyd.api.exception.ResourceNotFoundException;
import no.hlf.godlyd.api.model.Adresse;
import no.hlf.godlyd.api.repository.AdresseRepo;
import no.hlf.godlyd.api.services.AdresseService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

// Purpose: Implementation of all service methods for accessing addresses

@Service
public class AdresseServiceImpl implements AdresseService {

    private final AdresseRepo adresseRepo;

    public AdresseServiceImpl(AdresseRepo adresseRepo) {
        this.adresseRepo = adresseRepo;
    }

    // Methods:
    public List<Adresse> getAllAdresser(){
        return adresseRepo.findAll();
    }

    public Adresse createAdresse(Adresse adresse){
        return adresseRepo.save(adresse);
    }

    public Adresse getAdresseFromId(Integer id){
        return adresseRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Adresse", "id", id));
    }

    public ResponseEntity<?> deleteAdresse(Integer id){
        Adresse adresse = adresseRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Adresse", "id", id));

        adresseRepo.delete(adresse);
        return ResponseEntity.ok().build();
    }

}
