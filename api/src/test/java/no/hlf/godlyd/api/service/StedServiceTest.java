package no.hlf.godlyd.api.service;

import no.hlf.godlyd.api.GodLydApplication;
import no.hlf.godlyd.api.Gruppe;
import no.hlf.godlyd.api.model.Adresse;
import no.hlf.godlyd.api.model.Sted;
import no.hlf.godlyd.api.model.Tag;
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

import java.util.Arrays;
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
    private Tag tag;

    @BeforeEach
    public void setUp(){
        this.tag = new Tag("tagnavn", Gruppe.GRUPPE1);
        Set<Tag> tags = Stream.of(tag).collect(Collectors.toSet());
        this.sted =  new Sted("TestPlacesId","Navn","Telefon","Nettside",
                new Adresse("Gatenavn", "Gatenummer", "By", "Postnummer"), tags);
    }

    // TEST CASES
    @Test
    public void testGetStedByPlacesId() {
        Mockito.when(stedRepo.findByPlacesId(sted.getPlacesId())).thenReturn(sted);

        Sted found = stedService.getStedFromPlacesId(sted.getPlacesId());
        assertEquals(sted.getNavn(), found.getNavn());
    }

    @Test
    public void testGetStedByNavn() {
        Mockito.when(stedRepo.findByNavnIgnoreCase(sted.getNavn())).thenReturn(Arrays.asList(sted));

        List<Sted> found = stedService.getStederByNavn(sted.getNavn());
        assertTrue(found.contains(sted));
        assertEquals(sted.getId(), found.get(0).getId());
    }

    @Test
    public void testGetStedByTag() {
        Mockito.when(stedRepo.findByTag(tag.getId())).thenReturn(Arrays.asList(sted));

        List<Sted> found = stedService.getStederByTag(tag.getId());
        assertTrue(found.contains(sted));
        assertEquals(sted.getId(), found.get(0).getId());
    }

    @Test
    public void testGetStedByAdresse() {
        Mockito.when(stedRepo.findByAdresse(sted.getAdresse().getId())).thenReturn(Arrays.asList(sted));

        List<Sted> found = stedService.getStederByAdresse(sted.getAdresse().getId());
        assertTrue(found.contains(sted));
        assertEquals(sted.getId(), found.get(0).getId());
    }

    @Test
    public void testCreateSted(){
        Mockito.when(stedRepo.save(sted)).thenReturn(sted);

        Sted created = stedService.createSted(sted);
        assertEquals(sted, created);
    }
}
