package com.internship.auctionapp.config;


import org.springdoc.core.models.GroupedOpenApi;
import org.springframework.context.annotation.Bean;

public class SwaggerConfig {

    //http://localhost:8080/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config

    @Bean
    public GroupedOpenApi publicApi(){
        return GroupedOpenApi.builder()
                .group("sve")
                .pathsToMatch("/**")
                .build();
    }
}
