package com.ssafy.star.api.service;

import java.io.IOException;

import org.springframework.web.multipart.MultipartFile;

import com.ssafy.star.common.db.dto.request.BadgeRegistReqDto;

public interface UserService {

    void registUser();

	void registBadge(BadgeRegistReqDto dto, MultipartFile file) throws IOException;
}
