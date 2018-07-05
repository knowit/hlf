package no.hlf.godlyd.api.services.implementations;

import no.hlf.godlyd.api.exception.ResourceNotFoundException;
import no.hlf.godlyd.api.model.*;
import no.hlf.godlyd.api.repository.VurderingRepo;
import no.hlf.godlyd.api.services.VurderingService;
import org.springframework.beans.factory.annotation.Autowired;
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

    // Methods:
    @Override
    public Map<String, List<Vurdering>> getAllVurderinger() {
        List<Vurdering> alleVurderinger= (List<Vurdering>)vurderingRepo.findAll();
        return sorterVurderinger(alleVurderinger);
    }

    @Override
    public List<Vurdering> getVurderingerBySted(Integer id){
        return vurderingRepo.findBySted(id);
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
    public Vurdering createVurdering(Vurdering vurdering) {
        return vurderingRepo.save(vurdering);
    }

    @Override
    public ResponseEntity<?> deleteVurdering(Integer id) {
        Vurdering vurdering = vurderingRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Vurdering", "id", id));

        vurderingRepo.delete(vurdering);
        return ResponseEntity.ok().build();
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

        Map<String,List<Vurdering>> map =new HashMap();
        map.put("Teleslyngevurderinger",teleslyngeVurderinger);
        map.put("Lydforholdvurderinger",lydforholdVurderinger);

        return map;
    }

}
