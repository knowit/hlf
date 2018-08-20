package no.hlf.godlyd.api.controller;

import no.hlf.godlyd.api.GodLydApplication;
import no.hlf.godlyd.api.model.Sted;
import no.hlf.godlyd.api.services.StedService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.MockitoJUnitRunner;
import org.mockito.junit.jupiter.MockitoExtension;
import org.mockito.junit.jupiter.MockitoSettings;
import org.mockito.quality.Strictness;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@SpringBootTest(classes = GodLydApplication.class)
@ExtendWith(MockitoExtension.class)
@MockitoSettings(strictness = Strictness.LENIENT)
public class StedControllerTest {

    private Sted sted;

    @Mock
    private StedService stedService;

    @InjectMocks
    private StedController stedController = new StedController();

    @BeforeEach
    private void init(){
        MockitoAnnotations.initMocks(this);
        this.sted = new Sted("ChIJezW6eddtQUYRHFnCrMk4cGc");
    }

    // TEST CASES
    @Test
    public void testGetAllSteder() {
        when(stedService.getAllSteder()).thenReturn(Stream.of(sted).collect(Collectors.toList()));

        List<Sted> found = stedController.getAllSteder();
        assertEquals(sted.getId(), found.get(0).getId());
    }

    @Test
    public void testGetStederByPlaceId(){
        when(stedService.getStedFromPlaceId(sted.getPlaceId())).thenReturn(sted);

        Sted found = stedController.getStedByPlaceId(sted.getPlaceId());
        assertEquals(sted.getId(), found.getId());
    }

}
