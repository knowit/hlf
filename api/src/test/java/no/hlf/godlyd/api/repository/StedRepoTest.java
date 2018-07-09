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
     id |          places_id
    ----+-----------------------------+
      1 | ChIJmeCJ639uQUYRc3OrOTekBZw
     */

    // TEST CASES
    @Test
    public void testStedFindByPlaceId(){
        Sted found = stedRepo.findByPlaceId("ChIJmeCJ639uQUYRc3OrOTekBZw");
        assertNotNull(found);
        assertEquals(1, (int) found.getId());
    }
}
