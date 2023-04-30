package com.ssafy.star.common.provider;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface S3Provider {
	String upload(MultipartFile file,String baseUrl) throws IOException;
	void deleteFile(String imageSrc);
}
