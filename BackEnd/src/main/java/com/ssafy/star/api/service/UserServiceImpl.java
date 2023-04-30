package com.ssafy.star.api.service;

import java.io.IOException;
import java.util.List;

import com.ssafy.star.common.auth.enumeration.BadgeEnum;
import com.ssafy.star.common.db.dto.request.BadgeRegistReqDto;
import com.ssafy.star.common.db.dto.response.BadgeStatusDto;
import com.ssafy.star.common.db.entity.AuthStatus;
import com.ssafy.star.common.db.entity.User;
import com.ssafy.star.common.db.repository.AuthStatusRepository;
import com.ssafy.star.common.db.repository.UserRepository;
import com.ssafy.star.common.exception.CommonApiException;
import com.ssafy.star.common.provider.AuthProvider;
import com.ssafy.star.common.util.S3Service;

import com.ssafy.star.common.util.constant.CommonErrorCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserServiceImpl implements UserService {

    final UserRepository userRepository;
    final S3Service s3Service;
    final AuthStatusRepository authStatusRepository;
    final AuthProvider authProvider;

    @Override
    public void registUser() {

    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void registBadge(BadgeRegistReqDto dto, MultipartFile file) throws IOException {
        // 이미지 S3에 저장하고, url 얻어옴
        String imageUrl = s3Service.upload(file, "ssafy-star");
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
        List<AuthStatus> authStatusList = authStatusRepository.findByUserAndBadge(user, enumType);

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
