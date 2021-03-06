package no.hlf.godlyd.api.config;

import com.auth0.spring.security.api.JwtWebSecurityConfigurer;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;

@EnableWebSecurity
@Configuration
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Value(value = "${com.auth0.apiAudience}")
    private String apiAudience;

    @Value(value = "${com.auth0.issuer}")
    private String issuer;
    
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        JwtWebSecurityConfigurer
                .forRS256(apiAudience, issuer)
                .configure(http)
                .authorizeRequests()
                .antMatchers(HttpMethod.GET, "/healthcheck").permitAll()
                .antMatchers(HttpMethod.GET, "/steder/info/place/{placeId}").permitAll()
                .antMatchers(HttpMethod.GET, "/steder/place/{placeId}/totalvurdering/{google}").permitAll()
                .antMatchers(HttpMethod.GET, "/vurderinger/bruker").permitAll()
                .antMatchers(HttpMethod.GET, "/vurderinger/all/place/{placeId}").permitAll()
                .antMatchers(HttpMethod.GET, "/vurderinger/place/{placeId}").permitAll()
                .antMatchers(HttpMethod.GET, "/vurderinger/place/{placeId}/bruker").permitAll()
                .antMatchers(HttpMethod.POST, "/session").permitAll()
                .antMatchers(HttpMethod.DELETE, "/session").authenticated()
                .antMatchers(HttpMethod.DELETE, "/brukere/min-konto").authenticated()
                .antMatchers(HttpMethod.GET, "/v2/api-docs").permitAll()
                .antMatchers(HttpMethod.GET, "/swagger-ui.html**").permitAll()
                .antMatchers(HttpMethod.GET, "/webjars/**").permitAll()
                .antMatchers(HttpMethod.GET, "/swagger-resources/**").permitAll()
                .antMatchers("/**").authenticated()
                .and()
                .logout().permitAll();
        
        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.NEVER);
    }
}