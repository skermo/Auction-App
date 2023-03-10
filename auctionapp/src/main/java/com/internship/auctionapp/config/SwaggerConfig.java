package com.internship.auctionapp.config;


import org.springdoc.core.models.GroupedOpenApi;
import org.springframework.context.annotation.Bean;

/**
 * Make Swagger documentation available at swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config
 */

public class SwaggerConfig {

    @Bean
    public GroupedOpenApi publicApi(){
        return GroupedOpenApi.builder()
                .pathsToMatch("/**")
                .build();
    }
}
