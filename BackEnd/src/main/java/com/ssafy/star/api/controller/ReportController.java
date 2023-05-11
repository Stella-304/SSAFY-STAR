package com.ssafy.star.api.controller;

import com.ssafy.star.api.service.ReportService;
import com.ssafy.star.common.db.dto.request.ReportReqDto;
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
@Api(tags = {"신고 API"})
@RequiredArgsConstructor
@RequestMapping(value = "/report")
@RolesAllowed("ROLE_CLIENT")
public class ReportController {

    private final ReportService reportService;

    @GetMapping
    @ApiOperation(value = "신고 항목 조회")
    public ResponseEntity<ResponseDto> reportGetArticle() {
        return ResponseEntity.ok().body(ResponseDto.of(HttpStatus.OK, Msg.SUCCESS_GET, reportService.articleReport()));
    }

    @PostMapping
    @ApiOperation(value = "신고하기")
    public ResponseEntity<ResponseDto> reportSend(@RequestBody ReportReqDto reportReqDto) {
        reportService.sendReport(reportReqDto);
        return ResponseEntity.ok().body(ResponseDto.of(HttpStatus.OK, Msg.SUCCESS_GET));
    }
}
