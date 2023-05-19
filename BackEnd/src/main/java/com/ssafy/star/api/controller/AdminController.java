package com.ssafy.star.api.controller;

import com.ssafy.star.api.service.AdminService;
import com.ssafy.star.common.util.constant.Msg;
import com.ssafy.star.common.util.dto.ResponseDto;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.annotation.security.RolesAllowed;

@RestController
@Api(tags = {"관리자 API"})
@RequiredArgsConstructor
@RequestMapping(value = "/admin")
@RolesAllowed("ROLE_ADMIN")
public class AdminController {
	private final AdminService adminService;

	@GetMapping("/badge/list/all")
	@ApiOperation(value = "뱃지 요청했던 전체 리스트 보여주기")
	public ResponseEntity<ResponseDto> allBadgeListGet() {
		return ResponseEntity.ok()
			.body(ResponseDto.of(HttpStatus.OK, Msg.SUCCESS_GET, adminService.getBadgeList("ALL")));
	}

	@GetMapping("/badge/list/yet")
	@ApiOperation(value = "뱃지 수락해줘야할 리스트 보여주기")
	public ResponseEntity<ResponseDto> yetBadgeListGet() {
		return ResponseEntity.ok()
			.body(ResponseDto.of(HttpStatus.OK, Msg.SUCCESS_GET, adminService.getBadgeList("YET")));
	}

	@PostMapping("/badge/{auth_id}/{type}")
	@ApiOperation(value = "뱃지 달아줄지 말지 정하기 '/badge/ok' 만 뱃지 달아줄거임~")
	public ResponseEntity<ResponseDto> badgeRegist(@PathVariable("auth_id") long auth_id, @PathVariable("type") String type) {
		adminService.registBadge(auth_id, type);
		return ResponseEntity.ok()
			.body(ResponseDto.of(HttpStatus.OK, Msg.SUCCESS_REGIST));
	}

	@GetMapping("/report/all")
	@ApiOperation("신고 목록 조회")
	public ResponseEntity<ResponseDto> allReportListGet() {
		return ResponseEntity.ok().body(ResponseDto.of(HttpStatus.OK, Msg.SUCCESS_REGIST, adminService.getReportList()));
	}
}
