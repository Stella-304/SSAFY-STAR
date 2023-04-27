package com.ssafy.star.api.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.star.api.service.UserService;
import com.ssafy.star.common.db.dto.request.BadgeRegistReqDto;
import com.ssafy.star.common.util.constant.Msg;
import com.ssafy.star.common.util.dto.ResponseDto;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;

@RestController
@Api(tags = {"유저 API"})
@RequiredArgsConstructor
@RequestMapping(value = "/user")
public class UserController {
	private final UserService userService;

	@Secured({"ROLE_CLIENT"})
	@PostMapping
	@ApiOperation(value = "회원가입")
	public ResponseEntity<ResponseDto> userRegist() {
		userService.registUser();
		return ResponseEntity.ok().body(ResponseDto.of(HttpStatus.OK, Msg.SUCCESS_REGIST));
	}

	@PostMapping("/badge")
	@ApiOperation(value = "뱃지 인증 요청")
	public ResponseEntity<ResponseDto> badgeRegist(@RequestBody BadgeRegistReqDto dto) {
		System.out.println(dto);
		return ResponseEntity.ok().body(ResponseDto.of(HttpStatus.OK, Msg.SUCCESS_REGIST));
	}
}
