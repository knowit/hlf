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

public class Auth0Connection {

    private static final String tokenUrl = "https://hlf-godlyd.eu.auth0.com/oauth/token";
    private static final String clientId = "DQ3EL0M3tDziTnbGyabj3TKyeJnXXkAh";
    private static final String clientSecret = "NvBtZwlnfoHnwdY2NLF2yjyuxPf83Fw2FnY-RKBlwID7ReXLtLVOGVzOwrDiBBxM";
    private static final String audience = "https://hlf-godlyd.eu.auth0.com/api/v2/";

    public Hashtable<String, Object> getFullUserProfileJson(String access_token) throws Exception{

        String userId = getUserInfo(access_token).get("sub").toString();

        String url = "https://hlf-godlyd.eu.auth0.com/api/v2/users/"+userId;
        String method = "GET";
        Hashtable<String, String> headers = new Hashtable<>();
        headers.put("authorization", "Bearer "+getManagementAPIToken());
        String jsonResponse = getRequest(url, method, headers);
        return parseJson(jsonResponse);
    }

    private Hashtable<String, Object> getUserInfo(String access_token) throws Exception{

        String url = "https://hlf-godlyd.eu.auth0.com/userinfo";
        String method = "GET";
        Hashtable<String, String> headers = new Hashtable<>();
        headers.put("Authorization", "Bearer "+access_token);
        String req = getRequest(url, method, headers);
        return parseJson(req);
    }

    private String getManagementAPIToken() throws Exception{
        Hashtable<String, String> headers = new Hashtable<>();
        headers.put("Content-Type", "application/json");
        String res = postRequest(
                tokenUrl,
                headers,
                "{\"client_id\":\""+clientId+"\",\"client_secret\":\""+clientSecret+"\",\"audience\":\""+audience+"\",\"grant_type\":\"client_credentials\"}");

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

    private String postRequest(String url, Hashtable<String, String> headers, String payload) throws Exception {
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
