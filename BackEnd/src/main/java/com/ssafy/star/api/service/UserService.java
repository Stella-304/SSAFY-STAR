package com.ssafy.star.api.service;

import com.ssafy.star.common.db.dto.request.*;
import com.ssafy.star.common.db.dto.response.BadgeStatusDto;
import com.ssafy.star.common.db.dto.response.UserDetailDto;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface UserService {

    boolean registUser(UserRegistReqDto userRegistReqDto);
    String loginUser(UserLoginReqDto userLoginReqDto);
    void logoutUser(String token);
    UserDetailDto getDetailUser();
    String getUser();
    void modifyUser(UserModifyReqDto userModifyReqDto);
    void modifyPwdUser(String newPwd);
    void deleteUser();
    boolean duplicateEmailCheck(String email);
    void sendVerificationCodeEmail(String email);
    boolean compareVerificationCodeEmail(EmailCompareReqDto emailCompareReqDto);
    String findIdUser(String email);
    void findPwdUser(UserFindPwdReqDto userFindPwdReqDto);
    void registBadge(BadgeRegistReqDto dto, MultipartFile file) throws IOException;
    BadgeStatusDto searchBadgeStatus(String type);

}
