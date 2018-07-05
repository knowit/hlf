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
    public void testStedFindByPlaceId(){
        Sted found = stedRepo.findByPlaceId("ChIJmeCJ639uQUYRc3OrOTekBZw");
        assertNotNull(found);
        assertEquals(1, (int) found.getId());
    }
}
