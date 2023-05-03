package com.ssafy.star.api.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.ssafy.star.api.service.InitDataService;
import com.ssafy.star.common.util.constant.Msg;
import com.ssafy.star.common.util.dto.ResponseDto;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;

@Controller
@Api(tags = {"데이터 초기화 API"})
@RequiredArgsConstructor
@RequestMapping(value = "/init-data")
public class InitDataController {

	final InitDataService initDataService;

	@GetMapping("/company")
	@ApiOperation(value = "company data init")
	public ResponseEntity<?> company() {
		initDataService.initCompany();
		return ResponseEntity.ok()
			.body(ResponseDto.of(HttpStatus.OK, Msg.SUCCESS_REGIST));
	}

	@GetMapping("/user")
	@ApiOperation(value = "user data init")
	public ResponseEntity<?> user() throws Exception {
		initDataService.initUser();
		return ResponseEntity.ok()
			.body(ResponseDto.of(HttpStatus.OK, Msg.SUCCESS_REGIST));
	}

	@GetMapping("/coordinate")
	@ApiOperation(value = "coordinate data init")
	public ResponseEntity<?> coordinate() {
		initDataService.initCoordinate();
		return ResponseEntity.ok().body(ResponseDto.of(HttpStatus.OK, Msg.SUCCESS_REGIST));
	}

	@GetMapping("/polygon")
	@ApiOperation(value = "coordinate data init")
	public ResponseEntity<?> polygon() throws Exception {
		initDataService.initPolygon();
		return ResponseEntity.ok().body(ResponseDto.of(HttpStatus.OK, Msg.SUCCESS_REGIST));
	}

	@GetMapping("/all")
	@ApiOperation(value = "coordinate data init")
	public ResponseEntity<?> all() throws Exception {
		initDataService.initAll();
		return ResponseEntity.ok().body(ResponseDto.of(HttpStatus.OK, Msg.SUCCESS_REGIST));
	}
}
