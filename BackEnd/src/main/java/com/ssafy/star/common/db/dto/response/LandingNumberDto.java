package com.ssafy.star.common.db.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class LandingNumberDto {
	@Schema(description = "1기 ~ 9기 전체 SSAFY 인원수")
	int allSsafyCount;
	@Schema(description = "사이트 이용하는 사람들 중 SSAFY 인증받은 회원 수")
	int useSiteSsafyCount;
	@Schema(description = "사이트 이용하는 모든 회원 수")
	int useSiteAllCount;
}
