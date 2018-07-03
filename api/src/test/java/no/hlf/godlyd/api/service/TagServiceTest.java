package no.hlf.godlyd.api.service;

import no.hlf.godlyd.api.GodLydApplication;
import no.hlf.godlyd.api.Gruppe;
import no.hlf.godlyd.api.model.Tag;
import no.hlf.godlyd.api.repository.TagRepo;
import no.hlf.godlyd.api.services.TagService;
import no.hlf.godlyd.api.services.implementations.TagServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Bean;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

//@RunWith(SpringRunner.class)
@SpringBootTest(classes = GodLydApplication.class)
@ExtendWith(SpringExtension.class)
@DataJpaTest
public class TagServiceTest {

    @TestConfiguration
    static class TagServiceTestContextConfiguration{
        @Bean
        public TagServiceImpl tagService(){
            return new TagServiceImpl();
        }
    }

    @Autowired
    private TagService tagService;

    @MockBean
    private TagRepo tagRepo;

    private Tag tag;

    @BeforeEach
    public void setUp(){
        this.tag = new Tag("airport", Gruppe.GRUPPE1);
        Mockito.when(tagRepo.findByNavnIgnoreCase(tag.getNavn())).thenReturn(tag);
        Mockito.when(tagRepo.findByGruppe(tag.getGruppe())).thenReturn(Arrays.asList(tag));
        Mockito.when(tagRepo.save(tag)).thenReturn(tag);
    }

    // TEST CASES
    @Test
    public void testGetTagByNavn() {
        String navn = "airport";
        Tag found = tagService.getTagByNavn(navn);

        assertEquals(found.getNavn(), navn);
    }

    @Test
    public void testGetTagsByGruppe(){
        List<Tag> found = tagService.getAllTagsFromGruppe(Gruppe.GRUPPE1);
        assertTrue(found.contains(tag));
    }

    @Test
    public void testCreateTag(){
        Tag created = tagService.createTag(tag);
        assertEquals(tag, created);
    }

}
