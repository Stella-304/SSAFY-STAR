package com.ssafy.star.api.service;

import com.ssafy.star.common.auth.enumeration.BadgeEnum;
import com.ssafy.star.common.auth.enumeration.LoginTypeEnum;
import com.ssafy.star.common.auth.info.UserAccount;
import com.ssafy.star.common.db.dto.request.BadgeRegistReqDto;
import com.ssafy.star.common.db.dto.request.UserLoginDto;
import com.ssafy.star.common.db.dto.request.UserRegistDto;
import com.ssafy.star.common.db.dto.response.BadgeStatusDto;
import com.ssafy.star.common.db.entity.AuthStatus;
import com.ssafy.star.common.db.entity.User;
import com.ssafy.star.common.db.repository.AuthStatusRepository;
import com.ssafy.star.common.db.repository.UserRepository;
import com.ssafy.star.common.exception.CommonApiException;
import com.ssafy.star.common.provider.AuthProvider;
import com.ssafy.star.common.provider.RedisProvider;
import com.ssafy.star.common.provider.S3Provider;
import com.ssafy.star.common.provider.TokenProvider;
import com.ssafy.star.common.util.RandValueMaker;
import com.ssafy.star.common.util.constant.CommonErrorCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserServiceImpl implements UserService {

    // SecurityConfig에 BCryptPasswordEncoder를 반환하도록 Bean등록 되어있음
    final PasswordEncoder passwordEncoder;
    final RandValueMaker randValueMaker;
    final TokenProvider tokenProvider;
    final RedisProvider redisProvider;
    final S3Provider s3Provider;
    final AuthProvider authProvider;
    final UserRepository userRepository;
    final AuthStatusRepository authStatusRepository;

    @Override
    public boolean registUser(UserRegistDto userRegistDto) {

        if(userRepository.existsByUserAccountAccountId(userRegistDto.getUserId())) {
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

        Optional<User> userOptional = userRepository.findByUserAccountAccountId(userLoginDto.getAccountId());
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            UserAccount userAccount = user.getUserAccount();

            if (passwordEncoder.matches(userLoginDto.getAccountPwd(), userAccount.getAccountPwd()) &&
                    userLoginDto.getAccountId().equals(userAccount.getAccountId())) {
                return tokenProvider.createTokenById(user.getId());
            }
        }
        return null;
    }

    @Override
    public boolean duplicateEmailCheck (String email) {
        return userRepository.existsByEmail(email);
    }

    @Override
    public void emailVerificationCodeSend(String email) {
        redisProvider.set(email, randValueMaker.makeVerificationCode(), 3L, TimeUnit.MINUTES);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void registBadge(BadgeRegistReqDto dto, MultipartFile file) throws IOException {
        // 이미지 S3에 저장하고, url 얻어옴
        String imageUrl = s3Provider.upload(file, "ssafy-star");
        // 유저 정보 얻어옴.
        log.debug("!!!!!!!!!!!!!!!{}", imageUrl);
        long userId = authProvider.getUserIdFromPrincipal();
        authStatusRepository.save(AuthStatus.builder()
                .user(User.builder().id(userId).build())
                .badgeType(dto.getBadgeType())
                .processStatus(false)
                .imageUrl(imageUrl)
                .build());
    }

    @Override
    public BadgeStatusDto searchBadgeStatus(String type) {
        BadgeEnum enumType = BadgeEnum.valueOf(type);
        long userId = authProvider.getUserIdFromPrincipal();
        User user = userRepository.findById(userId).orElseThrow(() -> new CommonApiException(CommonErrorCode.USER_NOT_FOUND));
        List<AuthStatus> authStatusList = authStatusRepository.findByUserAndBadgeType(user, enumType);

        // 인증이 마쳐진 경우.
        if (enumType == BadgeEnum.COMPANY && user.isCompanyIsAutorized())
            return new BadgeStatusDto("FINISHED");
        if (enumType == BadgeEnum.SSAFY && user.isAutorized())
            return new BadgeStatusDto("FINISHED");


        // 보낸 요청중에 하나라도 진행중인게 있으면.
        if (authStatusList.size() > 0)
            for (AuthStatus authStatus : authStatusList)
                if (!authStatus.isProcessStatus())
                    return new BadgeStatusDto("IN_PROGRESS");

        // 모든 요청이 거절당한경우(요청을 하나도 안보냈거나).
        return new BadgeStatusDto("NO_REQUEST");
    }

}
