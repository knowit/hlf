package no.hlf.godlyd.api.controller;

import no.hlf.godlyd.api.model.*;
import no.hlf.godlyd.api.services.VurderingService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.*;

@RestController
@RequestMapping("/vurderinger")
public class VurderingController {

    @Autowired
    VurderingService vurderingService;

    private static final Logger logger = LoggerFactory.getLogger(VurderingController.class);

    @GetMapping()
    public Map<String, List<Vurdering>> getAllVurderinger(){
        return vurderingService.getAllVurderinger();
    }

    @GetMapping("/{id}")
    public Vurdering getVurderingById(@PathVariable(value = "id") Integer id){
        return vurderingService.getVurderingFromId(id);
    }

    @GetMapping("/bruker")
    public Page<Vurdering> getVurderingerByBruker(@RequestHeader(value = "Dato", defaultValue = "1970-01-01") String datoString,
                                                  @RequestHeader("Authorization") String auth,
                                                  @PageableDefault(direction = Sort.Direction.DESC, sort = "dato") Pageable pageable){
        logger.info("pageable.size = " + pageable.getPageSize() + ", pageable.page = " + pageable.getPageNumber());
        return vurderingService.getVurderingerByBruker(auth, pageable);
    }

    @GetMapping("/all/place/{placeId}")
    public List<Vurdering> getAllVurderingerByPlaceId(@PathVariable(value = "placeId") String placeId,
                                                      @RequestHeader(value = "Dato", defaultValue = "1970-01-01") String datoString) {
        LocalDate dato = LocalDate.parse(datoString);
        return vurderingService.getAllVurderingerByPlaceIdNewerThan(placeId, dato);
    }

    @GetMapping("/place/{placeId}") //pagination
    public Page<Vurdering> getVurderingerByPlaceId(@PathVariable(value = "placeId") String placeId,
                                                   @RequestHeader(value = "Dato", defaultValue = "1970-01-01") String datoString,
                                                   @PageableDefault(direction = Sort.Direction.DESC, sort="dato") Pageable pageable) {
        logger.info("Pageable.size = " + pageable.getPageSize() + "\t Pageable.page = " + pageable.getPageNumber());
        return vurderingService.getVurderingerByPlaceId(placeId, pageable);
    }

    @GetMapping("/place/{placeId}/bruker")
    public List<Vurdering> getVurderingerByPlaceIdAndBrukerId(
            @PathVariable(value = "placeId") String placeId,
            @RequestHeader("Authorization") String auth) {
        logger.info("inside VurderingsController.getVurderingerByPlaceIdAndBrukerId - placeId: " + placeId + ", auth: " + auth);
        return vurderingService.getVurderingerByPlaceIdAndBruker(placeId, auth);
    }

    @PostMapping
    public Vurdering createVurdering(@RequestBody Vurdering vurdering, @RequestHeader("Authorization") String authorization) {
        logger.info("creating vurdering: " + vurdering.toString());
        return vurderingService.createVurdering(vurdering, authorization);
    }

    @PutMapping("/{id}")
    public Vurdering updateVurdering(@PathVariable(value = "id") Integer id,
                                     @RequestBody Vurdering endring,
                                     @RequestHeader("Authorization") String authorization) {
        logger.info("vurdering.getRangering() = " + endring.getRangering());
        return vurderingService.updateVurdering(id, endring, authorization);
    }

    @DeleteMapping("/{id}/rangering")
    public ResponseEntity<?> removeRangeringFromVurdering(@PathVariable(value = "id") Integer id,
                                                  @RequestHeader("Authorization") String authorization) {
        vurderingService.removeRangeringFromVurdering(id, authorization);
        return new ResponseEntity(HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteVurdering(
            @PathVariable(value = "id") Integer id,
            @RequestHeader("Authorization") String auth){
        Vurdering vurdering = vurderingService.deleteVurdering(id, auth);
        return new ResponseEntity<>(vurdering, HttpStatus.OK);
    }

    @DeleteMapping("/byPlaceId/{placeId}")
    public ResponseEntity<?> deleteVurderingByPlaceIdAndRegistratorId(
            @PathVariable(value = "placeId") String placeId,
            @RequestHeader("Authorization") String auth) {
        List<Vurdering> vurderinger = vurderingService.deleteVurderingerByPlaceIdAndRegistrator(placeId, auth);
        return new ResponseEntity<>(vurderinger, HttpStatus.OK);
    }
}
