package com.ssafy.star.common.provider;

import java.io.File;
import java.io.IOException;

import com.ssafy.star.common.exception.CommonApiException;
import org.springframework.web.multipart.MultipartFile;

public interface S3Provider {
	String upload(MultipartFile file,String baseUrl) throws IOException;
	void deleteFile(String imageSrc);
}
