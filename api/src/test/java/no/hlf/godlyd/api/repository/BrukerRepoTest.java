package no.hlf.godlyd.api.repository;

import no.hlf.godlyd.api.GodLydApplication;
import no.hlf.godlyd.api.model.Bruker;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest(classes = GodLydApplication.class)
@ExtendWith(SpringExtension.class)
@DataJpaTest
public class BrukerRepoTest {

    @Autowired
    private BrukerRepo brukerRepo;

    /* USED FOR TESTING:
     id |      epost      | etternavn | fornavn | brukernavn |   passord
    ----+-----------------+-----------+---------+------------+----------------
      1 |  ola@gmail.com  |  Normann  | Ola     |   user1    |   passord
     */

    // TEST CASES
    @Test
    public void testBrukerFindByBrukernavn() {
        Bruker found = brukerRepo.findByBrukernavn("user1");
        assertEquals(1, (int) found.getId());
        assertEquals("ola@gmail.com", found.getEpost());
    }
}