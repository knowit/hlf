package no.hlf.godlyd.api.service;

import no.hlf.godlyd.api.GodLydApplication;
import no.hlf.godlyd.api.model.Sted;
import no.hlf.godlyd.api.repository.StedRepo;
import no.hlf.godlyd.api.services.StedService;
import no.hlf.godlyd.api.services.implementations.StedServiceImpl;
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
public class StedServiceTest {

    @TestConfiguration
    static class StedServiceContextConfiguration{
        @Bean
        public StedServiceImpl stedService(){ return new StedServiceImpl();}
    }

    @Autowired
    private StedService stedService;

    @MockBean
    private StedRepo stedRepo;

    private Sted sted;

    @BeforeEach
    public void setUp(){
        this.sted =  new Sted("TestPlacesId");
    }

    // TEST CASES
    @Test
    public void testGetStedByPlacesId() {
        Mockito.when(stedRepo.findByPlaceId(sted.getPlaceId())).thenReturn(sted);

        Sted found = stedService.getStedFromPlaceId(sted.getPlaceId());
        assertEquals(sted, found);
    }

}
