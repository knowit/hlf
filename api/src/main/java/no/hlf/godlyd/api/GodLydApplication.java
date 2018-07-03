package no.hlf.godlyd.api;

import static org.springframework.boot.SpringApplication.*;

import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.PropertySource;
import org.springframework.context.annotation.PropertySources;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

//@ComponentScan(basePackages = "com.auth0.example")
/*
@PropertySources({
        @PropertySource("classpath:application.properties"),
        @PropertySource("classpath:auth0.properties")
})
*/
@SpringBootApplication
@ComponentScan
@EnableAutoConfiguration
public class GodLydApplication {

	public static void main(String[] args){
	    run(GodLydApplication.class, args);
	}

	/*
    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder(){
	    return new BCryptPasswordEncoder();
    }
    */

    /*
	@Bean
	public WebMvcConfigurer corsConfigurer(){
		return new WebMvcConfigurer(){
			@Override
			public void addCorsMappings(CorsRegistry registry){
				registry.addMapping("/**").allowedMethods("GET", "PUT", "DELETE", "POST", "OPTIONS");
			}
		};
	}
	*/

    /*
            <dependency>
            <groupId>com.auth0</groupId>
            <artifactId>mvc-auth-commons</artifactId>
            <version>1.0.0</version>
        </dependency>


        <dependency>
            <groupId>org.hibernate</groupId>
            <artifactId>hibernate-core</artifactId>
            <version>5.0.7.Final</version>
        </dependency>

     */
}
