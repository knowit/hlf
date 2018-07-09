package no.hlf.godlyd.api.services.implementations;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import no.hlf.godlyd.api.model.Bruker;
import no.hlf.godlyd.api.repository.BrukerRepo;
import no.hlf.godlyd.api.services.BrukerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import static no.hlf.godlyd.api.security.SecurityConstants.SECRET;

import javax.servlet.ServletException;
import java.util.Date;
import java.util.List;

@Service
public class BrukerServiceImpl implements BrukerService {

    @Autowired
    private BrukerRepo brukerRepo;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;



    public void save(Bruker bruker){
        bruker.setPassord(bCryptPasswordEncoder.encode(bruker.getPassord()));
        brukerRepo.save(bruker);
    }

    public Bruker findByBrukernavn(String brukernavn){
        return brukerRepo.findByBrukernavn(brukernavn);
    }

    public Bruker createBruker(Bruker bruker){
        Bruker b = brukerRepo.findByBrukernavn(bruker.getBrukernavn());
        if(b == null){
            save(bruker);
            return bruker;
        }
        return null;
    }

    public List<Bruker> getAllBrukere(){
        return brukerRepo.findAll();
    }

    public String login(Bruker bruker){
        String jwtToken = "";
        String brukernavn = bruker.getBrukernavn();
        String passord = bruker.getPassord();
        Bruker b = brukerRepo.findByBrukernavn(brukernavn);
        if(b == null){
            return null;
        }
        String pwd = b.getPassord();
        if(!bCryptPasswordEncoder.matches(passord, pwd)){
            return null;
        }
        jwtToken = Jwts.builder().setSubject(brukernavn).setIssuedAt(new Date())
                .signWith(SignatureAlgorithm.HS512, SECRET.getBytes()).compact();
        return jwtToken;
    }


}
