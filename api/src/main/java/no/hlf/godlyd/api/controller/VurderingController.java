package no.hlf.godlyd.api.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import no.hlf.godlyd.api.model.*;
import no.hlf.godlyd.api.services.VurderingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/vurderinger")
public class VurderingController {

    @Autowired
    VurderingService vurderingService;

    @GetMapping()
    public Map<String, List<Vurdering>> getAllVurderinger(){
        return vurderingService.getAllVurderinger();
    }

    @GetMapping("/{id}")
    public Vurdering getVurderingById(@PathVariable(value = "id") Integer id){
        return vurderingService.getVurderingFromId(id);
    }

    @GetMapping("/bruker")
    public List<Vurdering> getVurderingerByBruker(
            @RequestHeader("Authorization") String auth){
        return vurderingService.getVurderingerByBruker(auth);
    }

    @GetMapping("/all/place/{placeId}")
    public List<Vurdering> getAllVurderingByPlaceId(@PathVariable(value = "placeId") String placeId){
        return vurderingService.getAllVurderingerByPlaceId(placeId);
    }

    @GetMapping("/place/{placeId}") //pagination
    public ArrayNode getVurderingerByPlaceId(@PathVariable(value = "placeId") String placeId,
                                            @PageableDefault(value=40, page = 0) Pageable pagable) {

        List<Vurdering> vurderingerInPage = (vurderingService.getVurderingerByPlaceId(placeId, pagable)).getContent();
        List<List<Vurdering>> vurderingsliste = new ArrayList<>();

        for (Vurdering vurdering : vurderingerInPage) {
            List<Vurdering> sammeVurdering = vurderingerInPage.stream()
                    .filter(v -> v.getDato().equals(vurdering.getDato()) && v.getRegistrator().equals(vurdering.getRegistrator()))
                    .collect(Collectors.toList());
            if (!vurderingsliste.contains(sammeVurdering)) {
                vurderingsliste.add(sammeVurdering);
            }
        }

        ObjectMapper mapper = new ObjectMapper();
        ArrayNode ferdigJSON = mapper.createArrayNode();

        for (List<Vurdering> list : vurderingsliste) {
            ObjectNode vurderinger = mapper.createObjectNode();

            for (Vurdering vurdering : list) {
                ObjectNode vurderingNode = mapper.createObjectNode()
                        .put("kommentar", vurdering.getKommentar())
                        .put("rangering", vurdering.isRangering());

                if (vurdering instanceof TeleslyngeVurdering) {
                    vurderinger.putPOJO("teleslynge", vurderingNode);
                } else if (vurdering instanceof LydforholdVurdering) {
                    vurderinger.putPOJO("lydforhold", vurderingNode);
                } else if (vurdering instanceof LydutjevningVurdering) {
                    vurderinger.putPOJO("teleslynge", vurderingNode);
                } else if (vurdering instanceof InformasjonVurdering) {
                    vurderinger.putPOJO("informasjon", vurderingNode);
                }
            }

            ObjectNode objectNode = mapper.createObjectNode()
                    .putPOJO("dato", list.get(0).getDato())
                    .putPOJO("registrator", list.get(0).getRegistrator())
                    .putPOJO("vurderinger", vurderinger);
            ferdigJSON.add(objectNode);
        }

        return ferdigJSON;
    }

    @GetMapping("/type/{vurderingstype}/place/{placeId}")
    public List<Vurdering> getAllVurderingerByTypeAndPlaceId(
            @PathVariable(value = "placeId") String placeId,
            @PathVariable(value = "vurderingstype") String vurderingstype){
        return vurderingService.getVurderingerByTypeAndPlaceId(vurderingstype, placeId);
    }

    @GetMapping("/place/{placeId}/bruker")
    public List<Vurdering> getVurderingerByPlaceIdAndBrukerId(
            @PathVariable(value = "placeId") String placeId,
            @RequestHeader("Authorization") String auth){
        return vurderingService.getVurderingerByPlaceIdAndBruker(placeId, auth);
    }

    @PostMapping
    public Vurdering createVurdering(@RequestBody Vurdering vurdering, @RequestHeader("Authorization") String authorization) {
        return vurderingService.createVurdering(vurdering, authorization);
    }

    @PutMapping("/{id}")
    public Vurdering updateVurdering(@PathVariable(value = "id") Integer id,
                                     @RequestBody Vurdering endring,
                                     @RequestHeader("Authorization") String authorization){
        return vurderingService.updateVurdering(id, endring, authorization);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteVurdering(
            @PathVariable(value = "id") Integer id,
            @RequestHeader("Authorization") String auth){
        return vurderingService.deleteVurdering(id, auth);
    }
}
