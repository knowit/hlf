package no.hlf.godlyd.api.services.implementations;

import no.hlf.godlyd.api.model.*;
import no.hlf.godlyd.api.repository.StedRepo;
import no.hlf.godlyd.api.repository.VurderingRepo;
import no.hlf.godlyd.api.services.BrukerService;
import no.hlf.godlyd.api.services.StedService;
import no.hlf.godlyd.api.services.VurderingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class VurderingServiceImpl implements VurderingService {

    @Autowired
    private VurderingRepo vurderingRepo;

    @Autowired
    private BrukerService brukerService;

    @Autowired
    private StedService stedService;

    @Override
    public List<Vurdering> getAllVurderinger() {
            return (List<Vurdering>) vurderingRepo.findAll();
    }


    @Override
    public List<Vurdering> getAllVurderingerByPlaceID(String placeId) {
        List<Vurdering> vurderinger = vurderingRepo.findByPlaceId(placeId);
        return vurderinger;
    }



    @Override
    public int getRegistratorCount(String placeId) {
        return vurderingRepo.getRegistratorCountByPlaceId(placeId);
    }

    @Override
    public Map<String, Map<String, Integer>> getReviewStats(String placeId) {
        List<Vurdering> vurderinger = getAllVurderingerByPlaceID(placeId);
        Map<String, List<Vurdering>> reviewsGrouped =
                vurderinger.stream().collect(Collectors.groupingBy(v -> v.getClass().getSimpleName()));

        HashMap<String, Map<String, Integer>> result = new HashMap<>();
        for(Map.Entry<String, List<Vurdering>> entry : reviewsGrouped.entrySet()) {
            Map<String, Integer> count = new HashMap<>();
            count.put("positive", (int) entry.getValue().stream().filter(review -> review.isRangering()).count());
            count.put("negative", (int) entry.getValue().stream().filter(review -> !review.isRangering()).count());
            result.put(entry.getKey(), count);
        }




        return result;
    }


    @Override
    public Vurdering createVurdering(Vurdering vurdering) {
        vurdering.setSted(stedService.getPlaceByPlaceIdAndCreateOnMissing(vurdering.getSted().getPlaceId()));
        //
        List<Vurdering> previousVurderinger = vurderingRepo.getReviewsFromTodayByUserAndPlaceId(vurdering.getRegistrator().getId(), vurdering.getSted().getPlaceId());
        if(previousVurderinger.size() > 0) {
            Vurdering oldVurdering = previousVurderinger.get(0);
            oldVurdering.setKommentar(vurdering.getKommentar());
            oldVurdering.setRangering(vurdering.isRangering());
            vurderingRepo.save(oldVurdering);
            return oldVurdering;
        }
        else {
            System.out.println(previousVurderinger);
            vurderingRepo.save(vurdering);
            return vurdering;
        }
    }












    /*
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
            throw new AccessDeniedException("delete", "Vurdering", "id", id);
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

    @Override
    public List<Vurdering> getAllPropertyReviews() {

        ArrayList<Vurdering> result  = new ArrayList<>();

        vurderingRepo.findAll().forEach(result::add);
        return result;
    }

    @Override
    public Vurdering getPropertyReviewFromId(Integer id) {
        return vurderingRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Informasjon", "id", id));
    }

    @Override
    public List<Vurdering> getPropertyReviewsByUser(String authorization) {
        List<Vurdering> alleVurderinger = vurderingService.getVurderingerByBruker(authorization);
        Map<String, List<Vurdering>> sortert = vurderingService.sorterVurderinger(alleVurderinger);

        return sortert.get("Informasjonvurderinger");
    }

    @Override
    public List<Vurdering> getPropertyReviewsByPlaceId(String placeId) {
        List<Vurdering> alleVurderinger = vurderingService.getAllVurderingerByPlaceId(placeId);
        Map<String, List<Vurdering>> sortert = vurderingService.sorterVurderinger(alleVurderinger);

        return sortert.get("Informasjonvurderinger");
    }

    @Override
    public Vurdering createPropertyReview(Vurdering property, String authorization) {
        Sted sted = stedService.getStedFromPlaceId(property.getSted().getPlaceId());
        if(sted==null) {
            sted = new Sted(property.getSted().getPlaceId());
        }
        Bruker bruker = brukerService.updateBruker(authorization);
        InformasjonVurdering i = new InformasjonVurdering();
        i.setSted(sted);
        i.setRegistrator(bruker);
        i.setDato(property.getDato());
        i.setRangering(property.isRangering());
        i.setKommentar(property.getKommentar());
        return vurderingRepo.save(i);
    }

    @Override
    public Vurdering updatePropertyReview(Integer id, Vurdering endring, String authorization) {
        if(vurderingRepo.existsById(id)){
            Vurdering informasjon = getPropertyReviewFromId(id);
            Bruker bruker = brukerService.updateBruker(authorization);
            if(informasjon.getRegistrator().getId().equals(bruker.getId())){
                informasjon.setKommentar(endring.getKommentar());
                informasjon.setRangering(endring.isRangering());
                informasjon.setDato(endring.getDato());
                return vurderingRepo.save(informasjon);
            } else{
                throw new AccessDeniedException("alter", "Informasjonsvurdering", "id", id);   // Placeholder
            }
        } else{
            throw new ResourceNotFoundException("Informasjonsvurdering", "id", id);
        }
    }
    */
}
