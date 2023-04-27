package com.ssafy.star.api.controller;

import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;

@RestController
@Api(tags = {"관리자 API"})
@RequiredArgsConstructor
@RequestMapping(value = "/admin")
@Secured("{ROLE_ADMIN}")
public class AdminController {

}
