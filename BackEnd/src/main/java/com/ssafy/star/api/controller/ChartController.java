package com.ssafy.star.api.controller;

import com.ssafy.star.api.service.ChartService;
import com.ssafy.star.common.db.dto.response.ChartDto;
import com.ssafy.star.common.util.constant.Msg;
import com.ssafy.star.common.util.dto.ResponseDto;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Api(tags = {"차트 API"})
@RequiredArgsConstructor
@RequestMapping(value = "/chart")
//@RolesAllowed("ROLE_USER")
public class ChartController {

    private final ChartService chartService;

    @GetMapping
    @ApiOperation(value = "차트 정보 조회")
    public ResponseEntity<ResponseDto> getChart(@RequestParam String sort) {

        ChartDto chartDto = chartService.chartGet(sort);

        return chartDto == null ?
                ResponseEntity.status(HttpStatus.NOT_FOUND).body(ResponseDto.of(HttpStatus.NOT_FOUND, Msg.FAULURE_GET))
                : ResponseEntity.ok().body(ResponseDto.of(HttpStatus.OK, Msg.SUCCESS_GET, chartDto));
    }

    @GetMapping("/saying")
    @ApiOperation(value = "명언 조회")
    public ResponseEntity<ResponseDto> getSaying() {
        return ResponseEntity.ok().body(ResponseDto.of(HttpStatus.OK, Msg.SUCCESS_GET, chartService.sayingGet()));
    }

    @GetMapping("/cs")
    @ApiOperation(value = "cs 조회")
    public ResponseEntity<ResponseDto> getCs() {
        return ResponseEntity.ok().body(ResponseDto.of(HttpStatus.OK, Msg.SUCCESS_GET, chartService.csGet()));
    }
}
