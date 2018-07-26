package no.hlf.godlyd.api.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.UNAUTHORIZED)
public class AccessDeniedException extends RuntimeException {

    public AccessDeniedException(String action, String resourcename, String fieldname, Object object) {
        super("Unauthorized: Attempted to " + action + " " + resourcename +" with "+fieldname+" "+object );
    }
}