package com.internship.auctionapp.service.impl;

import com.internship.auctionapp.entity.Role;
import com.internship.auctionapp.entity.User;
import com.internship.auctionapp.exception.ApiException;
import com.internship.auctionapp.repository.RoleRepository;
import com.internship.auctionapp.repository.UserRepository;
import com.internship.auctionapp.request.LoginRequest;
import com.internship.auctionapp.request.RegisterRequest;
import com.internship.auctionapp.response.JwtAuthResponse;
import com.internship.auctionapp.security.jwt.JwtUtils;
import com.internship.auctionapp.service.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.HashSet;
import java.util.Set;


@Service
public class AuthServiceImpl implements AuthService {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils tokenProvider;

    public AuthServiceImpl(AuthenticationManager authenticationManager,
                           UserRepository userRepository,
                           RoleRepository roleRepository,
                           PasswordEncoder passwordEncoder,
                           JwtUtils tokenProvider) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.tokenProvider = tokenProvider;
    }

    @Override
    public JwtAuthResponse login(LoginRequest loginRequest) {
        User user = userRepository.findByEmail(loginRequest.getEmail()).orElse(null);
        if (user == null || !passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "Wrong email or password");
        }
        Authentication authentication = authenticationManager
                .authenticate
                        (new UsernamePasswordAuthenticationToken
                                (loginRequest.getEmail(), loginRequest.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = tokenProvider.generateJwtToken(authentication);
        user.setPassword(null);
        return new JwtAuthResponse(user, jwt);
    }

    @Override
    public JwtAuthResponse registration(RegisterRequest registerRequest) {
        if (userRepository.existsByEmail(registerRequest.getEmail())) {
            throw new ApiException(HttpStatus.CONFLICT, "Email already exists!");
        }
        User user = new User();
        user.setFirstName(registerRequest.getFirstName());
        user.setLastName(registerRequest.getLastName());
        user.setEmail(registerRequest.getEmail());
        user.setPassword(passwordEncoder
                .encode(registerRequest.getPassword()));
        Set<Role> roles = new HashSet<>();
        Role role = roleRepository.findByName("USER").get();
        roles.add(role);
        user.setRoles(roles);
        userRepository.save(user);
        Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(
                        registerRequest.getEmail(),
                        registerRequest.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = tokenProvider.generateJwtToken(authentication);
        user.setPassword(null);
        return new JwtAuthResponse(user, jwt);
    }

    public void logout(String request) {
        String token = null;
        if (StringUtils.hasText(request) && request.startsWith("Bearer ")) {
            token = request.substring(7);
        }
        tokenProvider.invalidateToken(token);
    }
}
