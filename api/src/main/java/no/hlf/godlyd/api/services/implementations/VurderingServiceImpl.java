package no.hlf.godlyd.api.services.implementations;

import no.hlf.godlyd.api.exception.ResourceNotFoundException;
import no.hlf.godlyd.api.model.*;
import no.hlf.godlyd.api.repository.StedRepo;
import no.hlf.godlyd.api.repository.VurderingRepo;
import no.hlf.godlyd.api.services.VurderingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class VurderingServiceImpl implements VurderingService {

    @Autowired
    private VurderingRepo vurderingRepo;
    @Autowired
    private StedRepo stedRepo;

    // Methods:
    @Override
    public Map<String, List<Vurdering>> getAllVurderinger() {
        List<Vurdering> alleVurderinger= (List<Vurdering>)vurderingRepo.findAll();
        return sorterVurderinger(alleVurderinger);
    }

    @Override
    public List<Vurdering> getVurderingerByStedId(Integer id){
        return vurderingRepo.findByStedId(id);
    }

    @Override
    public List<Vurdering> getAllVurderingerByPlaceId(String placeId){ return vurderingRepo.findByPlaceId(placeId);}

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
    public List<Vurdering> getVurderingerByBruker(Integer brukerid) {
        return vurderingRepo.findByRegistrator(brukerid);
    }

    @Override
    public List<Vurdering> getVurderingerByPlaceIdAndBruker(String placeId, Integer brukerId) {
        return vurderingRepo.findByPlaceIdAndRegistrator(placeId, brukerId);
    }

    @Override
    public ResponseEntity<?> deleteVurdering(Integer id) {
        Vurdering vurdering = vurderingRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Vurdering", "id", id));

        vurderingRepo.delete(vurdering);
        return ResponseEntity.ok().build();
    }

    @Override
    public List<Integer> getRegistratorsByPlaceId(String placeId){
        Integer stedId = stedRepo.findByPlaceId(placeId).getId();
        return vurderingRepo.findRegistratorsByStedId(stedId);
    }

    // Sorterer vurderinger inn i: teleslynge-, lydforhold-, lydutjevning- og informasjonsvurderinger.
    @Override
    public Map<String, List<Vurdering>> sorterVurderinger(List<Vurdering> vurderinger){

        List<Vurdering> teleslyngeVurderinger = vurderinger.stream()
                .filter(vurdering -> vurdering instanceof TeleslyngeVurdering)
                .collect(Collectors.toList());

        List<Vurdering> lydforholdVurderinger = vurderinger.stream()
                .filter(vurdering -> vurdering instanceof LydforholdVurdering)
                .collect(Collectors.toList());

        List<Vurdering> lydutjevningVurderinger = vurderinger.stream()
                .filter(vurdering -> vurdering instanceof LydutjevningVurdering)
                .collect(Collectors.toList());

        List<Vurdering> informasjonVurderinger = vurderinger.stream()
                .filter(vurdering -> vurdering instanceof InformasjonVurdering)
                .collect(Collectors.toList());

        Map<String,List<Vurdering>> map =new HashMap();
        map.put("Teleslyngevurderinger",teleslyngeVurderinger);
        map.put("Lydforholdvurderinger",lydforholdVurderinger);
        map.put("Lydutjevningvurderinger", lydutjevningVurderinger);
        map.put("Informasjonvurderinger", informasjonVurderinger);

        return map;
    }

}
