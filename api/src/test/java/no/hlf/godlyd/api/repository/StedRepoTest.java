package no.hlf.godlyd.api.repository;

import no.hlf.godlyd.api.GodLydApplication;
import no.hlf.godlyd.api.Gruppe;
import no.hlf.godlyd.api.model.Adresse;
import no.hlf.godlyd.api.model.Sted;
import no.hlf.godlyd.api.model.Tag;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest(classes = GodLydApplication.class)
@ExtendWith(SpringExtension.class)
@DataJpaTest
@Transactional
public class StedRepoTest {

    @Autowired
    private StedRepo stedRepo;

    /* USED FOR TESTING:
    STED:
     id |           navn            |     nettside      |          places_id          |     telefon     | adresse
    ----+---------------------------+-----------------------------------------------------------+-------------------
      1 | Pascal Konditori-Brasseri | http://pascal.no/ | ChIJmeCJ639uQUYRc3OrOTekBZw | +47 22 55 00 20 |       4

    STED_TAG:                       ADRESSE:
    sted_id | tag_id                 id |  by  |      gatenavn      | gatenummer | postnummer
    ---------+--------              ----+------+--------------------+------------+------------
           1 |      2                 4 | Oslo | Henrik Ibsens gate | 36         | 0255
           1 |      3
           1 |      4
           1 |      5

     */

    // TEST CASES
    @Test
    public void testStedFindByNavn(){
        List<Sted> found = stedRepo.findByNavnIgnoreCase("Pascal Konditori-Brasseri");
        assertEquals(1,found.size());
        assertEquals("Pascal Konditori-Brasseri", found.get(0).getNavn());
        assertEquals(1, (int) found.get(0).getId());
    }

    @Test
    public void testStedFindByPlacesId(){
        Sted found = stedRepo.findByPlacesId("ChIJmeCJ639uQUYRc3OrOTekBZw");
        assertNotNull(found);
        assertEquals("Pascal Konditori-Brasseri", found.getNavn());
        assertEquals(1, (int) found.getId());
    }

    @Test
    public void testStedFindByTags(){
        List<Sted> found = stedRepo.findByTags(new Tag(2, "bakery", Gruppe.GRUPPE1));
        assertEquals(1,found.size());
        assertEquals("Pascal Konditori-Brasseri",found.get(0).getNavn());
    }
}
