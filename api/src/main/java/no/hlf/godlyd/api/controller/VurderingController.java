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

import static java.util.stream.Collectors.groupingBy;

@RestController
@RequestMapping("/vurderinger")
public class VurderingController {

    @Autowired
    private VurderingService vurderingService;

    @GetMapping()
    public Map<String, List<Vurdering>> getAllVurderinger(){
        return vurderingService.getAllVurderinger();
    }

    @GetMapping("/id/{id}")
    public Vurdering getVurderingById(@PathVariable(value = "id") Integer id){
        return vurderingService.getVurderingFromId(id);
    }

    @GetMapping("/bruker")
    public List<Vurdering> getVurderingerByBruker(
            @RequestHeader("Authorization") String auth) {
        return vurderingService.getVurderingerByBruker(auth);
    }

    @GetMapping("/all/placeId/{placeId}")
    public List<Vurdering> getAllVurderingByPlaceId(@PathVariable(value = "placeId") String placeId){
        return vurderingService.getAllVurderingerByPlaceId(placeId);
    }

    @GetMapping("/placeId/{placeId}") //pagination
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

    @GetMapping("/placeId/{placeId}/brukerId/{brukerId}")
    public List<Vurdering> getVurderingerByPlaceIdAndBrukerId(
            @PathVariable(value = "placeId") String placeId,
            @PathVariable(value = "brukerId") Integer brukerId){

        return vurderingService.getVurderingerByPlaceIdAndBruker(placeId, brukerId);
    }

    @DeleteMapping("/id/{id}")
    public ResponseEntity<?> deleteVurdering(@PathVariable(value = "id") Integer id){
        return vurderingService.deleteVurdering(id);
    }
}
