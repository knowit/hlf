package no.hlf.godlyd.api.services.implementations;

import no.hlf.godlyd.api.Gruppe;
import no.hlf.godlyd.api.exception.ResourceNotFoundException;
import no.hlf.godlyd.api.model.Tag;
import no.hlf.godlyd.api.repository.TagRepo;
import no.hlf.godlyd.api.services.TagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

// Purpose: Implementation of all service methods for accessing addresses

@Service
public class TagServiceImpl implements TagService {

    @Autowired
    private TagRepo tagRepo;

    // Methods:
    public List<Tag> getAllTags(){
        return (List<Tag>) tagRepo.findAll();
    }

    public Tag getTagFromId(Integer id){
        return tagRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Tag", "id", id));
    }

    public Tag getTagByNavn(String navn) {
        //if (!tagRepo.existsByNavnIgnoreCase(navn)){ throw new ResourceNotFoundException("Tag", "navn", navn); }
        return tagRepo.findByNavnIgnoreCase(navn);
    }

    public List<Tag> getAllTagsFromGruppe(Gruppe gruppe){
        return tagRepo.findByGruppe(gruppe);
    }

    public Tag createTag(Tag tag) {
        return tagRepo.save(tag);
    }

    public ResponseEntity<?> deleteTag(Integer id){
        Tag tag = tagRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Tag", "id", id));

        tagRepo.delete(tag);
        return ResponseEntity.ok().build();
    }
}