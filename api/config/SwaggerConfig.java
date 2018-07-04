@Configuration
@EnableSwagger2
public class SwaggerConfig {
    @Bean
    public Docket productApi() {
        return new Docket(DocumentationType.SWAGGER_2)
                .select()                 .apis(RequestHandlerSelectors.basePackage("godlyd.no.hlf.godlyd.api.controller"))
                .paths(regex("/*"))
                .build();
    }
}