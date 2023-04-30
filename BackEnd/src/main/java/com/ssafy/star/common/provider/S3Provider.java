package com.ssafy.star.common.provider;

import java.io.File;

import org.springframework.web.multipart.MultipartFile;

public interface S3Provider {
	String uploadMultipartFile(MultipartFile file, String uri);

	String uploadFile(File file, String uri);

	void delete(String uri);

}
