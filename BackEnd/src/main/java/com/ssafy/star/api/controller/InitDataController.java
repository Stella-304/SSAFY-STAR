package com.ssafy.star.api.controller;

import javax.annotation.security.RolesAllowed;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
@RolesAllowed("ROLE_ADMIN")
public class InitDataController {

	private final InitDataService initDataService;

	@GetMapping("/company")
	@ApiOperation(value = "company data init")
	public ResponseEntity<ResponseDto> company() {
		initDataService.initCompany();
		return ResponseEntity.ok()
			.body(ResponseDto.of(HttpStatus.OK, Msg.SUCCESS_REGIST));
	}
	@GetMapping("/company-additional")
	@ApiOperation(value = "company data init")
	public ResponseEntity<ResponseDto> companyAdditional() {
		initDataService.initCompanyAdditional();
		return ResponseEntity.ok()
				.body(ResponseDto.of(HttpStatus.OK, Msg.SUCCESS_REGIST));
	}
	@GetMapping("/user")
	@ApiOperation(value = "user data init")
	public ResponseEntity<ResponseDto> user() throws Exception {
		initDataService.initUser();
		return ResponseEntity.ok()
			.body(ResponseDto.of(HttpStatus.OK, Msg.SUCCESS_REGIST));
	}

	@GetMapping("/coordinate")
	@ApiOperation(value = "coordinate data init")
	public ResponseEntity<ResponseDto> coordinate() {
		initDataService.initCoordinate();
		return ResponseEntity.ok().body(ResponseDto.of(HttpStatus.OK, Msg.SUCCESS_REGIST));
	}

	@GetMapping("/polygon")
	@ApiOperation(value = "polygon data init")
	public ResponseEntity<ResponseDto> polygon() {
		initDataService.initPolygon();
		return ResponseEntity.ok().body(ResponseDto.of(HttpStatus.OK, Msg.SUCCESS_REGIST));
	}

	@GetMapping("/all")
	@ApiOperation(value = "all data init")
	public ResponseEntity<ResponseDto> all() {
		initDataService.initAll();
		return ResponseEntity.ok().body(ResponseDto.of(HttpStatus.OK, Msg.SUCCESS_REGIST));
	}

	@GetMapping("/add-company/{companyName}")
	@ApiOperation(value = "all ")
	public ResponseEntity<ResponseDto> addCompany(@PathVariable("companyName")String companyName) {
		initDataService.addCompany(companyName);
		return ResponseEntity.ok().body(ResponseDto.of(HttpStatus.OK, Msg.SUCCESS_REGIST));
	}
}
