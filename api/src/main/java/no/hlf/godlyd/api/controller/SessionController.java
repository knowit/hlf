package no.hlf.godlyd.api.controller;

import no.hlf.godlyd.api.model.Bruker;
import no.hlf.godlyd.api.services.AccessTokenService;
import no.hlf.godlyd.api.services.BrukerService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/session")
public class SessionController {

    @Autowired
    private BrukerService brukerService;

    @Autowired
    private AccessTokenService accessTokenService;

    private static final Logger logger = LoggerFactory.getLogger(SessionController.class);

    @PostMapping
    public Bruker login(@RequestHeader("Authorization") String auth) {
        logger.info("login: auth=" + auth);
        return brukerService.getBrukerFromAuthToken(auth);
    }

    @DeleteMapping
    public HttpStatus logout(@RequestHeader("Authorization") String auth) {
        logger.info("logout: auth=" + auth);
        accessTokenService.deleteAccessToken(auth);
        return HttpStatus.NO_CONTENT;
    }
}
