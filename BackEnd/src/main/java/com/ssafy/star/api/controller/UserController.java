package com.ssafy.star.api.controller;

import com.ssafy.star.api.service.UserService;
import com.ssafy.star.common.db.dto.request.*;
import com.ssafy.star.common.util.constant.Msg;
import com.ssafy.star.common.util.dto.ResponseDto;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.security.PermitAll;
import javax.annotation.security.RolesAllowed;

import java.io.IOException;
import java.util.Optional;

@Log4j2
@RestController
@Api(tags = {"유저 API"})
@RequiredArgsConstructor
@RequestMapping(value = "/user")
 @RolesAllowed("ROLE_CLIENT")
public class UserController {
	private final UserService userService;

	@PostMapping("/regist")
	@PermitAll
	@ApiOperation(value = "회원가입")
	public ResponseEntity<ResponseDto> userRegist(@RequestBody UserRegistReqDto userRegistReqDto) {

		userService.registUser(userRegistReqDto);
		return ResponseEntity.ok().body(ResponseDto.of(HttpStatus.OK, Msg.SUCCESS_REGIST));
	}

	@PostMapping("/login")
	@PermitAll
	@ApiOperation(value = "로그인")
	public ResponseEntity<ResponseDto> userLogin(@RequestBody UserLoginReqDto userLoginReqDto) {

		Optional<String> tokenOptional = Optional.ofNullable(userService.loginUser(userLoginReqDto));

		return tokenOptional.map(
				token -> ResponseEntity.ok().body(ResponseDto.of(HttpStatus.OK, Msg.SUCCESS_LOGIN, token)))
			.orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND)
				.body(ResponseDto.of(HttpStatus.NOT_FOUND, Msg.FAULURE_LOGIN)));
	}

	@PostMapping("/logout")
	@ApiOperation(value = "로그아웃")
	public ResponseEntity<ResponseDto> userLogout(@RequestHeader("Authorization") String token) {
		userService.logoutUser(token);
		return ResponseEntity.ok().body(ResponseDto.of(HttpStatus.OK, Msg.SUCCESS_LOGOUT));
	}

	@GetMapping("/detail")
	@ApiOperation(value = "유저 정보 조회")
	public ResponseEntity<ResponseDto> userGetDetail() {
		return ResponseEntity.ok().body(ResponseDto.of(HttpStatus.OK, Msg.SUCCESS_GET, userService.getDetailUser()));
	}

	@PutMapping
	@ApiOperation(value = "유저정보 수정")
	public ResponseEntity<ResponseDto> userModify(@RequestBody UserModifyReqDto userModifyReqDto) {
		userService.modifyUser(userModifyReqDto);
		return ResponseEntity.ok().body(ResponseDto.of(HttpStatus.OK, Msg.SUCCESS_UPDATE));
	}

	@PutMapping("/pwd")
	@ApiOperation(value = "비밀번호 수정")
	public ResponseEntity<ResponseDto> userModifyPwd(@RequestParam String newPwd) {
		userService.modifyPwdUser(newPwd);
		return ResponseEntity.ok().body(ResponseDto.of(HttpStatus.OK, Msg.SUCCESS_UPDATE));
	}

	@PutMapping("/name")
	@ApiOperation(value = "이름 수정")
	public ResponseEntity<ResponseDto> userModifyName(@RequestParam String name) {
		userService.modifyNameUser(name);
		return ResponseEntity.ok().body(ResponseDto.of(HttpStatus.OK, Msg.SUCCESS_UPDATE));
	}

	@DeleteMapping
	@ApiOperation(value = "탈퇴")
	public ResponseEntity<ResponseDto> userDelete() {
		userService.deleteUser();
		return ResponseEntity.ok().body(ResponseDto.of(HttpStatus.OK, Msg.SUCCESS_DELETE));
	}

	@GetMapping("/email/check-duplicate")
	@PermitAll
	@ApiOperation(value = "이메일 중복 여부 확인")
	public ResponseEntity<ResponseDto> checkDuplicateEmail(@RequestParam String email) {
		if (userService.duplicateEmailCheck(email)) {
			return ResponseEntity.status(HttpStatus.CONFLICT)
				.body(ResponseDto.of(HttpStatus.CONFLICT, Msg.DUPLICATED_EMAIL));
		}
		return ResponseEntity.ok().body(ResponseDto.of(HttpStatus.OK, Msg.VALID_EMAIL));
	}

	@GetMapping("/nickname/check-duplicate")
	@PermitAll
	@ApiOperation(value = "닉네임 중복 여부 확인")
	public ResponseEntity<ResponseDto> checkDuplicateNickname(@RequestParam String nickname) {
		if (userService.duplicateNickNameCheck(nickname)) {
			return ResponseEntity.status(HttpStatus.CONFLICT)
					.body(ResponseDto.of(HttpStatus.CONFLICT, Msg.DUPLICATED_NICKNAME));
		}
		return ResponseEntity.ok().body(ResponseDto.of(HttpStatus.OK, Msg.VALID_NICKNAME));
	}

	@PostMapping("/email/send-verification")
	@PermitAll
	@ApiOperation(value = "인증메일 전송")
	public ResponseEntity<ResponseDto> emailSendVerificationCode(@RequestParam String email) {
		userService.sendVerificationCodeEmail(email);
		return ResponseEntity.ok().body(ResponseDto.of(HttpStatus.OK, Msg.SUCCESS_SEND_EMAIL));
	}

	@PostMapping("/email/compare-verification")
	@PermitAll
	@ApiOperation(value = "인증코드 비교")
	public ResponseEntity<ResponseDto> emailCompareVerificationCode(
		@RequestBody EmailCompareReqDto emailCompareReqDto) {
		if (userService.compareVerificationCodeEmail(emailCompareReqDto)) {
			return ResponseEntity.ok().body(ResponseDto.of(HttpStatus.OK, Msg.SUCCESS_EMAIL_AUTH));
		}
		return ResponseEntity.status(HttpStatus.NOT_FOUND)
			.body(ResponseDto.of(HttpStatus.NOT_FOUND, Msg.DIFFERENT_AUTH_CODE));
	}

	@PostMapping("/email/find-pwd")
	@PermitAll
	@ApiOperation(value = "아이디와 이메일 체크 후 비밀번호 이메일 전송")
	public ResponseEntity<ResponseDto> userFindPwd(@RequestBody UserFindPwdReqDto userFindPwdReqDto) {

		if (userService.findPwdUser(userFindPwdReqDto)) {
			return ResponseEntity.ok().body(ResponseDto.of(HttpStatus.OK, Msg.SUCCESS_SEND_EMAIL));
		}
		return ResponseEntity.status(HttpStatus.NOT_FOUND)
			.body(ResponseDto.of(HttpStatus.NOT_FOUND, Msg.EMAIL_NOT_FOUND));

	}

	@PostMapping("/badge")
	@ApiOperation(value = "뱃지 인증 요청")
	public ResponseEntity<ResponseDto> badgeRegist(
		@RequestPart BadgeRegistReqDto dto,
		@RequestPart MultipartFile file) throws IOException {
		userService.registBadge(dto, file);
		return ResponseEntity.ok().body(ResponseDto.of(HttpStatus.OK, Msg.SUCCESS_REGIST));
	}

	@GetMapping("/badge/status/{type}")
	@ApiOperation(value = "뱃지 인증 진행상태 확인")
	public ResponseEntity<ResponseDto> badgeStatusSearch(@PathVariable("type") String type) {
		return ResponseEntity.ok()
			.body(ResponseDto.of(HttpStatus.OK, Msg.SUCCESS_REGIST, userService.searchBadgeStatus(type)));
	}

	@GetMapping("/card/is-regist")
	@ApiOperation(value = "카드 등록했는지 유무 확인")
	public ResponseEntity<ResponseDto> cardIsRegistSearch() {
		return ResponseEntity.ok()
			.body(ResponseDto.of(HttpStatus.OK, Msg.SUCCESS_REGIST, userService.searchCardIsRegist()));
	}

	@GetMapping("/role")
	@ApiOperation(value = "권한 정보 조회")
	public ResponseEntity<ResponseDto> userFindRoleList() {
		return ResponseEntity.ok().body(ResponseDto.of(HttpStatus.OK, Msg.SUCCESS_GET, userService.getRoleListUser()));
	}

}
