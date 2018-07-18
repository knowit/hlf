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

    // GOOGLE API
    @GetMapping("/info/{placeId}")
    public Map<String, Object> getStedInfoByPlaceId(@PathVariable(value = "placeId") String placeId) throws IOException {
        String API_KEY = "AIzaSyAh4aY8MmtOlCx1iDHYI4Z8c3P5VVgK2IY";
        RestTemplate restTemplate = new RestTemplate();
        String uri = "https://maps.googleapis.com/maps/api/place/details/json?placeid={PLACE_ID}" +
                "&language=no&fields=name,place_id,formatted_address,formatted_phone_number," +
                "international_phone_number,website,opening_hours,type,scope,url&key={API_KEY}";

        String result = restTemplate.getForObject(uri, String.class, placeId, API_KEY);
        JsonNode jsonNode = (new ObjectMapper()).readTree(result);

        Sted sted = stedService.getStedFromPlaceId(placeId);

        Map<String, Object> map = new HashMap<>();
        map.put("Google Places API", jsonNode);
        map.put("Sted", sted);

        return map;
    }

    @GetMapping("/{placeId}/totalvurdering/{google}")
    public Map<String, Object> getTotalvurderingForSted(@PathVariable(value = "placeId") String placeId,
                                                        @PathVariable(value = "google") boolean googleinfo) throws IOException {
        Map<String, Object> map = new HashMap<>();
        if (googleinfo) {
            map = getStedInfoByPlaceId(placeId);
        } else {
            map.put("Sted", stedService.getStedFromPlaceId(placeId));
        }

        if (stedService.existsByPlaceId(placeId)){
            List<Vurdering> vurderinger = vurderingService.getAllVurderingerByPlaceId(placeId);
            Map<String, List<Vurdering>> sorterteVurderinger = vurderingService.sorterVurderinger(vurderinger);


            map.put("Totalt antall vurderinger", vurderinger.size());
            map.put("Teleslyngevurderinger", new Vurderingsstatistikk(sorterteVurderinger.get("Teleslyngevurderinger")));
            map.put("Lydforholdvurderinger", new Vurderingsstatistikk(sorterteVurderinger.get("Lydforholdvurderinger")));
            map.put("Lydutjevningvurderinger", new Vurderingsstatistikk(sorterteVurderinger.get("Lydutjevningvurderinger")));
            map.put("Informasjonvurderinger", new Vurderingsstatistikk(sorterteVurderinger.get("Informasjonvurderinger")));
        }

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
