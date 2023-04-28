package com.ssafy.star.api.controller;


import com.ssafy.star.api.service.UserService;
import com.ssafy.star.common.db.dto.request.UserLoginDto;
import com.ssafy.star.common.db.dto.request.UserRegistDto;
import com.ssafy.star.common.util.constant.Msg;
import com.ssafy.star.common.util.dto.ResponseDto;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@Api(tags = {"유저 API"})
@RequiredArgsConstructor
@RequestMapping(value = "/user")
public class UserController {
    private final UserService userService;

    @PostMapping("/regist")
    @ApiOperation(value="회원가입")
    public ResponseEntity<ResponseDto> userRegist(@RequestBody UserRegistDto userRegistDto) {
        if(userService.registUser(userRegistDto)) {
            return ResponseEntity.ok().body(ResponseDto.of(HttpStatus.OK, Msg.SUCCESS_REGIST));
        }
        return ResponseEntity.status(HttpStatus.CONFLICT).body(ResponseDto.of(HttpStatus.OK, Msg.DUPLICATED_ID));
    }

    @PostMapping
    @ApiOperation(value="로그인")
    public ResponseEntity<ResponseDto> userLogin(@RequestBody UserLoginDto userLoginDto) {

        Optional<String> tokenOptional = Optional.ofNullable(userService.loginUser(userLoginDto));

        return tokenOptional.map(token -> ResponseEntity.ok().body(ResponseDto.of(HttpStatus.OK, Msg.SUCCESS_LOGIN, token)))
                .orElseGet(() -> ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(ResponseDto.of(HttpStatus.UNAUTHORIZED, Msg.FAULURE_LOGIN)));
    }

    @GetMapping("/check-email-duplicate")
    @ApiOperation(value="이메일 중복 여부 확인")
    public ResponseEntity<ResponseDto> checkDuplicateEmail(@RequestParam String email) {

        if (userService.duplicateEmailCheck(email)) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(ResponseDto.of(HttpStatus.CONFLICT, Msg.DUPLICATED_EMAIL));
        }
        return ResponseEntity.ok().body(ResponseDto.of(HttpStatus.OK, Msg.VALID_EMAIL));
    }

    @PostMapping("/send-verification-email")
    @ApiOperation(value="인증메일 전송")
    public ResponseEntity<ResponseDto> sendEmailVerificationCode(@RequestBody String email) {
        userService.emailVerificationCodeSend(email);
        return ResponseEntity.ok().body(ResponseDto.of(HttpStatus.OK, Msg.SUCCESS_SEND_MAIL));
    }

    @PostMapping("/")
    @ApiOperation(value="이메일 인증")
    public ResponseEntity<ResponseDto> authEmail() {
        userService.
    }
}
