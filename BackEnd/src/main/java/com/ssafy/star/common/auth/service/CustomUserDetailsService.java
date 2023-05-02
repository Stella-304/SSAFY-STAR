package com.ssafy.star.common.auth.service;

import com.ssafy.star.common.auth.exception.CustomAuthException;
import com.ssafy.star.common.auth.principal.UserPrincipal;
import com.ssafy.star.common.db.entity.User;
import com.ssafy.star.common.db.repository.UserRepository;
import com.ssafy.star.common.util.constant.CommonErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String email)
            throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new CustomAuthException(CommonErrorCode.USER_EMAIL_NOT_FOUND));
        return UserPrincipal.createExistingUserPrincipal(user);
    }

    @Transactional
    public UserDetails loadUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new CustomAuthException(CommonErrorCode.USER_ID_NOT_FOUND));
        return UserPrincipal.createExistingUserPrincipal(user);

    }

}