package no.hlf.godlyd.api.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import no.hlf.godlyd.api.Vurderingsstatistikk;
import no.hlf.godlyd.api.exception.ResourceNotFoundException;
import no.hlf.godlyd.api.model.Sted;
import no.hlf.godlyd.api.model.Vurdering;
import no.hlf.godlyd.api.services.StedService;
import no.hlf.godlyd.api.services.VurderingService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/steder")
public class StedController {

    @Autowired
    StedService stedService;
    @Autowired
    VurderingService vurderingService;

    private static final Logger logger = LoggerFactory.getLogger(StedController.class);

    @GetMapping()
    public List<Sted> getAllSteder(){
        return stedService.getAllSteder();
    }

    @GetMapping("/{id}")
    public Sted getStedById(@PathVariable(value = "id") Integer id){
        return stedService.getStedFromId(id);
    }

    @GetMapping("/place/{placeId}")
    public Sted getStedByPlaceId(@PathVariable(value = "placeId") String placeId){
        return stedService.getStedFromPlaceId(placeId);
    }

    // GOOGLE API
    @GetMapping("/info/place/{placeId}")
    public Map<String, Object> getStedInfoByPlaceId(@PathVariable(value = "placeId") String placeId) throws IOException {
        String API_KEY = "AIzaSyAh4aY8MmtOlCx1iDHYI4Z8c3P5VVgK2IY";
        RestTemplate restTemplate = new RestTemplate();
        String uri = "https://maps.googleapis.com/maps/api/place/details/json?placeid={PLACE_ID}" +
                "&language=no&fields=name,place_id,formatted_address,formatted_phone_number," +
                "international_phone_number,website,opening_hours,type,scope,url&key={API_KEY}";

        String result = restTemplate.getForObject(uri, String.class, placeId, API_KEY);
        JsonNode jsonNode = (new ObjectMapper()).readTree(result);

        if(! stedService.existsByPlaceId(placeId)) stedService.opprettSted(new Sted(placeId));

        Sted sted = stedService.getStedFromPlaceId(placeId);
        Map<String, Object> map = new HashMap<>();
        map.put("Google Places API", jsonNode);
        map.put("Sted", sted);

        return map;
    }

    @GetMapping("/place/{placeId}/totalvurdering/{google}")
    public Map<String, Object> getTotalvurderingForSted(@PathVariable(value = "placeId") String placeId,
                                                        @PathVariable(value = "google") boolean googleinfo) throws IOException {

        if(! stedService.existsByPlaceId(placeId)) stedService.opprettSted(new Sted(placeId));

        Map<String, Object> map = vurderingService.getTotalVurderingStatistikk(placeId);

        if (googleinfo) {
            map = getStedInfoByPlaceId(placeId);
        } else {
            map.put("Sted", stedService.getStedFromPlaceId(placeId));
        }

        vurderingService
                .getTotalVurderingStatistikk(placeId)
                .forEach((map::put));

        return map;
    }
}
