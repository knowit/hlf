package no.hlf.godlyd.api.controller;

import no.hlf.godlyd.api.GodLydApplication;
import no.hlf.godlyd.api.model.*;
import no.hlf.godlyd.api.services.VurderingService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.mockito.junit.jupiter.MockitoSettings;
import org.mockito.quality.Strictness;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@SpringBootTest(classes = GodLydApplication.class)
@ExtendWith(MockitoExtension.class)
@MockitoSettings(strictness = Strictness.LENIENT)
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

        this.vurderinger = Stream.of(new Vurdering(new Sted("ChIJmeCJ639uQUYRc3OrOTekBZw"),
                bruker, "Bra teleslynge", VurderingsType.Teleslynge, Rangering.OPP))
                .collect(Collectors.toList()) ;
    }

    // TEST CASES
    @Test
    public void testGetVurderingerFromPlaceId() {
        String placeId = "ChIJmeCJ639uQUYRc3OrOTekBZw";
        String dato = "1970-01-01";

        when(vurderingService.getAllVurderingerByPlaceIdNewerThan(placeId, LocalDate.parse(dato)))
                .thenReturn(vurderinger);

        List<Vurdering> found = vurderingController.getAllVurderingerByPlaceId(placeId, dato);
        assertEquals(vurderinger.get(0), found.get(0));
    }
}

