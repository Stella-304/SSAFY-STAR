package com.ssafy.star.api.service;

import com.ssafy.star.common.db.dto.request.*;
import com.ssafy.star.common.db.dto.response.BadgeStatusDto;
import com.ssafy.star.common.db.dto.response.UserDetailDto;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface UserService {

    void registUser(UserRegistReqDto userRegistReqDto);
    String loginUser(UserLoginReqDto userLoginReqDto);
    void logoutUser(String token);
    UserDetailDto getDetailUser();
    void modifyUser(UserModifyReqDto userModifyReqDto);
    void modifyPwdUser(String newPwd);
    void modifyNameUser(String newName);
    void deleteUser();
    boolean duplicateEmailCheck(String email);
    boolean duplicateNickNameCheck(String nickName);
    void sendVerificationCodeEmail(String email);
    boolean compareVerificationCodeEmail(EmailCompareReqDto emailCompareReqDto);
    boolean findPwdUser(UserFindPwdReqDto userFindPwdReqDto);
    void registBadge(BadgeRegistReqDto dto, MultipartFile file) throws IOException;
    BadgeStatusDto searchBadgeStatus(String type);
	boolean searchCardIsRegist();
    List<String> getRoleListUser();
}
