package no.hlf.godlyd.api;

import static org.springframework.boot.SpringApplication.*;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
@ComponentScan({"no.hlf.godlyd.api.services", "no.hlf.godlyd.api.security"})
public class GodLydApplication {
	public static void main(String[] args){
	    run(GodLydApplication.class, args);
	}
}
