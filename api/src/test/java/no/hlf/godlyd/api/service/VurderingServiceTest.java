package no.hlf.godlyd.api.service;

import no.hlf.godlyd.api.GodLydApplication;
import no.hlf.godlyd.api.model.*;
import no.hlf.godlyd.api.repository.VurderingRepo;
import no.hlf.godlyd.api.services.VurderingService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@SpringBootTest(classes = GodLydApplication.class)
@ExtendWith(SpringExtension.class)
public class VurderingServiceTest {

    @Mock
    private VurderingRepo vurderingRepo;

    @InjectMocks
    private VurderingService vurderingService;

    private List<Vurdering> vurderinger;

    @BeforeEach
    private void init() {
        MockitoAnnotations.initMocks(this);

        Bruker bruker = new Bruker();
        bruker.setAuth0UserId("userid5");

        this.vurderinger = Stream.of(new Vurdering(new Sted("ChIJmeCJ639uQUYRc3OrOTekBZw"),
                bruker, "Bra teleslynge", VurderingsType.Teleslynge, Rangering.OPP))
                .collect(Collectors.toList()) ;
    }
}
