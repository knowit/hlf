package no.hlf.godlyd.api.service;

import no.hlf.godlyd.api.GodLydApplication;
import no.hlf.godlyd.api.model.Bruker;
import no.hlf.godlyd.api.model.Sted;
import no.hlf.godlyd.api.model.TeleslyngeVurdering;
import no.hlf.godlyd.api.model.Vurdering;
import no.hlf.godlyd.api.repository.TeleslyngeRepo;
import no.hlf.godlyd.api.repository.VurderingRepo;
import no.hlf.godlyd.api.services.TeleslyngeService;
import no.hlf.godlyd.api.services.VurderingService;
import no.hlf.godlyd.api.services.implementations.TeleslyngeServiceImpl;
import no.hlf.godlyd.api.services.implementations.VurderingServiceImpl;
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
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest(classes = GodLydApplication.class)
@ExtendWith(SpringExtension.class)
@DataJpaTest
public class VurderingServiceTest {

    @TestConfiguration
    static class VurderingServiceContextConfiguration{
        @Bean
        public VurderingServiceImpl vurderingService(){ return new VurderingServiceImpl();}
    }

    @Autowired
    private VurderingService vurderingService;

    @MockBean
    private VurderingRepo vurderingRepo;

    private List<Vurdering> vurderinger;

    @BeforeEach
    public void setUp(){
        this.vurderinger = Stream.of(new TeleslyngeVurdering(new Sted("ChIJmeCJ639uQUYRc3OrOTekBZw"),
                new Bruker("user2", "kari@gmail.com"), "Bra teleslynge", true))
                .collect(Collectors.toList()) ;
    }

    // TEST CASES
    @Test
    public void testGetVurderingByPlaceId(){
        Mockito.when(vurderingRepo.findByPlaceId("ChIJmeCJ639uQUYRc3OrOTekBZw")).thenReturn(vurderinger);

        List<Vurdering> found = vurderingService.getAllVurderingerByPlaceId("ChIJmeCJ639uQUYRc3OrOTekBZw");
        assertEquals(vurderinger.get(0), found.get(0));
    }

    @Test
    public void testGetVurderingByRegistrator(){
        Mockito.when(vurderingRepo.findByRegistrator(2)).thenReturn(vurderinger);

        List<Vurdering> found = vurderingService.getVurderingerByBruker(2);
        assertEquals(vurderinger.get(0), found.get(0));
    }

    @Test
    public void testGetAllVurderingerSortert(){
        Mockito.when(vurderingRepo.findAll()).thenReturn(vurderinger);

        Map<String, List<Vurdering>> map = vurderingService.getAllVurderinger();
        assertEquals(map.get("Teleslyngevurderinger").get(0), vurderinger.get(0));
    }

}
