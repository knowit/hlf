package no.hlf.godlyd.api.controller;

import no.hlf.godlyd.api.GodLydApplication;
import no.hlf.godlyd.api.model.Bruker;
import no.hlf.godlyd.api.model.Sted;
import no.hlf.godlyd.api.model.TeleslyngeVurdering;
import no.hlf.godlyd.api.model.Vurdering;
import no.hlf.godlyd.api.services.StedService;
import no.hlf.godlyd.api.services.VurderingService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@SpringBootTest(classes = GodLydApplication.class)
@ExtendWith(MockitoExtension.class)
public class VurderingControllerTest {

    private List<Vurdering> vurderinger;

    @Mock
    private VurderingService vurderingService;

    @InjectMocks
    private VurderingController vurderingController = new VurderingController();

    @BeforeEach
    private void init(){
        MockitoAnnotations.initMocks(this);
        Bruker bruker = new Bruker(); bruker.setAuth0UserId("userid5");

        this.vurderinger = Stream.of(new TeleslyngeVurdering(new Sted("ChIJmeCJ639uQUYRc3OrOTekBZw"),
                bruker, "Bra teleslynge", true))
                .collect(Collectors.toList()) ;
    }

    // TEST CASES
    @Test
    public void testGetVurderingerFromPlaceId() {
        when(vurderingService.getAllVurderingerByPlaceId("ChIJmeCJ639uQUYRc3OrOTekBZw"))
                .thenReturn(vurderinger);

        List<Vurdering> found = vurderingController.getAllVurderingByPlaceId("ChIJmeCJ639uQUYRc3OrOTekBZw");
        assertEquals(vurderinger.get(0), found.get(0));
    }

    @Test
    public void testGetVurderingerFromBrukerId(){
        when(vurderingService.getVurderingerByBruker(2)).thenReturn(vurderinger);

        List<Vurdering> found = vurderingController.getVurderingerByBruker(2);
        assertEquals(vurderinger.get(0), found.get(0));
    }
}

