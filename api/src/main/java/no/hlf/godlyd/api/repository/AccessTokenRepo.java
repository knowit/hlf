package no.hlf.godlyd.api.repository;

import no.hlf.godlyd.api.model.AccessToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AccessTokenRepo extends JpaRepository<AccessToken, Integer> {
    Optional<AccessToken> findFirstByToken(String token);

}