package com.example.CustomLecture.service;

import com.example.CustomLecture.dto.CustomUserDetails;
import com.example.CustomLecture.entity.UserEntity;
import com.example.CustomLecture.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    public CustomUserDetailsService(UserRepository userRepository) {

        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        // DB에서 조회
        UserEntity userData = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("존재하지 않는 ID 입니다."));

        // UserDetails에 담아서 return하면 AuthenticationManager가 검증 함
        return new CustomUserDetails(userData);
    }
}
