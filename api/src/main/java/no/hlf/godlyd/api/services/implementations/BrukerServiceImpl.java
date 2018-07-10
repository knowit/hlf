package no.hlf.godlyd.api.services.implementations;

import no.hlf.godlyd.api.repository.BrukerRepo;
import no.hlf.godlyd.api.services.BrukerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BrukerServiceImpl implements BrukerService {

    @Autowired
    BrukerRepo brukerRepo;
}
