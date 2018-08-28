package no.hlf.godlyd.api.services.implementations;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import no.hlf.godlyd.api.services.KartService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;

@Service
public class GoogleMapsServiceImpl implements KartService {

    @Value(value="${com.google.maps.api_key}")
    private String API_KEY;

    private static final Logger logger = LoggerFactory.getLogger(GoogleMapsServiceImpl.class);

    @Override
    public JsonNode getStedsInformasjon(String placeId) throws IOException {
        RestTemplate restTemplate = new RestTemplate();
        String uri = "https://maps.googleapis.com/maps/api/place/details/json?placeid={PLACE_ID}" +
                "&language=no&fields=name,place_id,formatted_address,formatted_phone_number," +
                "international_phone_number,website,opening_hours,type,scope,url&key={API_KEY}";

        String result = restTemplate.getForObject(uri, String.class, placeId, API_KEY);
        JsonNode rootNode = (new ObjectMapper()).readTree(result);
        logger.info("StedInformasjon: " + rootNode);
        return rootNode;
    }

    @Override
    public String getStedsNavnFromPlaceId(String placeId) throws IOException {
        JsonNode rootNode = getStedsInformasjon(placeId);
        JsonNode resultNode = rootNode.get("result");
        JsonNode nameNode = resultNode.get("name");
        String name = nameNode.asText();
        logger.info("navn: " + name);
        return name;
    }
}
