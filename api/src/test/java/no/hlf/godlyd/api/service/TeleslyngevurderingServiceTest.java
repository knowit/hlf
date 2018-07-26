package no.hlf.godlyd.api.service;

import no.hlf.godlyd.api.GodLydApplication;
import no.hlf.godlyd.api.model.Bruker;
import no.hlf.godlyd.api.model.Sted;
import no.hlf.godlyd.api.model.TeleslyngeVurdering;
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

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest(classes = GodLydApplication.class)
@ExtendWith(SpringExtension.class)
@DataJpaTest
public class TeleslyngevurderingServiceTest {

    @TestConfiguration
    static class TeleslyngevurderingServiceContextConfiguration{
        @Bean
        public TeleslyngeServiceImpl teleslyngeService(){ return new TeleslyngeServiceImpl();}
    }

    @Autowired
    private TeleslyngeService teleslyngeService;

    @MockBean
    private TeleslyngeRepo teleslyngeRepo;

    private TeleslyngeVurdering teleslyngeVurdering;

    @BeforeEach
    public void setUp(){
        Bruker bruker = new Bruker(); bruker.setAuth0UserId("userid5");

        this.teleslyngeVurdering = new TeleslyngeVurdering(new Sted("ChIJmeCJ639uQUYRc3OrOTekBZw")
                , bruker, "Bra teleslynge", true);
    }

    // TEST CASES
    @Test
    public void testCreateTeleslyngevurdering(){
        Mockito.when(teleslyngeRepo.save(teleslyngeVurdering)).thenReturn(teleslyngeVurdering);

        TeleslyngeVurdering created = teleslyngeService.createTeleslynge(teleslyngeVurdering);
        assertEquals(teleslyngeVurdering, created);

    }

}
