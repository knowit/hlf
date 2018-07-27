package no.hlf.godlyd.api.services.implementations;

import no.hlf.godlyd.api.exception.AccessDeniedException;
import no.hlf.godlyd.api.exception.ResourceNotFoundException;
import no.hlf.godlyd.api.model.*;
import no.hlf.godlyd.api.repository.StedRepo;
import no.hlf.godlyd.api.repository.VurderingRepo;
import no.hlf.godlyd.api.services.BrukerService;
import no.hlf.godlyd.api.services.StedService;
import no.hlf.godlyd.api.services.VurderingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class VurderingServiceImpl implements VurderingService {

    @Autowired
    private VurderingRepo vurderingRepo;
    @Autowired
    private StedService stedService;
    @Autowired
    private BrukerService brukerService;

    // Methods:
    @Override
    public Map<String, List<Vurdering>> getAllVurderinger() {
        List<Vurdering> alleVurderinger= (List<Vurdering>)vurderingRepo.findAll();
        return sorterVurderinger(alleVurderinger);
    }

    @Override
    public List<Vurdering> getVurderingerByStedId(Integer id) {
        return vurderingRepo.findByStedId(id);
    }

    @Override
    public List<Vurdering> getAllVurderingerByPlaceId(String placeId) {
        return vurderingRepo.findByPlaceId(placeId);}

    @Override
    public Page<Vurdering> getVurderingerByPlaceId(String placeId, Pageable pagable) {
        return vurderingRepo.findByPlaceIdPage(placeId, pagable);
    }

    @Override
    public Vurdering getVurderingFromId(Integer id) {
        return vurderingRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Vurdering", "id", id));
    }

    @Override
    public List<Vurdering> getVurderingerByBruker(String authorization) throws ResourceNotFoundException {
        Integer brukerId = brukerService.updateBruker(authorization).getId();
        return vurderingRepo.findByRegistrator(brukerId);
    }

    @Override
    public List<Vurdering> getVurderingerByTypeAndPlaceId(String vurderingstype, String placeId){
        switch (vurderingstype){
            case "teleslynge":  return vurderingRepo.findTeleslyngeByPlaceId(placeId);
            case "lydforhold":  return vurderingRepo.findLydforholdByPlaceId(placeId);
            case "lydutjevning": return vurderingRepo.findLydutjevningByPlaceId(placeId);
            case "informasjon": return vurderingRepo.findInformasjonByPlaceId(placeId);
            default: return Collections.emptyList();
        }
    }

    @Override
    public List<Vurdering> getVurderingerByPlaceIdAndBruker(String placeId, String authorization) throws ResourceNotFoundException {
        Integer brukerId = brukerService.updateBruker(authorization).getId();
        return vurderingRepo.findByPlaceIdAndRegistrator(placeId, brukerId);
    }

    @Override
    public Vurdering createVurdering(Vurdering vurdering, String authorization) {
        vurdering.setRegistrator(brukerService.updateBruker(authorization));
        Sted sted = stedService.updateSted(vurdering.getSted().getPlaceId());
        if (sted != null){
            sted.addVurdering(vurdering);
        }
        return vurderingRepo.save(vurdering);
    }

    @Override
    public Vurdering updateVurdering(Integer id, Vurdering endring){//}, String authorization){
        //Integer brukerId = brukerService.updateBruker(authorization).getId();
        Vurdering vurdering = getVurderingFromId(id);
        //if(vurdering.getRegistrator().getId().equals(brukerId)){
            vurdering.setKommentar(endring.getKommentar());
            vurdering.setRangering(endring.isRangering());
            return vurderingRepo.save(vurdering);
        //} else{
            //throw new AccessDeniedException("alter", "informasjonsvurdering, id: "+ id);
        //}
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
            return vurderingRepo.findRegistratorsByStedId(stedId);
        } else{
            return Collections.emptyList();
        }
    }

    // Sorterer vurderinger inn i: teleslynge-, lydforhold-, lydutjevning- og informasjonsvurderinger.
    @Override
    public Map<String, List<Vurdering>> sorterVurderinger(List<Vurdering> vurderinger){

        List<Vurdering> teleslyngeVurderinger = isInstanceOf(vurderinger, TeleslyngeVurdering.class);
        List<Vurdering> lydforholdVurderinger = isInstanceOf(vurderinger, LydforholdVurdering.class);
        List<Vurdering> lydutjevningVurderinger = isInstanceOf(vurderinger, LydutjevningVurdering.class);
        List<Vurdering> informasjonVurderinger = isInstanceOf(vurderinger, InformasjonVurdering.class);

        Map<String,List<Vurdering>> map =new HashMap();
        map.put("Teleslyngevurderinger",teleslyngeVurderinger);
        map.put("Lydforholdvurderinger",lydforholdVurderinger);
        map.put("Lydutjevningvurderinger", lydutjevningVurderinger);
        map.put("Informasjonvurderinger", informasjonVurderinger);

        return map;
    }

    private List<Vurdering> isInstanceOf(List<Vurdering> vurderinger, Class<? extends Vurdering> vurderingsklasse) {
        return vurderinger.stream()
                    .filter(vurdering -> vurderingsklasse.isInstance(vurdering))
                    .collect(Collectors.toList());
    }
}
