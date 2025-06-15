package com.internship.auctionapp.controller;

import com.amazonaws.services.s3.AmazonS3;
import com.internship.auctionapp.entity.Role;
import com.internship.auctionapp.entity.User;
import com.internship.auctionapp.repository.RoleRepository;
import com.internship.auctionapp.repository.UserRepository;
import com.internship.auctionapp.request.RegisterRequest;
import com.internship.auctionapp.response.JwtAuthResponse;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.ActiveProfiles;

import java.util.Optional;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(
        webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT,
        properties = "spring.profiles.active=test"
)
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
@ActiveProfiles("test")
@Transactional
@Rollback
class AuthControllerIntegrationTest {
    @Autowired
    private TestRestTemplate rest;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @LocalServerPort
    private int port;

    @MockBean
    private AmazonS3 amazonS3;

    private String REGISTER_URL;
    private static final String LOGIN_URL = "/api/auth/login";

    @BeforeAll
    void seedRoles() {
        if (roleRepository.count() == 0) {
            roleRepository.save(new Role(UUID.randomUUID(), "USER"));
            roleRepository.save(new Role(UUID.randomUUID(), "ADMIN"));
        }
    }

    @BeforeEach
    void setup() {
        REGISTER_URL = "http://localhost:" + port + "/api/auth/register";
    }

    @Test
    void register_shouldReturn201_andJwtToken_andPersistUserWithHashedPassword() {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        String plainPassword = "FakePassword";
        RegisterRequest regRequest = new RegisterRequest("John", "Doe", "john1@doe.com", plainPassword);
        HttpEntity<RegisterRequest> request = new HttpEntity<>(regRequest, headers);

        ResponseEntity<JwtAuthResponse> response = rest.postForEntity(
                REGISTER_URL, request, JwtAuthResponse.class
        );

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.CREATED);
        JwtAuthResponse body = response.getBody();
        assertThat(body).isNotNull();
        assertThat(body.getAccessToken()).isNotBlank();
        assertThat(body.getUser().getEmail()).isEqualTo(regRequest.getEmail());

        Optional<User> savedUserOpt = userRepository.findByEmail(regRequest.getEmail());
        assertThat(savedUserOpt).isPresent();
        User savedUser = savedUserOpt.get();

        assertThat(savedUser.getFirstName()).isEqualTo(regRequest.getFirstName());
        assertThat(savedUser.getLastName()).isEqualTo(regRequest.getLastName());
        assertThat(savedUser.getEmail()).isEqualTo(regRequest.getEmail());

        assertThat(savedUser.getPassword()).isNotEqualTo(plainPassword);
        assertThat(passwordEncoder.matches(plainPassword, savedUser.getPassword())).isTrue();
    }

    @Test
    void register_shouldRejectFirstNameWithOneCharacter() {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        RegisterRequest regRequest = new RegisterRequest("J", "Doe", "shortname@doe.com", "ValidPassword123");

        HttpEntity<RegisterRequest> request = new HttpEntity<>(regRequest, headers);

        ResponseEntity<String> response = rest.postForEntity(REGISTER_URL, request, String.class);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
    }

    @Test
    void register_shouldRejectLastNameWithOneCharacter() {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        RegisterRequest regRequest = new RegisterRequest("John", "D", "shortname@doe.com", "ValidPassword123");

        HttpEntity<RegisterRequest> request = new HttpEntity<>(regRequest, headers);

        ResponseEntity<String> response = rest.postForEntity(REGISTER_URL, request, String.class);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
    }

    @Test
    void register_shouldRejectEmailWithSevenCharacters() {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        RegisterRequest regRequest = new RegisterRequest("John", "Doe", "shortname@doe.com", "1234567");

        HttpEntity<RegisterRequest> request = new HttpEntity<>(regRequest, headers);

        ResponseEntity<String> response = rest.postForEntity(REGISTER_URL, request, String.class);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
    }

    @Test
    void register_shouldRejectFirstNameWithFiftyOneCharacter() {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        RegisterRequest regRequest = new RegisterRequest("012345678901234567890123456789012345678901234567890", "Doe", "john2@doe.com", "ValidPassword123");

        HttpEntity<RegisterRequest> request = new HttpEntity<>(regRequest, headers);

        ResponseEntity<String> response = rest.postForEntity(REGISTER_URL, request, String.class);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
    }

    @Test
    void register_shouldRejectLastNameWithFiftyOneCharacter() {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        RegisterRequest regRequest = new RegisterRequest("John", "012345678901234567890123456789012345678901234567890", "john3@doe.com", "ValidPassword123");

        HttpEntity<RegisterRequest> request = new HttpEntity<>(regRequest, headers);

        ResponseEntity<String> response = rest.postForEntity(REGISTER_URL, request, String.class);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
    }

    @Test
    void register_shouldRejectPasswordWithTwoHundredFiftySixCharacters() {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        RegisterRequest regRequest = new RegisterRequest(
                "John",
                "Doe",
                "john4@doe.com",
                "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

        HttpEntity<RegisterRequest> request = new HttpEntity<>(regRequest, headers);

        ResponseEntity<String> response = rest.postForEntity(REGISTER_URL, request, String.class);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
    }

    @Test
    void register_shouldRejectEmailWithThreeHundredTwentyOneCharacters() {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        RegisterRequest regRequest = new RegisterRequest(
                "John",
                "Doe",
                "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa@example-aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.com",
                "ValidPassword123");

        HttpEntity<RegisterRequest> request = new HttpEntity<>(regRequest, headers);

        ResponseEntity<String> response = rest.postForEntity(REGISTER_URL, request, String.class);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
    }


    @Test
    void register_shouldRejectInvalidEmail() {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        RegisterRequest regRequest = new RegisterRequest("John", "Doe", "InvalidEmail", "ValidPassword123");

        HttpEntity<RegisterRequest> request = new HttpEntity<>(regRequest, headers);

        ResponseEntity<String> response = rest.postForEntity(REGISTER_URL, request, String.class);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
    }

    @Test
    void register_shouldRejectEmptyFirstName() {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        RegisterRequest regRequest = new RegisterRequest("", "Doe", "john5@doe.com", "ValidPassword123");

        HttpEntity<RegisterRequest> request = new HttpEntity<>(regRequest, headers);

        ResponseEntity<String> response = rest.postForEntity(REGISTER_URL, request, String.class);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
    }

    @Test
    void register_shouldRejectEmptyLastName() {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        RegisterRequest regRequest = new RegisterRequest("John", "", "john6@doe.com", "ValidPassword123");

        HttpEntity<RegisterRequest> request = new HttpEntity<>(regRequest, headers);

        ResponseEntity<String> response = rest.postForEntity(REGISTER_URL, request, String.class);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
    }

    @Test
    void register_shouldRejectEmptyEmail() {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        RegisterRequest regRequest = new RegisterRequest("John", "Doe", "", "ValidPassword123");

        HttpEntity<RegisterRequest> request = new HttpEntity<>(regRequest, headers);

        ResponseEntity<String> response = rest.postForEntity(REGISTER_URL, request, String.class);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
    }

    @Test
    void register_shouldRejectEmptyPassword() {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        RegisterRequest regRequest = new RegisterRequest("John", "Doe", "john7@doe.com", "");

        HttpEntity<RegisterRequest> request = new HttpEntity<>(regRequest, headers);

        ResponseEntity<String> response = rest.postForEntity(REGISTER_URL, request, String.class);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
    }

    @Test
    void register_shouldReturn201_whenFirstNameIsExactlyTwoCharacters() {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        String plainPassword = "FakePassword";
        RegisterRequest regRequest = new RegisterRequest("Jo", "Doe", "john8@doe.com", plainPassword);
        HttpEntity<RegisterRequest> request = new HttpEntity<>(regRequest, headers);

        ResponseEntity<JwtAuthResponse> response = rest.postForEntity(
                REGISTER_URL, request, JwtAuthResponse.class
        );

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.CREATED);
        JwtAuthResponse body = response.getBody();
        assertThat(body).isNotNull();
        assertThat(body.getAccessToken()).isNotBlank();
        assertThat(body.getUser().getEmail()).isEqualTo(regRequest.getEmail());

        Optional<User> savedUserOpt = userRepository.findByEmail(regRequest.getEmail());
        assertThat(savedUserOpt).isPresent();
        User savedUser = savedUserOpt.get();

        assertThat(savedUser.getFirstName()).isEqualTo(regRequest.getFirstName());
        assertThat(savedUser.getLastName()).isEqualTo(regRequest.getLastName());
        assertThat(savedUser.getEmail()).isEqualTo(regRequest.getEmail());

        assertThat(savedUser.getPassword()).isNotEqualTo(plainPassword);
        assertThat(passwordEncoder.matches(plainPassword, savedUser.getPassword())).isTrue();
    }

    @Test
    void register_shouldReturn201_whenLastNameIsExactlyTwoCharacters() {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        String plainPassword = "FakePassword";
        RegisterRequest regRequest = new RegisterRequest("John", "Do", "john9@doe.com", plainPassword);
        HttpEntity<RegisterRequest> request = new HttpEntity<>(regRequest, headers);

        ResponseEntity<JwtAuthResponse> response = rest.postForEntity(
                REGISTER_URL, request, JwtAuthResponse.class
        );

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.CREATED);
        JwtAuthResponse body = response.getBody();
        assertThat(body).isNotNull();
        assertThat(body.getAccessToken()).isNotBlank();
        assertThat(body.getUser().getEmail()).isEqualTo(regRequest.getEmail());

        Optional<User> savedUserOpt = userRepository.findByEmail(regRequest.getEmail());
        assertThat(savedUserOpt).isPresent();
        User savedUser = savedUserOpt.get();

        assertThat(savedUser.getFirstName()).isEqualTo(regRequest.getFirstName());
        assertThat(savedUser.getLastName()).isEqualTo(regRequest.getLastName());
        assertThat(savedUser.getEmail()).isEqualTo(regRequest.getEmail());

        assertThat(savedUser.getPassword()).isNotEqualTo(plainPassword);
        assertThat(passwordEncoder.matches(plainPassword, savedUser.getPassword())).isTrue();
    }

    @Test
    void register_shouldReturn201_whenPasswordIsExactlyEightCharacters() {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        String plainPassword = "12345678";
        RegisterRequest regRequest = new RegisterRequest("John", "Doe", "john10@doe.com", plainPassword);
        HttpEntity<RegisterRequest> request = new HttpEntity<>(regRequest, headers);

        ResponseEntity<JwtAuthResponse> response = rest.postForEntity(
                REGISTER_URL, request, JwtAuthResponse.class
        );

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.CREATED);
        JwtAuthResponse body = response.getBody();
        assertThat(body).isNotNull();
        assertThat(body.getAccessToken()).isNotBlank();
        assertThat(body.getUser().getEmail()).isEqualTo(regRequest.getEmail());

        Optional<User> savedUserOpt = userRepository.findByEmail(regRequest.getEmail());
        assertThat(savedUserOpt).isPresent();
        User savedUser = savedUserOpt.get();

        assertThat(savedUser.getFirstName()).isEqualTo(regRequest.getFirstName());
        assertThat(savedUser.getLastName()).isEqualTo(regRequest.getLastName());
        assertThat(savedUser.getEmail()).isEqualTo(regRequest.getEmail());

        assertThat(savedUser.getPassword()).isNotEqualTo(plainPassword);
        assertThat(passwordEncoder.matches(plainPassword, savedUser.getPassword())).isTrue();
    }

    @Test
    void register_shouldReturn201_whenFirstNameIsExactlyFiftyCharacters() {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        String plainPassword = "FakePassword";
        RegisterRequest regRequest = new RegisterRequest("01234567890123456789012345678901234567890123456789", "Doe", "john22@doe.com", plainPassword);
        HttpEntity<RegisterRequest> request = new HttpEntity<>(regRequest, headers);

        ResponseEntity<JwtAuthResponse> response = rest.postForEntity(
                REGISTER_URL, request, JwtAuthResponse.class
        );

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.CREATED);
        JwtAuthResponse body = response.getBody();
        assertThat(body).isNotNull();
        assertThat(body.getAccessToken()).isNotBlank();
        assertThat(body.getUser().getEmail()).isEqualTo(regRequest.getEmail());

        Optional<User> savedUserOpt = userRepository.findByEmail(regRequest.getEmail());
        assertThat(savedUserOpt).isPresent();
        User savedUser = savedUserOpt.get();

        assertThat(savedUser.getFirstName()).isEqualTo(regRequest.getFirstName());
        assertThat(savedUser.getLastName()).isEqualTo(regRequest.getLastName());
        assertThat(savedUser.getEmail()).isEqualTo(regRequest.getEmail());

        assertThat(savedUser.getPassword()).isNotEqualTo(plainPassword);
        assertThat(passwordEncoder.matches(plainPassword, savedUser.getPassword())).isTrue();
    }

    @Test
    void register_shouldReturn201_whenPasswordIsExactlyTwoHundredFiftyFiveCharacters() {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        String plainPassword = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
        RegisterRequest regRequest = new RegisterRequest("John", "Doe", "john12@doe.com", plainPassword);
        HttpEntity<RegisterRequest> request = new HttpEntity<>(regRequest, headers);

        ResponseEntity<JwtAuthResponse> response = rest.postForEntity(
                REGISTER_URL, request, JwtAuthResponse.class
        );

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.CREATED);
        JwtAuthResponse body = response.getBody();
        assertThat(body).isNotNull();
        assertThat(body.getAccessToken()).isNotBlank();
        assertThat(body.getUser().getEmail()).isEqualTo(regRequest.getEmail());

        Optional<User> savedUserOpt = userRepository.findByEmail(regRequest.getEmail());
        assertThat(savedUserOpt).isPresent();
        User savedUser = savedUserOpt.get();

        assertThat(savedUser.getFirstName()).isEqualTo(regRequest.getFirstName());
        assertThat(savedUser.getLastName()).isEqualTo(regRequest.getLastName());
        assertThat(savedUser.getEmail()).isEqualTo(regRequest.getEmail());

        assertThat(savedUser.getPassword()).isNotEqualTo(plainPassword);
        assertThat(passwordEncoder.matches(plainPassword, savedUser.getPassword())).isTrue();
    }

    @Test
    void register_shouldReturn201_whenEmailIsExactlyThreeHundredAndTwentyCharacters() {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        String plainPassword = "FakePassword";
        RegisterRequest regRequest = new RegisterRequest(
                "John",
                "Doe",
                "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa@example-aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.com",
                plainPassword);
        HttpEntity<RegisterRequest> request = new HttpEntity<>(regRequest, headers);

        ResponseEntity<JwtAuthResponse> response = rest.postForEntity(
                REGISTER_URL, request, JwtAuthResponse.class
        );
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
    }

    @Test
    void register_shouldReturn201_whenLastNameIsExactlyFiftyCharacters() {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        String plainPassword = "FakePassword";
        RegisterRequest regRequest = new RegisterRequest("John", "01234567890123456789012345678901234567890123456789", "john13@doe.com", plainPassword);
        HttpEntity<RegisterRequest> request = new HttpEntity<>(regRequest, headers);

        ResponseEntity<JwtAuthResponse> response = rest.postForEntity(
                REGISTER_URL, request, JwtAuthResponse.class
        );

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.CREATED);
        JwtAuthResponse body = response.getBody();
        assertThat(body).isNotNull();
        assertThat(body.getAccessToken()).isNotBlank();
        assertThat(body.getUser().getEmail()).isEqualTo(regRequest.getEmail());

        Optional<User> savedUserOpt = userRepository.findByEmail(regRequest.getEmail());
        assertThat(savedUserOpt).isPresent();
        User savedUser = savedUserOpt.get();

        assertThat(savedUser.getFirstName()).isEqualTo(regRequest.getFirstName());
        assertThat(savedUser.getLastName()).isEqualTo(regRequest.getLastName());
        assertThat(savedUser.getEmail()).isEqualTo(regRequest.getEmail());

        assertThat(savedUser.getPassword()).isNotEqualTo(plainPassword);
        assertThat(passwordEncoder.matches(plainPassword, savedUser.getPassword())).isTrue();
    }

    @Test
    void register_shouldReturn400_whenEmailAlreadyExists() {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        String duplicateEmail = "duplicate@user.com";

        RegisterRequest firstRequest = new RegisterRequest("Alice", "Smith", duplicateEmail, "SecurePass123");
        HttpEntity<RegisterRequest> firstEntity = new HttpEntity<>(firstRequest, headers);

        ResponseEntity<JwtAuthResponse> firstResponse = rest.postForEntity(
                REGISTER_URL, firstEntity, JwtAuthResponse.class
        );
        assertThat(firstResponse.getStatusCode()).isEqualTo(HttpStatus.CREATED);

        RegisterRequest secondRequest = new RegisterRequest("Bob", "Johnson", duplicateEmail, "AnotherPass123");
        HttpEntity<RegisterRequest> secondEntity = new HttpEntity<>(secondRequest, headers);

        ResponseEntity<String> secondResponse = rest.postForEntity(
                REGISTER_URL, secondEntity, String.class
        );

        assertThat(secondResponse.getStatusCode()).isEqualTo(HttpStatus.CONFLICT);
    }

}