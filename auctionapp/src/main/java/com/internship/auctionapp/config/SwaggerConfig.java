package com.internship.auctionapp.config;


import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import org.springdoc.core.models.GroupedOpenApi;
import org.springframework.context.annotation.Bean;

/**
 * Make Swagger documentation available at swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config
 */
@OpenAPIDefinition(
        info = @Info(
                title = "Auction App",
                version = "1.0.0",
                description = "Online marketplace for selling, bidding on & buying products."
        )
)
public class SwaggerConfig {

    @Bean
    public GroupedOpenApi publicApi(){
        return GroupedOpenApi.builder()
                .pathsToMatch("/**")
                .build();
    }
}
