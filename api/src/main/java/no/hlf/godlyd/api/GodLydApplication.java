package no.hlf.godlyd.api;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

import static org.springframework.boot.SpringApplication.run;

@EnableJpaAuditing
@SpringBootApplication
public class GodLydApplication {
	public static void main(String[] args){
	    run(GodLydApplication.class, args);
	}
}
