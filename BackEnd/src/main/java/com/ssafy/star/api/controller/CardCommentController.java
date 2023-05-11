package com.ssafy.star.api.controller;

import com.ssafy.star.api.service.CardCommentService;
import com.ssafy.star.common.db.dto.request.*;
import com.ssafy.star.common.util.constant.Msg;
import com.ssafy.star.common.util.dto.ResponseDto;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import javax.annotation.security.PermitAll;
import javax.annotation.security.RolesAllowed;

@RestController
@Api(tags = {"카드코멘트 API"})
@RequiredArgsConstructor
@RequestMapping(value = "/comment")
 @RolesAllowed("ROLE_CLIENT")
public class CardCommentController {
	private final CardCommentService cardCommentService;


	@GetMapping
	@PermitAll
	@ApiOperation(value = "카드 코멘트 목록 가져오기")
	public ResponseEntity<ResponseDto> cardCommentListGet(@RequestParam Long cardId) {
		return ResponseEntity.ok()
			.body(ResponseDto.of(HttpStatus.OK, Msg.SUCCESS_GET, cardCommentService.getCardCommentList(cardId)));
	}

	@PostMapping
	@ApiOperation(value = "코멘트 등록하기")
	public ResponseEntity<ResponseDto> cardCommentRegist(@RequestBody CardCommentRegistReqDto cardCommentRegistReqDto) {
		cardCommentService.registCardComment(cardCommentRegistReqDto);
		return ResponseEntity.ok()
			.body(ResponseDto.of(HttpStatus.OK, Msg.SUCCESS_REGIST));
	}

	@PutMapping
	@ApiOperation(value = "코멘트 수정하기")
	public ResponseEntity<ResponseDto> cardCommentUpdate(@RequestBody CardCommentUpdateReqDto cardCommentUpdateReqDto) throws Exception {
		cardCommentService.updateCardComment(cardCommentUpdateReqDto);
		return ResponseEntity.ok()
			.body(ResponseDto.of(HttpStatus.OK, Msg.SUCCESS_UPDATE));
	}

	@DeleteMapping
	@ApiOperation(value = "코멘트 지우기")
	public ResponseEntity<ResponseDto> cardCommentDelete(@RequestParam Long cardCommentId) {
		cardCommentService.deleteCardComment(cardCommentId);
		return ResponseEntity.ok()
			.body(ResponseDto.of(HttpStatus.OK, Msg.SUCCESS_DELETE));
	}
	@PostMapping("/reply")
	@ApiOperation(value = "답글 등록하기")
	public ResponseEntity<ResponseDto> commentReplyRegist(@RequestBody CommentReplyRegistReqDto commentReplyRegistReqDto) {
		cardCommentService.registCommentReply(commentReplyRegistReqDto);
		return ResponseEntity.ok()
				.body(ResponseDto.of(HttpStatus.OK, Msg.SUCCESS_REGIST));
	}

	@PutMapping("/reply")
	@ApiOperation(value = "답글 수정하기")
	public ResponseEntity<ResponseDto> commentReplyUpdate(@RequestBody CommentReplyUpdateReqDto commentReplyUpdateReqDto) throws Exception {
		cardCommentService.updateCommentReply(commentReplyUpdateReqDto);
		return ResponseEntity.ok()
				.body(ResponseDto.of(HttpStatus.OK, Msg.SUCCESS_UPDATE));
	}

	@DeleteMapping("/reply")
	@ApiOperation(value = "답글 지우기")
	public ResponseEntity<ResponseDto> commentReplyDelete(@RequestParam Long cardCommentId) {
		cardCommentService.deleteCommentReply(cardCommentId);
		return ResponseEntity.ok()
				.body(ResponseDto.of(HttpStatus.OK, Msg.SUCCESS_DELETE));
	}
}
