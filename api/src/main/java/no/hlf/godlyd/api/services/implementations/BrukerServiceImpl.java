package no.hlf.godlyd.api.services.implementations;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import no.hlf.godlyd.api.model.Bruker;
import no.hlf.godlyd.api.repository.BrukerRepo;
import no.hlf.godlyd.api.security.Auth0Connection;
import no.hlf.godlyd.api.services.BrukerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import static no.hlf.godlyd.api.security.SecurityConstants.EXPIRATION_TIME;
import static no.hlf.godlyd.api.security.SecurityConstants.SECRET;

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
        try{
            String userId = bruker.getBrukernavn();
            Auth0Connection con = new Auth0Connection(userId);
            String access_token = con.getUserAccessToken();

            if(access_token == null || access_token.equals("")){
                return null;
            }

            Bruker b = brukerRepo.findByBrukernavn(userId);

            if(b == null){
                b = new Bruker();
                b.setBrukernavn(bruker.getBrukernavn());
                b.setPassord(bCryptPasswordEncoder.encode(access_token));
                save(b);
            }

            if(bCryptPasswordEncoder.matches(bruker.getPassord(), b.getPassord())){
                String token = Jwts.builder()
                        .setSubject(userId)
                        .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                        .signWith(SignatureAlgorithm.HS512, SECRET.getBytes())
                        .compact();
                return token;
            }


        }catch(Exception e){

        }
        return null;
    }


}
