package com.ssafy.star.api.service;

import com.ssafy.star.common.auth.enumeration.LoginTypeEnum;
import com.ssafy.star.common.auth.info.UserAccount;
import com.ssafy.star.common.db.dto.request.UserLoginDto;
import com.ssafy.star.common.db.dto.request.UserRegistDto;
import com.ssafy.star.common.db.entity.User;
import com.ssafy.star.common.db.repository.UserRepository;
import com.ssafy.star.common.provider.RedisProvider;
import com.ssafy.star.common.provider.TokenProvider;
import com.ssafy.star.common.util.RandValueMaker;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService{

    // SecurityConfig에 BCryptPasswordEncoder를 반환하도록 Bean등록 되어있음
    final PasswordEncoder passwordEncoder;
    final UserRepository userRepository;
    final TokenProvider tokenProvider;
    final RedisProvider redisProvider;
    final RandValueMaker randValueMaker;

    @Override
    public boolean registUser(UserRegistDto userRegistDto) {

        if(userRepository.existsByUserId(userRegistDto.getUserId())) {
            return false;
        }

        User user = User.builder()
                .email(userRegistDto.getEmail())
                .nickname(String.valueOf(userRegistDto.getNickname()))
                .loginType(LoginTypeEnum.custom)
                .userAccount(UserAccount.builder()
                        .accountId(userRegistDto.getUserId())
                        .accountPwd(passwordEncoder.encode(userRegistDto.getUserPwd()))
                        .build())
                .build();

        user.getAuthoritySet().add("ROLE_CLIENT");

        userRepository.save(user);
        return true;
    }

    @Override
    public String loginUser(UserLoginDto userLoginDto) {

        Optional<User> userOptional = userRepository.findByAccountId(userLoginDto.getAccountId());

        if(userOptional.isPresent()) {
            User user = userOptional.get();
            UserAccount userAccount = user.getUserAccount();

            if (passwordEncoder.matches(userLoginDto.getAccountPwd(), userAccount.getAccountPwd()) &&
                    userLoginDto.getAccountId().equals(userAccount.getAccountId()))
            { return tokenProvider.createTokenById(user.getId());}
        }

        return null;
    }

    @Override
    public boolean duplicateEmailCheck(String email) {
        return userRepository.existsByEmail(email);
    }

    @Override
    public void emailVerificationCodeSend(String email) {
        
        redisProvider.set(email, randValueMaker.makeVerificationCode(), 3L, TimeUnit.MINUTES);
    }


}
