package no.hlf.godlyd.api.services.implementations;

import no.hlf.godlyd.api.exception.ResourceNotFoundException;
import no.hlf.godlyd.api.model.*;
import no.hlf.godlyd.api.repository.BrukerRepo;
import no.hlf.godlyd.api.repository.StedRepo;
import no.hlf.godlyd.api.repository.VurderingRepo;
import no.hlf.godlyd.api.services.BrukerService;
import no.hlf.godlyd.api.services.VurderingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.lang.reflect.Type;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class VurderingServiceImpl implements VurderingService {

    @Autowired
    private VurderingRepo vurderingRepo;
    @Autowired
    private StedRepo stedRepo;
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
    public List<Vurdering> getAllVurderingerByPlaceId(String placeId) throws ResourceNotFoundException {
        return vurderingRepo.findByPlaceId(placeId);}

    @Override
    public Page<Vurdering> getVurderingerByPlaceId(String placeId, Pageable pagable) throws ResourceNotFoundException {
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
    public List<Vurdering> getVurderingerByPlaceIdAndBruker(String placeId, String authorization) throws ResourceNotFoundException {
        Integer brukerId = brukerService.updateBruker(authorization).getId();
        return vurderingRepo.findByPlaceIdAndRegistrator(placeId, brukerId);
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
            return ResponseEntity.status(403).build();
        }
    }

    @Override
    public List<Integer> getRegistratorsByPlaceId(String placeId){
        if (stedRepo.existsByPlaceId(placeId)){
            Integer stedId = stedRepo.findByPlaceId(placeId).getId();
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
