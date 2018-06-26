package no.hlf.godlyd.api.controller;

import no.hlf.godlyd.api.model.Adresse;
import no.hlf.godlyd.api.services.AdresseService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import java.util.List;


// This is the REST API
@RestController
@RequestMapping("/adresser") //declares that the url for all the apis in this controller will start with /godlyd/api.
public class AdresseController {

    @Autowired
    AdresseService adresseService;

    // Hent alle adresser
    @GetMapping()
    public List<Adresse> getAllAdresser(){
        return adresseService.getAllAdresser();
    }

    // Hent en enkelt adresse gitt en id
    @GetMapping("/id={id}")
    public Adresse getAdresseFromId(@PathVariable(value = "id") Integer id){
        return adresseService.getAdresseFromId(id);
    }

    // Opprette en ny adresse
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping()
    public Adresse createAdresse(@RequestBody Adresse adresse){
        return adresseService.createAdresse(adresse);
    }

    // Slett en adresse
    @DeleteMapping()
    public ResponseEntity<?> deleteAdresse(@PathVariable(value = "id") Integer id){
        return adresseService.deleteAdresse(id);
    }

}
