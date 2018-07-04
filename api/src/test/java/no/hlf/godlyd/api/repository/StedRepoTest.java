package no.hlf.godlyd.api.repository;

import no.hlf.godlyd.api.GodLydApplication;
import no.hlf.godlyd.api.model.Sted;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest(classes = GodLydApplication.class)
@ExtendWith(SpringExtension.class)
@DataJpaTest
public class StedRepoTest {

    @Autowired
    private StedRepo stedRepo;

    /* USED FOR TESTING:
    STED:
     id |           navn            |     nettside      |          places_id          |     telefon     | adresse
    ----+---------------------------+-----------------------------------------------------------+-------------------
      1 | Pascal Konditori-Brasseri | http://pascal.no/ | ChIJmeCJ639uQUYRc3OrOTekBZw | +47 22 55 00 20 |       4

    STED_TAG:
    sted_id | tag_id
    ---------+--------
           1 |      2

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
    public void testStedFindByTag(){
        List<Sted> found = stedRepo.findByTag(2);
        assertEquals(1,found.size());
        assertEquals("Pascal Konditori-Brasseri",found.get(0).getNavn());
    }

    @Test
    public void testStedFindByAdresse(){
        List<Sted> found = stedRepo.findByAdresse(4);
        assertEquals(1,found.size());
        assertEquals(1, (int) found.get(0).getId());
    }
}
