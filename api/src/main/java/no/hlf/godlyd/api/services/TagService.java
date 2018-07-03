package no.hlf.godlyd.api.services;

import no.hlf.godlyd.api.Gruppe;
import no.hlf.godlyd.api.model.Tag;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface TagService {

    List<Tag> getAllTags();

    Tag getTagFromId(Integer id);

    Tag getTagByNavn(String name);

    List<Tag> getAllTagsFromGruppe(Gruppe gruppe);

    Tag createTag(Tag tag);

    ResponseEntity<?> deleteTag(Integer id);

}
