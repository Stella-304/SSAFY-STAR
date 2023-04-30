package com.ssafy.star.api.service;

import com.ssafy.star.common.db.dto.request.BadgeRegistReqDto;
import com.ssafy.star.common.db.dto.request.UserLoginDto;
import com.ssafy.star.common.db.dto.request.UserRegistDto;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface UserService {

    boolean registUser(UserRegistDto userRegistDto);
    String loginUser(UserLoginDto userLoginDto);
    boolean duplicateEmailCheck(String email);
    void emailVerificationCodeSend(String email);
    void registUser();

	void registBadge(BadgeRegistReqDto dto, MultipartFile file) throws IOException;
}
