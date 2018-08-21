package no.hlf.godlyd.api.services.implementations;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import no.hlf.godlyd.api.exception.AccessDeniedException;
import no.hlf.godlyd.api.exception.ResourceNotFoundException;
import no.hlf.godlyd.api.model.*;
import no.hlf.godlyd.api.repository.VurderingRepo;
import no.hlf.godlyd.api.services.BrukerService;
import no.hlf.godlyd.api.services.StedService;
import no.hlf.godlyd.api.services.VurderingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
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
        return vurderingRepo.findByStedPlaceId(placeId);
    }

    @Override
    public List<Vurdering> getAllVurderingerByPlaceIdNewerThan(String placeId, LocalDate dato) {
        return vurderingRepo.findByStedPlaceIdAndDatoGreaterThan(placeId, dato);
    }

    @Override
    public ArrayNode getVurderingerByPlaceId(String placeId, LocalDate dato, Pageable pagable) {
        List<Vurdering> vurderingerInPage = vurderingRepo.findByPlaceIdPage(placeId, dato, pagable).getContent();
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
                    vurderinger.putPOJO("lydutjevning", vurderingNode);
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

    @Override
    public Vurdering getVurderingFromId(Integer id) {
        return vurderingRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Vurdering", "id", id));
    }

    @Override
    public List<Vurdering> getVurderingerByBruker(String authorization) throws ResourceNotFoundException {
        Integer brukerId = brukerService.updateBruker(authorization).getId();
        return vurderingRepo.findByRegistratorId(brukerId);
    }

    @Override
    public List<Vurdering> getVurderingerByTypeAndPlaceId(String vurderingstype, String placeId){
        switch (vurderingstype){
            case "teleslynge":  return vurderingRepo.findTeleslyngeByStedPlaceId(placeId);
            case "lydforhold":  return vurderingRepo.findLydforholdByStedPlaceId(placeId);
            case "lydutjevning": return vurderingRepo.findLydutjevningByStedPlaceId(placeId);
            case "informasjon": return vurderingRepo.findInformasjonByStedPlaceId(placeId);
            default: return Collections.emptyList();
        }
    }

    @Override
    public List<Vurdering> getVurderingerByPlaceIdAndBruker(String placeId, String authorization) throws ResourceNotFoundException {
        Integer brukerId = brukerService.updateBruker(authorization).getId();
        return vurderingRepo.findByStedPlaceIdAndRegistratorId(placeId, brukerId);
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
    public Vurdering updateVurdering(Integer id, Vurdering endring, String authorization){
        Integer brukerId = brukerService.updateBruker(authorization).getId();
        Vurdering vurdering = getVurderingFromId(id);
        if(vurdering.getRegistrator().getId().equals(brukerId)){
            vurdering.setKommentar(endring.getKommentar());
            vurdering.setRangering(endring.isRangering());
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
