package com.ssafy.star.api.controller;

import java.io.IOException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.ssafy.star.api.service.UserService;
import com.ssafy.star.common.db.dto.request.BadgeRegistReqDto;
import com.ssafy.star.common.util.constant.Msg;
import com.ssafy.star.common.util.dto.ResponseDto;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Log4j2
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
	// @Secured("CLIENT")
	@ApiOperation(value = "뱃지 인증 요청")
	public ResponseEntity<ResponseDto> badgeRegist(
		@RequestPart BadgeRegistReqDto dto,
		@RequestPart MultipartFile file) throws IOException {
		log.info(dto);
		log.info(file.getOriginalFilename());
		userService.registBadge(dto, file);
		return ResponseEntity.ok().body(ResponseDto.of(HttpStatus.OK, Msg.SUCCESS_REGIST));
	}

	@GetMapping("/badge/status/{type}")
	@ApiOperation(value = "뱃지 인증 진행상태 확인")
	public ResponseEntity<ResponseDto> badgeStatusSearch(@PathVariable("type") String type){
		return ResponseEntity.ok().body(ResponseDto.of(HttpStatus.OK, Msg.SUCCESS_REGIST,userService.searchBadgeStatus(type)));
	}
}
