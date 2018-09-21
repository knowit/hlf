package no.hlf.godlyd.api.repository;

import no.hlf.godlyd.api.model.ManagementApiToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ManagementApiTokenRepo extends JpaRepository<ManagementApiToken, Integer> {
    Optional<ManagementApiToken> findFirstByExpiresAtGreaterThanEqual(long currentTimestamp);
}