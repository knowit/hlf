package no.hlf.godlyd.api.security;

import javax.net.ssl.HttpsURLConnection;
import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.Hashtable;
import java.util.Stack;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class Auth0Connection {

    @Value(value="${com.auth0.issuer}")
    private String issuer;

    @Value("${com.auth0.management.clientId}")
    private String managementClientId;

    @Value("${com.auth0.management.clientSecret}")
    private String managementClientSecret;

    @Value("${com.auth0.management.apiAudience}")
    private String managementAudience;

    @Value("${com.auth0.tokenUrl}")
    private String tokenUrl;


    public Hashtable<String, Object> getUserProfile(String authorization){

        String userId = getUserInfo(authorization).get("sub").toString();

        String url = managementAudience+"users/"+userId;
        Hashtable<String, String> headers = new Hashtable<>();
        headers.put("authorization", "Bearer "+getManagementAPIToken());
        String jsonResponse = getRequest(url, headers);
        return parseJson(jsonResponse);
    }

    private Hashtable<String, Object> getUserInfo(String authorization){
        String access_token = extractToken(authorization);
        String url = issuer+"userinfo";
        Hashtable<String, String> headers = new Hashtable<>();
        headers.put("Authorization", "Bearer "+access_token);
        String req = getRequest(url, headers);
        return parseJson(req);
    }

    private String getManagementAPIToken(){

        Hashtable<String, String> headers = new Hashtable<>();
        headers.put("Content-Type", "application/json");
        String res = postRequest(
                tokenUrl,
                headers,
                "{" +
                        "\"client_id\":\""+managementClientId+"\"," +
                        "\"client_secret\":\""+managementClientSecret+"\"," +
                        "\"audience\":\""+managementAudience+"\"," +
                        "\"grant_type\":\"client_credentials\"" +
                        "}");


        return getJsonField(res, "access_token").toString();
    }

    private String getRequest(String url, Hashtable<String, String> headers){
        try{
            URL obj = new URL(url);
            HttpURLConnection con = (HttpURLConnection) obj.openConnection();
            con.setRequestMethod("GET");
            con.setDoInput(true);
            for(String header: headers.keySet()){
                con.setRequestProperty(header, headers.get(header));
            }
            BufferedReader in = new BufferedReader((new InputStreamReader(con.getInputStream())));
            String inputLine;
            StringBuffer res = new StringBuffer();

            while((inputLine = in.readLine()) != null){
                res.append(inputLine);
            }
            in.close();
            return res.toString();
        }catch(Exception e){
            // Handle exception
        }
        return null;
    }

    private String postRequest(String url, Hashtable<String, String> headers, String payload){
        try{
            URL obj = new URL(url);
            HttpsURLConnection con = (HttpsURLConnection) obj.openConnection();
            con.setRequestMethod("POST");
            con.setDoInput(true);
            for (String header : headers.keySet()) {
                con.setRequestProperty(header, headers.get(header));
            }
            con.setRequestProperty("Content-Language", "en-US");
            con.setDoOutput(true);
            DataOutputStream wr = new DataOutputStream(con.getOutputStream());
            if (payload != null) {
                wr.writeBytes(payload);
            }
            wr.flush();
            wr.close();

            BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()));
            String inputLine;
            StringBuffer res = new StringBuffer();

            while ((inputLine = in.readLine()) != null) {
                res.append(inputLine);
            }
            in.close();
            return res.toString();
        }catch(Exception e){
            // Handle exception
        }
        return null;
    }


    private Object getJsonField(String jsonString, String fieldname){
        Hashtable<String, Object> json = parseJson(jsonString);
        if(json.keySet().contains(fieldname)){
            return json.get(fieldname);
        }
        return null;
    }


    private Hashtable<String, Object> parseJson(String string){

        Hashtable<String, Object> object = new Hashtable<>();

        String fieldname = "";
        String value = "";

        boolean scan = false;

        Stack<Hashtable<String, Object>> bodyStack = new Stack<>();
        Stack<String> arrayNameStack = new Stack<>();
        Stack<ArrayList<Hashtable<String, Object>>> arrayStack = new Stack<>();

        for(int i = 0; i < string.length(); i++){
            char c = string.charAt(i);

            if(c=='{'){    // Body start
                bodyStack.push(new Hashtable<>());
                if(!arrayStack.isEmpty()){
                    arrayStack.peek().add(bodyStack.peek());
                }
                scan = false;
                fieldname = "";
                value = "";

            } else if(c=='}'){  // Body end
                if(scan){
                    bodyStack.peek().put(fieldname, value);
                    scan = false;
                }
                object = bodyStack.pop();
            }

            else if(c=='['){         // Array start
                arrayStack.push(new ArrayList<>());
                arrayNameStack.push(fieldname);

            } else if(c==']'){  // Array end
                bodyStack.peek().put(arrayNameStack.pop(), arrayStack.pop());
                scan = false;
            }

            else if(c==':'){
                scan = true;
            }
            else if(c==',' && scan){
                scan = false;
                bodyStack.peek().put(fieldname, value);
                fieldname = "";
                value = "";
            }

            else if(c != '\"'){
                if(!scan){
                    fieldname += c;
                }
                else{
                    value += c;
                }
            }
        }

        return object;
    }
    private String extractToken(String authorization){
        return authorization.substring(7);
    }
}
