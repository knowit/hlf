package no.hlf.godlyd.api.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import no.hlf.godlyd.api.model.Sted;
import no.hlf.godlyd.api.services.StedService;
import no.hlf.godlyd.api.services.VurderingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/sted")
public class StedController {

    @Autowired
    private StedService stedService;
    @Autowired
    private VurderingService vurderingService;

    @GetMapping()
    public List<Sted> getAllSteder(){
        return stedService.getAllSteder();
    }

    @GetMapping("/byId/{id}")
    public Sted getStedById(@PathVariable(value = "id") Integer id){
        return stedService.getStedFromId(id);
    }

    @GetMapping("/{placeId}")
    public ObjectNode getStedByPlaceId(@PathVariable(value = "placeId") String placeId){
        Sted sted = stedService.getStedFromPlaceId(placeId);
        ObjectMapper mapper = new ObjectMapper();
        ObjectNode object = mapper.valueToTree(sted);
        ArrayNode reviews = mapper.valueToTree(vurderingService.getAllVurderingerByPlaceID(placeId));
        object.put("reviewerCount", vurderingService.getRegistratorCount(placeId));
        object.putPOJO("stats", vurderingService.getReviewStats(placeId));

        return object;
    }

    @GetMapping("/{placeId}/{userId}")
    public String getReviewsByUser(@PathVariable(value ="placeId") String placeId, @PathVariable(value= "userId") String userId) {
        return "ok";
    }


}
