package com.ssafy.star.api.service;

import java.io.IOException;

import com.ssafy.star.common.db.dto.request.BadgeRegistReqDto;
import com.ssafy.star.common.db.entity.AuthStatus;
import com.ssafy.star.common.db.entity.User;
import com.ssafy.star.common.db.repository.AuthStatusRepository;
import com.ssafy.star.common.db.repository.UserRepository;
import com.ssafy.star.common.provider.AuthProvider;
import com.ssafy.star.common.util.S3Service;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

	final UserRepository userRepository;
	final S3Service s3Service;
	final AuthStatusRepository authStatusRepository;
	final AuthProvider authProvider;

	@Override
	public void registUser() {

	}

	@Override
	@Transactional(rollbackFor = Exception.class)
	public void registBadge(BadgeRegistReqDto dto, MultipartFile file) throws IOException {
		String imageUrl = s3Service.upload(file, "ssafy-star");
		long userId = authProvider.getUserIdFromPrincipal();
		System.out.println("!@#!#@"+userId);
		authStatusRepository.save(AuthStatus.builder()
			.user(User.builder().id(userId).build())
			.badgeType(dto.getBadgeType())
			.processStatus(false)
			.imageUrl(imageUrl)
			.build());
	}
}
