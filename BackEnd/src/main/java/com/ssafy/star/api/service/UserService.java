package com.ssafy.star.api.service;

import com.ssafy.star.common.db.dto.request.UserLoginDto;
import com.ssafy.star.common.db.dto.request.UserRegistDto;

import java.util.Optional;

public interface UserService {

    boolean registUser(UserRegistDto userRegistDto);
    String loginUser(UserLoginDto userLoginDto);
    boolean duplicateEmailCheck(String email);
    void emailVerificationCodeSend(String email);
}
