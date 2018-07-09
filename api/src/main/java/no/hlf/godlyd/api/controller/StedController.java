package no.hlf.godlyd.api.controller;

import com.fasterxml.jackson.databind.JsonNode;
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

import java.io.IOException;
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

    @GetMapping("/id/{id}")
    public Sted getStedById(@PathVariable(value = "id") Integer id){
        return stedService.getStedFromId(id);
    }

    @GetMapping("/placeId/{placeId}")
    public Sted getStedByPlaceId(@PathVariable(value = "placeId") String placeId){
        return stedService.getStedFromPlaceId(placeId);
    }

    // BRUKER GOOGLE API
    @GetMapping("/info/{placeId}")
    public Map<String, Object> getStedInfoByPlaceId(@PathVariable(value = "placeId") String placeId) throws IOException {
        RestTemplate restTemplate = new RestTemplate();
        String uri = "https://maps.googleapis.com/maps/api/place/details/json?placeid={PLACE_ID}" +
                "&language=no&fields=name,place_id,formatted_address,formatted_phone_number," +
                "international_phone_number,website,opening_hours,type,scope,url&key={API_KEY}";

        String result = restTemplate.getForObject(uri, String.class, placeId,
                "AIzaSyAc1T0RZlE1CO1mCathSjl29WPZs5GS47U");
        JsonNode jsonNode = (new ObjectMapper()).readTree(result);

        Sted sted = stedService.getStedFromPlaceId(placeId);

        Map<String, Object> map = new HashMap<>();
        map.put("Google Places API", jsonNode);
        map.put("Lydpatruljen", sted);

        return map;
    }

    @GetMapping("/{id}/totalvurdering")
    public Map<String, Object> getTotalvurderingForSted(@PathVariable(value = "id") Integer id){
        List<Vurdering> vurderinger = vurderingService.getVurderingerByStedId(id);
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
    @DeleteMapping("/id/{id}")
    public ResponseEntity<?> deleteSted(@PathVariable(value = "id") Integer id){
        return stedService.deleteSted(id);
    }

}
