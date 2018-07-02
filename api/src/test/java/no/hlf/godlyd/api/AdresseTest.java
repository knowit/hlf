package no.hlf.godlyd.api;

import no.hlf.godlyd.api.model.Adresse;
import no.hlf.godlyd.api.repository.AdresseRepo;
import org.junit.Test;
import org.junit.jupiter.api.extension.ExtendWith;
// import no.hlf.godlyd.api.GodLydApplication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.List;
import static org.junit.Assert.assertEquals;


@SpringBootTest(classes = GodLydApplication.class)
@ExtendWith(SpringExtension.class)
@DataJpaTest
public class AdresseTest {

    @Autowired
    private AdresseRepo adresseRepo;

/*
    @Test
    public void findAllAdresser(){
        List<Adresse> adresser = adresseRepo.findAll();
        return assertEquals(adresser, adresseRepo.findAll());

    }
*/

}
