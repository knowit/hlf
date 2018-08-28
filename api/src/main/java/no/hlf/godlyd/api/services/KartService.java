package no.hlf.godlyd.api.services;

import com.fasterxml.jackson.databind.JsonNode;

import java.io.IOException;

public interface KartService {
    JsonNode getStedsInformasjon(String placeId) throws IOException;
    String getStedsNavnFromPlaceId(String placeId) throws IOException;
}
