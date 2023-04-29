package com.internship.auctionapp.service.impl;

import com.internship.auctionapp.aws.FileStore;
import com.internship.auctionapp.aws.bucket.BucketName;
import com.internship.auctionapp.dto.UserDto;
import com.internship.auctionapp.entity.Role;
import com.internship.auctionapp.entity.User;
import com.internship.auctionapp.exception.ConflictException;
import com.internship.auctionapp.exception.NotFoundException;
import com.internship.auctionapp.repository.RoleRepository;
import com.internship.auctionapp.repository.UserRepository;
import com.internship.auctionapp.request.LoginRequest;
import com.internship.auctionapp.request.RegisterRequest;
import com.internship.auctionapp.response.JwtAuthResponse;
import com.internship.auctionapp.security.jwt.JwtUtils;
import com.internship.auctionapp.service.AuthService;
import org.apache.http.entity.ContentType;
import org.modelmapper.ModelMapper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;


@Service
public class AuthServiceImpl implements AuthService {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils tokenProvider;
    private final ModelMapper mapper;
    private final FileStore fileStore;

    public AuthServiceImpl(AuthenticationManager authenticationManager,
                           UserRepository userRepository,
                           RoleRepository roleRepository,
                           PasswordEncoder passwordEncoder,
                           JwtUtils tokenProvider, ModelMapper mapper,
                           FileStore fileStore) {
        this.mapper = mapper;
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.tokenProvider = tokenProvider;
        this.fileStore = fileStore;
    }

    @Override
    public JwtAuthResponse login(LoginRequest loginRequest) {
        User user = userRepository.findByEmail(loginRequest.getEmail()).orElse(null);
        if (user == null || !passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            throw new NotFoundException("Wrong email or password");
        }
        Authentication authentication = authenticationManager
                .authenticate
                        (new UsernamePasswordAuthenticationToken
                                (loginRequest.getEmail(), loginRequest.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = tokenProvider.generateJwtToken(authentication);
        return new JwtAuthResponse(mapToDto(user), jwt);
    }

    @Override
    public JwtAuthResponse registration(RegisterRequest registerRequest) {
        if (userRepository.existsByEmail(registerRequest.getEmail())) {
            throw new ConflictException("Email already exists");
        }
        Set<Role> roles = new HashSet<>();
        Role role = roleRepository.findByName("USER").get();
        roles.add(role);
        User user = User.builder()
                .firstName(registerRequest.getFirstName())
                .lastName(registerRequest.getLastName())
                .email(registerRequest.getEmail())
                .password(passwordEncoder
                        .encode(registerRequest.getPassword()))
                .roles(roles)
                .build();
        userRepository.save(user);
        Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(
                        registerRequest.getEmail(),
                        registerRequest.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = tokenProvider.generateJwtToken(authentication);
        return new JwtAuthResponse(mapToDto(user), jwt);
    }

    public void logout(String request) {
        String token = null;
        if (StringUtils.hasText(request) && request.startsWith("Bearer ")) {
            token = request.substring(7);
        }
        tokenProvider.invalidateToken(token);
    }

    private UserDto mapToDto(User user) {
        return mapper.map(user, UserDto.class);
    }
}
