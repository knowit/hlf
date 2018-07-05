package no.hlf.godlyd.api.config.security;

import no.hlf.godlyd.api.model.Bruker;
import no.hlf.godlyd.api.repository.BrukerRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import static java.util.Collections.emptyList;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    private BrukerRepo brukerRepo;

    public UserDetailsServiceImpl(BrukerRepo brukerRepo){
        this.brukerRepo = brukerRepo;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException{
        Bruker bruker = brukerRepo.findByBrukernavn(username);
        if (bruker == null){
            throw new UsernameNotFoundException(username);
        }
        return new User(bruker.getBrukernavn(), bruker.getPassord(), emptyList());
    }
}
