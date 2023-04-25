package com.ssafy.star.api.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

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
}