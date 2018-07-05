package no.hlf.godlyd.api.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import no.hlf.godlyd.api.Vurderingsstatistikk;
import no.hlf.godlyd.api.model.Sted;
import no.hlf.godlyd.api.model.Vurdering;
import no.hlf.godlyd.api.services.StedService;

import no.hlf.godlyd.api.services.VurderingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


// This is the REST API
@RestController
@RequestMapping("/steder")
public class StedController {

    @Autowired
    StedService stedService;
    @Autowired
    VurderingService vurderingService;

    // Hent ut all info om et sted gitt en placeId. Denne bruker appen til å hente ønsket info!

    @GetMapping()
    public List<Sted> getAllSteder(){
        return stedService.getAllSteder();
    }

    @GetMapping("/id={id}")
    public Sted getStedById(@PathVariable(value = "id") Integer id){
        return stedService.getStedFromId(id);
    }

    @GetMapping("/placeId={placeId}")
    public Sted getStedByPlaceId(@PathVariable(value = "placeId") String placeId){
        return stedService.getStedFromPlaceId(placeId);
    }

    // BRUKER GOOGLE API
    @GetMapping("/info/{placeId}")
    public String getStedInfoByPlaceId(@PathVariable(value = "placeId") String placeId){
        RestTemplate restTemplate = new RestTemplate();
        String uri = "https://maps.googleapis.com/maps/api/place/details/json?placeid={PLACE_ID}" +
                "&language=no&fields=name,place_id,formatted_address,formatted_phone_number," +
                "international_phone_number,website,opening_hours,type,scope,url&key={API_KEY}";

        String result = restTemplate.getForObject(uri, String.class, placeId,
                "AIzaSyAc1T0RZlE1CO1mCathSjl29WPZs5GS47U");

        return result;
    }

    /*
    @GetMapping("/navn={navn}")
    public List<Sted> getStederByNavn(@PathVariable(value = "navn") String navn){
        return stedService.getStederByNavn(navn);
    }

    @GetMapping("/tagId={tag}")
    public List<Sted> getStederByTag(@PathVariable(value = "tag") Integer tagid){
        return stedService.getStederByTag(tagid);
    }

    @GetMapping("/adresseId={adresse}")
    public List<Sted> getStederByAdresse(@PathVariable(value = "adresse") Integer adresseid){
        return stedService.getStederByAdresse(adresseid);
    }
    */
    @GetMapping("/{id}/totalvurdering")
    public Map<String, Object> getTotalvurderingForSted(@PathVariable(value = "id") Integer id){
        List<Vurdering> vurderinger = vurderingService.getVurderingerBySted(id);
        Map<String, List<Vurdering>> sorterteVurderinger = vurderingService.sorterVurderinger(vurderinger);

        Map<String, Object> map = new HashMap<>();

        map.put("Sted", stedService.getStedFromId(id));
        map.put("Totalt antall vurderinger", vurderinger.size());
        map.put("Teleslyngevurderinger", new Vurderingsstatistikk(sorterteVurderinger.get("Teleslyngevurderinger")));
        map.put("Lydforholdvurderinger", new Vurderingsstatistikk(sorterteVurderinger.get("Lydforholdvurderinger")));

        return map;
    }

    // Opprette et nytt sted
    @PostMapping()
    @ResponseStatus(HttpStatus.CREATED)
    public Sted createSted(@RequestBody Sted sted){
        return stedService.createSted(sted);
    }

    // Slett et sted
    @DeleteMapping("/id={id}")
    public ResponseEntity<?> deleteSted(@PathVariable(value = "id") Integer id){
        return stedService.deleteSted(id);
    }

}
