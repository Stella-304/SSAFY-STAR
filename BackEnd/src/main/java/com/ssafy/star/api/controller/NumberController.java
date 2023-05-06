package com.ssafy.star.api.controller;

import javax.annotation.security.RolesAllowed;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.star.api.service.AdminService;
import com.ssafy.star.api.service.NumberService;
import com.ssafy.star.common.util.constant.Msg;
import com.ssafy.star.common.util.dto.ResponseDto;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;

@RestController
@Api(tags = {"'숫자로 보는 SSAFY' 관련 API"})
@RequiredArgsConstructor
@RequestMapping(value = "/number")
public class NumberController {
	private final NumberService numberService;

	@GetMapping("/landing")
	@ApiOperation(value = "랜딩 페이지에서 보여줄 정보")
	public ResponseEntity<ResponseDto> landingNumberGet() {
		return ResponseEntity.ok()
			.body(ResponseDto.of(HttpStatus.OK, Msg.SUCCESS_GET, numberService.getLandingNumber()));
	}

	@GetMapping("/main")
	@ApiOperation(value = "메인 페이지에서 보여줄 정보")
	public ResponseEntity<ResponseDto> mainNumberGet() {
		return ResponseEntity.ok()
				.body(ResponseDto.of(HttpStatus.OK, Msg.SUCCESS_GET, numberService.getMainNumber()));
	}

}
