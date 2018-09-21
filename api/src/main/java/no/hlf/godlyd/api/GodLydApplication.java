package no.hlf.godlyd.api;

import static org.springframework.boot.SpringApplication.*;

import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@SpringBootApplication
@EnableJpaAuditing
@ComponentScan()
@EnableAutoConfiguration
@EnableSwagger2
public class GodLydApplication {
	public static void main(String[] args){
	    run(GodLydApplication.class, args);
	}
}
