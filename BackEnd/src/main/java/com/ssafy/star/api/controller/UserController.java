package com.ssafy.star.api.controller;

import java.io.IOException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.ssafy.star.api.service.UserService;
import com.ssafy.star.common.db.dto.request.BadgeRegistReqDto;
import com.ssafy.star.common.util.constant.Msg;
import com.ssafy.star.common.util.dto.ResponseDto;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j;

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
	@Secured({"ROLE_CLIENT"})
	@ApiOperation(value = "뱃지 인증 요청")
	public ResponseEntity<ResponseDto> badgeRegist(
		@RequestPart BadgeRegistReqDto dto,
		@RequestPart MultipartFile file) throws IOException {
		System.out.println(dto);
		System.out.println(file.getOriginalFilename());
		userService.registBadge(dto, file);
		return ResponseEntity.ok().body(ResponseDto.of(HttpStatus.OK, Msg.SUCCESS_REGIST));
	}
}
