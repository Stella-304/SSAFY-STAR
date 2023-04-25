package com.ssafy.star.api.controller;

import javax.websocket.server.PathParam;

import org.springframework.data.jpa.repository.Query;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.star.api.service.CardService;
import com.ssafy.star.api.service.UserService;
import com.ssafy.star.common.db.dto.response.ConstellationListDto;
import com.ssafy.star.common.db.entity.User;
import com.ssafy.star.common.provider.AuthProvider;
import com.ssafy.star.common.util.constant.Msg;
import com.ssafy.star.common.util.dto.ResponseDto;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;

@RestController
@Api(tags = {"카드 API"})
@RequiredArgsConstructor
@RequestMapping(value = "/card")
public class CardController {
	private final AuthProvider authProvider;
	private final CardService cardService;

	@PostMapping("/boj")
	@Secured({"ROLE_CLIENT"})
	@ApiOperation(value = "BOJ 티어 업데이트")
	public ResponseEntity<?> bojTierUpdate() {
		long id = authProvider.getUserIdFromPrincipal();
		cardService.updateBojTier(id);

		return ResponseEntity.ok()
			.body(ResponseDto.of(HttpStatus.OK, Msg.SUCCESS_UPDATE));
	}

	@GetMapping("/company")
	@ApiOperation(value = "기업명 입력하면, 관련된 기업명 보여주기")
	public ResponseEntity<?> companySearch(@RequestParam("query") String query) {
		System.out.println("hihi " + query);
		return ResponseEntity.ok()
			.body(ResponseDto.of(HttpStatus.OK, Msg.SUCCESS_GET, cardService.searchCompany(query)));
	}

	@GetMapping("/list")
	public ResponseEntity<ResponseDto> getCardList() {
		return ResponseEntity.ok()
			.body(ResponseDto.of(HttpStatus.OK, Msg.SUCCESS_GET, cardService.getCardList()));
	}
}
