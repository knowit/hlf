package no.hlf.godlyd.api.repository;

import no.hlf.godlyd.api.GodLydApplication;
import no.hlf.godlyd.api.Gruppe;
import no.hlf.godlyd.api.model.Tag;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest(classes = GodLydApplication.class)
@ExtendWith(SpringExtension.class)
@DataJpaTest
public class TagRepoTest {

    @Autowired
    private TestEntityManager entityManager;

    @Autowired
    private TagRepo tagRepo;

    private Tag tag;

    @BeforeEach
    public void setUp(){
        this.tag = new Tag("airport", Gruppe.GRUPPE1);
    }

    @Test
    public void testTagFindByNavn(){
        entityManager.persist(tag);
        entityManager.flush();

        Tag found = tagRepo.findByNavnIgnoreCase(tag.getNavn());
        assertEquals(tag, found);
    }

    @Test
    public void testTagFindByGruppe(){
        entityManager.persist(tag);
        entityManager.flush();

        List<Tag> found = tagRepo.findByGruppe(tag.getGruppe());
        assertTrue(found.contains(tag));
    }
}
