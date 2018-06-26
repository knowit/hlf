package no.hlf.godlyd.api.controller;

import no.hlf.godlyd.api.Gruppe;
import no.hlf.godlyd.api.model.Tag;
import no.hlf.godlyd.api.services.TagService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;


// This is the REST API
@RestController
@RequestMapping("/tags") //declares that the url for all the apis in this controller will start with /godlyd/api.
public class TagController {

    @Autowired
    TagService tagService;

    // Liste alle tags
    @GetMapping()
    public List<Tag> getAllTags(){
        return tagService.getAllTags();
    }

    // Hent en enkelt tag fra id
    @GetMapping("/id={id}")
    public Tag getTagFromId(@PathVariable(value = "id") Integer id){
        return tagService.getTagFromId(id);
    }

    // Hent en enkelt tag fra navn
    @GetMapping("/navn={navn}")
    public Tag getTagFromNavn(@PathVariable(value = "navn") String navn){
        return tagService.getTagByNavn(navn);
    }

    // Liste med alle tags i en gruppe
    @GetMapping("/gruppe={gruppe}")
    public List<Tag> getAllTagsFromGruppe(@PathVariable(value = "gruppe") Gruppe gruppe){
        return tagService.getAllTagsFromGruppe(gruppe);
    }


    /*
    // Opprette en ny Tag
    @PostMapping("")
    public Tag createTag(@Valid @RequestBody Tag tag){
        return tagService.createTag(tag);
    }

    // Slett en tag
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTag(@PathVariable(value = "id") Integer id){
        return tagService.deleteTag(id);
    }

    */

}
