package com.ssafy.star.api.controller;

import com.ssafy.star.api.service.CardService;
import com.ssafy.star.common.db.dto.request.CardRegistReqDto;
import com.ssafy.star.common.db.dto.request.CardUpdateReqDto;
import com.ssafy.star.common.db.dto.request.SearchConditionReqDto;
import com.ssafy.star.common.util.constant.Msg;
import com.ssafy.star.common.util.dto.ResponseDto;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.annotation.security.PermitAll;
import javax.annotation.security.RolesAllowed;

@RestController
@Api(tags = {"카드 API"})
@RequiredArgsConstructor
@RequestMapping(value = "/card")
@RolesAllowed("ROLE_CLIENT")
public class CardController {
	private final CardService cardService;

	@PostMapping("/boj")
	@ApiOperation(value = "BOJ 티어 업데이트")
	public ResponseEntity<ResponseDto> bojTierUpdate() {
		return ResponseEntity.ok()
			.body(ResponseDto.of(HttpStatus.OK, Msg.SUCCESS_UPDATE, cardService.updateBojTier()));
	}

	@GetMapping("/boj/{bojId}")
	@ApiOperation(value = "BOJ 티어 가져오기")
	public ResponseEntity<ResponseDto> bojTierGet(@PathVariable("bojId") String bojId) {
		return ResponseEntity.ok()
			.body(ResponseDto.of(HttpStatus.OK, Msg.SUCCESS_GET, cardService.getBojTier(bojId)));
	}

	@GetMapping("/mycard")
	@ApiOperation(value = "로그인한 유저의 카드 정보 가져오기")
	public ResponseEntity<ResponseDto> myCardGet() {
		return ResponseEntity.ok()
			.body(ResponseDto.of(HttpStatus.OK, Msg.SUCCESS_GET, cardService.getMyCard()));
	}

	@GetMapping("/company")
	@PermitAll
	@ApiOperation(value = "기업명 입력하면, 관련된 기업명 보여주기")
	public ResponseEntity<ResponseDto> companySearch(@RequestParam("query") String query) {
		return ResponseEntity.ok()
			.body(ResponseDto.of(HttpStatus.OK, Msg.SUCCESS_GET, cardService.searchCompany(query)));
	}

	// //Post로 바꾸던가... requestbody 대신에 modelattribute를 이용하던가 해야되나? 어떻게 해결하지.
	// @GetMapping("/list")
	//	@PermitAll
	// @ApiOperation(value = "카드 목록 가져오기, 검색조건 넣으면 검색조건에 맞는 카드들만 가져오기")
	// public ResponseEntity<ResponseDto> cardListGet(
	// 	@RequestBody(required = false) SearchConditionReqDto searchConditionReqDto) {
	// 	return ResponseEntity.ok()
	// 		.body(ResponseDto.of(HttpStatus.OK, Msg.SUCCESS_GET, cardService.getCardList(searchConditionReqDto)));
	// }

	// @GetMapping("/list-v1")
	// @PermitAll
	// @ApiOperation(value = "카드 목록 가져오기, 검색조건 넣으면 검색조건에 맞는 카드들만 가져오기")
	// public ResponseEntity<ResponseDto> cardListGetV1(
	// 	@RequestParam(value = "searchColumn", required = false) String searchColumn,
	// 	@RequestParam(value = "searchValue", required = false) String searchValue,
	// 	@RequestParam(value = "searchValue2", required = false) String searchValue2,
	// 	@RequestParam(value = "searchValue3", required = false) String searchValue3) {
	// 	return ResponseEntity.ok()
	// 		.body(ResponseDto.of(HttpStatus.OK, Msg.SUCCESS_GET,
	// 			cardService.getCardListV1(searchColumn, searchValue, searchValue2, searchValue3)));
	// }

	@GetMapping("/list")
	@PermitAll
	@ApiOperation(value = "카드 전체 목록 가져오기 NO FILTER!!!")
	@Transactional
	public ResponseEntity<ResponseDto> cardListGet() {
		return ResponseEntity.ok()
				.body(ResponseDto.of(HttpStatus.OK, Msg.SUCCESS_GET, cardService.getCardList()));
	}

	@PostMapping("/list-v2")
	@PermitAll
	@ApiOperation(value = "카드 목록 가져오기, 검색조건 넣으면 검색조건에 맞는 카드들만 가져오기")
	@Transactional
	public ResponseEntity<ResponseDto> cardListGetV2(
		@RequestBody(required = false) SearchConditionReqDto searchConditionReqDto) {
		return ResponseEntity.ok()
			.body(ResponseDto.of(HttpStatus.OK, Msg.SUCCESS_GET, cardService.getCardListV2(searchConditionReqDto)));
	}

	@PostMapping
	@ApiOperation(value = "카드 등록하기")
	public ResponseEntity<ResponseDto> cardRegist(@RequestBody CardRegistReqDto cardRegistReqDto) {
		cardService.registCard(cardRegistReqDto);
		return ResponseEntity.ok()
			.body(ResponseDto.of(HttpStatus.OK, Msg.SUCCESS_REGIST));
	}

	@PutMapping
	@ApiOperation(value = "카드 수정하기")
	public ResponseEntity<ResponseDto> cardUpdate(@RequestBody CardUpdateReqDto cardUpdateReqDto) throws Exception {
		cardService.updateCard(cardUpdateReqDto);
		return ResponseEntity.ok()
			.body(ResponseDto.of(HttpStatus.OK, Msg.SUCCESS_UPDATE));
	}

}
