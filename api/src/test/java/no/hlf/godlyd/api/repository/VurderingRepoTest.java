package no.hlf.godlyd.api.repository;

import no.hlf.godlyd.api.GodLydApplication;
import no.hlf.godlyd.api.model.LydforholdVurdering;
import no.hlf.godlyd.api.model.TeleslyngeVurdering;
import no.hlf.godlyd.api.model.Vurdering;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest(classes = GodLydApplication.class)
@ExtendWith(SpringExtension.class)
@DataJpaTest
public class VurderingRepoTest {

    @Autowired
    private VurderingRepo vurderingRepo;

    /* USED FOR TESTING:
     id |    dato    |     kommentar     | registrator | sted
    ----+------------+-------------------+-------------+------
      1 | 17/12/2018 | Bra teleslynge    |           1 |    1       (teleslynge_vurdering)
      2 | 21/05/2018 | Dårlig lydforhold |           3 |    5       (lydforhold_vurdering)
     */

    // TEST CASES
    @Test
    public void testVurderingFindByRegistrator(){
        List<Vurdering> found1 = vurderingRepo.findByRegistratorId(1);
        List<Vurdering> found2 = vurderingRepo.findByRegistratorId(3);

        assertTrue(found1.get(0) instanceof TeleslyngeVurdering);
        assertTrue(found2.get(0) instanceof LydforholdVurdering);

        assertEquals(1, found1.size());
        assertEquals(1, found2.size());
        assertEquals(1, (int) found1.get(0).getId());
        assertEquals(2, (int) found2.get(0).getId());
    }

    @Test
    public void testVurderingFindBySted(){
        List<Vurdering> found1 = vurderingRepo.findByStedId(1);
        List<Vurdering> found2 = vurderingRepo.findByStedId(5);

        assertTrue(found1.get(0) instanceof TeleslyngeVurdering);
        assertTrue(found2.get(0) instanceof LydforholdVurdering);

        assertEquals(1, found1.size());
        assertEquals(1, found2.size());
        assertEquals(1, (int) found1.get(0).getId());
        assertEquals(2, (int) found2.get(0).getId());
    }
}
