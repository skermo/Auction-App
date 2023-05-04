package com.internship.auctionapp;

import com.stripe.Stripe;
import jakarta.annotation.PostConstruct;
import org.modelmapper.ModelMapper;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class AuctionappApplication {
	@Bean
	public ModelMapper modelMapper(){
		return new ModelMapper();
	}
	@PostConstruct
	public void setUp(){
		Stripe.apiKey = "sk_test_51N3gQwJfjmrWeWPQYVP6EarH9NnTqLGO22fIHrWq1a1Pj5ekkql9y1uoZdq77OP9pfMjOC9pombEot7XfNh1RPM800PqMZS91b";
	}
	public static void main(String[] args) {
		SpringApplication.run(AuctionappApplication.class, args);
	}

}
