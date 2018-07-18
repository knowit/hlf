package no.hlf.godlyd.api.repository;

import no.hlf.godlyd.api.GodLydApplication;
import no.hlf.godlyd.api.model.Bruker;
import no.hlf.godlyd.api.model.InformasjonVurdering;
import no.hlf.godlyd.api.model.LydforholdVurdering;
import no.hlf.godlyd.api.model.Sted;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest(classes = GodLydApplication.class)
@ExtendWith(SpringExtension.class)
@DataJpaTest
public class InformasjonVurderingRepoTest {

    @Autowired
    InformasjonRepo informasjonRepo;

    @Autowired
    StedRepo stedRepo;
    @Autowired
    BrukerRepo brukerRepo;
    @Autowired
    VurderingRepo vurderingRepo;

    @Test
    public void testCreateTeleslyngevurdering() {
        Sted sted = stedRepo.findByPlaceId("ChIJmeCJ639uQUYRc3OrOTekBZw");
        Bruker bruker = brukerRepo.findByAuth0UserId("userid1");

        InformasjonVurdering iv = new InformasjonVurdering(sted, bruker, "Bra informasjon", true);
        InformasjonVurdering saved = informasjonRepo.save(iv);
        assertNotNull(saved);

        // Sjekker om alt er lagret rett: Er det vurderingen i vurderingstabellen og i lista for sted og bruker?
        assertTrue(vurderingRepo.findByPlaceId(sted.getPlaceId()).contains(iv));
        assertTrue(stedRepo.findByPlaceId(sted.getPlaceId()).getVurderinger().contains(iv));
        assertTrue(brukerRepo.findByAuth0UserId(bruker.getAuth0UserId()).getVurderinger().contains(iv));
    }
}