package no.hlf.godlyd.api.services.implementations;

import no.hlf.godlyd.api.model.Bruker;
import no.hlf.godlyd.api.repository.BrukerRepo;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import static java.util.Collections.emptyList;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    private BrukerRepo applicationUserRepository;

    public UserDetailsServiceImpl(BrukerRepo applicationUserRepository) {
        this.applicationUserRepository = applicationUserRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Bruker applicationUser = applicationUserRepository.findByBrukernavn(username);
        if (applicationUser == null) {
            throw new UsernameNotFoundException(username);
        }
        return new User(applicationUser.getBrukernavn(), applicationUser.getPassord(), emptyList());
    }
}
