package com.internship.auctionapp;

import com.amazonaws.services.s3.AmazonS3;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

@SpringBootTest(
		webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT,
		properties = "spring.profiles.active=test"
)
class AuctionappApplicationTests {

	@MockBean
	private AmazonS3 amazonS3;

	@Test
	void contextLoads() {
	}

}
