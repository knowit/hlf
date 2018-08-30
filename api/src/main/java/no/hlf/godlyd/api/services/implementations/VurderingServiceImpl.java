package no.hlf.godlyd.api.services.implementations;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import no.hlf.godlyd.api.Vurderingsstatistikk;
import no.hlf.godlyd.api.exception.AccessDeniedException;
import no.hlf.godlyd.api.exception.ResourceNotFoundException;
import no.hlf.godlyd.api.model.*;
import no.hlf.godlyd.api.repository.VurderingRepo;
import no.hlf.godlyd.api.services.BrukerService;
import no.hlf.godlyd.api.services.StedService;
import no.hlf.godlyd.api.services.VurderingService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class VurderingServiceImpl implements VurderingService {

    @Autowired
    VurderingRepo vurderingRepo;

    @Autowired
    StedService stedService;

    @Autowired
    BrukerService brukerService;

    private static final Logger logger = LoggerFactory.getLogger(VurderingServiceImpl.class);

    @Override
    public Map<String, List<Vurdering>> getAllVurderinger() {
        List<Vurdering> alleVurderinger= (List<Vurdering>)vurderingRepo.findAll();
        return sorterVurderinger(alleVurderinger);
    }

    @Override
    public List<Vurdering> getAllVurderingerByPlaceId(String placeId) {
        return vurderingRepo.findByStedPlaceId(placeId);
    }

    @Override
    public List<Vurdering> getAllVurderingerByPlaceIdNewerThan(String placeId, LocalDate dato) {
        return vurderingRepo.findByStedPlaceIdAndDatoGreaterThan(placeId, dato);
    }

    @Override
    public Page<Vurdering> getVurderingerByPlaceId(String placeId, LocalDate dato, Pageable pagable) {
        return vurderingRepo.findByPlaceIdPage(placeId, dato, pagable);
    }

    @Override
    public Vurdering getVurderingFromId(Integer id) {
        return vurderingRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Vurdering", "id", id));
    }

    @Override
    public Page<Vurdering> getVurderingerByBruker(String authorization, LocalDate dato, Pageable pageable) throws ResourceNotFoundException {
        Integer brukerId = brukerService.updateBruker(authorization).getId();
        return vurderingRepo.findByRegistratorId(brukerId, pageable);
    }

    @Override
    public List<Vurdering> getVurderingerByPlaceIdAndBruker(String placeId, String authorization) throws ResourceNotFoundException {
        Integer brukerId = brukerService.updateBruker(authorization).getId();
        logger.info("placeId: " + placeId  + ", brukerId: " + brukerId);
        return vurderingRepo.findByStedPlaceIdAndRegistratorId(placeId, brukerId);
    }

    @Override
    public Vurdering createVurdering(Vurdering vurdering, String authorization) {
        vurdering.setRegistrator(brukerService.updateBruker(authorization));
        Sted sted = stedService.updateSted(vurdering.getSted());
        if (sted != null){
            sted.addVurdering(vurdering);
        }

        vurdering.setDato(LocalDate.now());
        return vurderingRepo.save(vurdering);
    }

    @Override
    public Vurdering updateVurdering(Integer id, Vurdering endring, String authorization){
        Integer brukerId = brukerService.updateBruker(authorization).getId();
        Vurdering vurdering = getVurderingFromId(id);
        if(vurdering.getRegistrator().getId().equals(brukerId)){
            vurdering.setKommentar(endring.getKommentar());
            vurdering.setRangering(endring.getRangering());
            vurdering.setDato(LocalDate.now());
            return vurderingRepo.save(vurdering);
        } else{
            throw new AccessDeniedException("alter", "vurdering", "id", id);
        }
    }

    @Override
    public ResponseEntity<?> deleteVurdering(Integer id, String authorization) {
        Integer brukerid = brukerService.updateBruker(authorization).getId();
        Vurdering vurdering = vurderingRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Vurdering", "id", id));

        if(vurdering.getRegistrator().getId().equals(brukerid)){
            vurderingRepo.delete(vurdering);
            return ResponseEntity.ok().build();
        } else{
            throw new AccessDeniedException("delete", "Vurdering", "id", id);
        }
    }

    @Override
    public List<Integer> getRegistratorsByPlaceId(String placeId){
        if (stedService.existsByPlaceId(placeId)){
            Integer stedId = stedService.getStedFromPlaceId(placeId).getId();
            return vurderingRepo.findRegistratorIdByStedId(stedId);
        } else{
            return Collections.emptyList();
        }
    }

    @Override
    public Map<String, List<Vurdering>> sorterVurderinger(List<Vurdering> vurderinger){

        List<Vurdering> teleslyngeVurderinger = vurderinger
                .stream()
                .filter(vurdering -> vurdering.getVurderingsType().equals(VurderingsType.Teleslynge))
                .collect(Collectors.toList());

        List<Vurdering> lydforholdVurderinger = vurderinger
                .stream()
                .filter(vurdering -> vurdering.getVurderingsType().equals(VurderingsType.Lydforhold))
                .collect(Collectors.toList());

        List<Vurdering> lydutjevningVurderinger = vurderinger
                .stream()
                .filter(vurdering -> vurdering.getVurderingsType().equals(VurderingsType.Lydutjevning))
                .collect(Collectors.toList());

        List<Vurdering> informasjonVurderinger = vurderinger
                .stream()
                .filter(vurdering -> vurdering.getVurderingsType().equals(VurderingsType.Informasjon))
                .collect(Collectors.toList());

        Map<String,List<Vurdering>> map = new HashMap();
        map.put("Teleslyngevurderinger",teleslyngeVurderinger);
        map.put("Lydforholdvurderinger",lydforholdVurderinger);
        map.put("Lydutjevningvurderinger", lydutjevningVurderinger);
        map.put("Informasjonvurderinger", informasjonVurderinger);

        return map;
    }

    @Override
    public Map<String, Object> getTotalVurderingStatistikk(String placeId) {

        Map<String, Object> statistikk = new HashMap<>();
        List<Vurdering> vurderinger = getAllVurderingerByPlaceId(placeId);
        Map<String, List<Vurdering>> sorterteVurderinger = sorterVurderinger(vurderinger);

        statistikk.put("Totalt antall vurderinger", vurderinger.size());
        statistikk.put("Teleslyngevurderinger", new Vurderingsstatistikk(sorterteVurderinger.get("Teleslyngevurderinger")));
        statistikk.put("Lydforholdvurderinger", new Vurderingsstatistikk(sorterteVurderinger.get("Lydforholdvurderinger")));
        statistikk.put("Lydutjevningvurderinger", new Vurderingsstatistikk(sorterteVurderinger.get("Lydutjevningvurderinger")));
        statistikk.put("Informasjonvurderinger", new Vurderingsstatistikk(sorterteVurderinger.get("Informasjonvurderinger")));
        statistikk.put("Antall vurderere", getRegistratorsByPlaceId(placeId).size());

        return statistikk;
    }
}
