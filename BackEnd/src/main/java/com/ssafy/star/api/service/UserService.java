package com.ssafy.star.api.service;

import com.ssafy.star.common.db.dto.request.BadgeRegistReqDto;
import com.ssafy.star.common.db.dto.request.UserLoginReqDto;
import com.ssafy.star.common.db.dto.request.UserRegistReqDto;
import com.ssafy.star.common.db.dto.response.BadgeStatusDto;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface UserService {

    boolean registUser(UserRegistReqDto userRegistReqDto);
    String loginUser(UserLoginReqDto userLoginReqDto);
    void logoutUser(String token);
    boolean duplicateEmailCheck(String email);
    void emailVerificationCodeSend(String email);
    void registBadge(BadgeRegistReqDto dto, MultipartFile file) throws IOException;
    BadgeStatusDto searchBadgeStatus(String type);

}
