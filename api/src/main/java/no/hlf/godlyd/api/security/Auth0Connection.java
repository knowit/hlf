package no.hlf.godlyd.api.security;

import no.hlf.godlyd.api.model.Bruker;
import org.springframework.beans.factory.annotation.Value;
import javax.net.ssl.HttpsURLConnection;
import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.Hashtable;
import java.util.Stack;

public class Auth0Connection {

    @Value(value = "${auth0.apiAudience}")
    private String apiAudience;

    @Value(value = "${auth0.issuer}")
    private String issuer;

    @Value(value = "${com.auth0.domain}")
    private String domain;

    @Value(value = "${com.auth0.clientId}")
    private String clientId;

    @Value(value = "${com.auth0.clientSecret}")
    private String clientSecret;

    private String userId;

    public Auth0Connection(String userId){
        this.userId = userId;
    }

    public String getUserAccessToken() throws Exception{
        return ((ArrayList<Hashtable<String, Object>>)getFullUserProfileJson(userId).get("identities")).get(0)
                .get("access_token").toString();
    }

    private Hashtable<String, Object> getFullUserProfileJson(String userId) throws Exception{
        String url = "https://hlf-godlyd.eu.auth0.com/api/v2/users/"+userId;
        String method = "GET";
        Hashtable<String, String> headers = new Hashtable<>();
        headers.put("authorization", "Bearer "+getManagementAPIToken());
        String jsonResponse = getRequest(url, method, headers);
        return parseJson(jsonResponse);
    }

    private String getManagementAPIToken() throws Exception{
        Hashtable<String, String> headers = new Hashtable<>();
        headers.put("Content-Type", "application/json");
        String res = postRequest(
                "https://hlf-godlyd.eu.auth0.com/oauth/token",
                "POST",
                headers,
                "{\"client_id\":\""+clientId+"\",\"client_secret\":\""+clientSecret+"\",\"audience\":\""+apiAudience+"\",\"grant_type\":\"client_credentials\"}");

        String token = getJsonField(res, "access_token").toString();
        return token;
    }

    private String getRequest(String url, String method, Hashtable<String, String> headers) throws Exception{
        URL obj = new URL(url);
        HttpURLConnection con = (HttpURLConnection) obj.openConnection();
        con.setRequestMethod(method);
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
    }

    private String postRequest(String url, String method, Hashtable<String, String> headers, String payload) throws Exception{
        URL obj = new URL(url);
        HttpsURLConnection con = (HttpsURLConnection) obj.openConnection();
        con.setRequestMethod(method);
        con.setDoInput(true);
        for(String header: headers.keySet()){
            con.setRequestProperty(header, headers.get(header));
        }
        con.setRequestProperty("Content-Language", "en-US");
        con.setDoOutput(true);
        DataOutputStream wr = new DataOutputStream(con.getOutputStream());
        if(payload != null){
            wr.writeBytes(payload);
        }
        wr.flush();
        wr.close();

        BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()));
        String inputLine;
        StringBuffer res = new StringBuffer();

        while((inputLine = in.readLine()) != null){
            res.append(inputLine);
        }
        in.close();
        return res.toString();
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
}
