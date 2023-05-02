package com.ssafy.star.common.provider;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.PutObjectRequest;

import java.io.IOException;
import java.util.UUID;

import javax.annotation.PostConstruct;

import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@NoArgsConstructor
@Slf4j
public class S3ProviderImpl implements S3Provider {

	private AmazonS3 s3Client;

	@Value("${cloud.aws.credentials.accessKey}")
	private String accessKey;

	@Value("${cloud.aws.credentials.secretKey}")
	private String secretKey;

	@Value("${cloud.aws.s3.bucket}")
	private String bucket;

	@Value("${cloud.aws.region.static}")
	private String region;

	@PostConstruct
	public void setS3Client() {
		AWSCredentials credentials = new BasicAWSCredentials(this.accessKey, this.secretKey);

		s3Client = AmazonS3ClientBuilder.standard()
			.withCredentials(new AWSStaticCredentialsProvider(credentials))
			.withRegion(this.region)
			.build();
	}

	public String upload(MultipartFile file, String baseDir, long userId) throws IOException {
		if (file != null && !file.isEmpty()) {
			String fileName =
				UUID.randomUUID().toString() + String.valueOf(userId) + "." + file.getContentType().split("/")[1];
			String saveName = baseDir + "/" + fileName
				.replaceAll("[~!@#$%^&*()_+ ]", "_");
			s3Client.putObject(new PutObjectRequest(bucket, saveName, file.getInputStream(), null)
				.withCannedAcl(CannedAccessControlList.PublicRead));
			return s3Client.getUrl(bucket, saveName).toString();
		} else {
			return null;
		}
	}

	public void deleteFile(String imageSrc) {
		try {
			String key = imageSrc;
			try {
				if (imageSrc == null) {
					return;
				}
				s3Client.deleteObject(bucket, (key).substring(54));
			} catch (AmazonServiceException e) {
				System.err.println(e.getErrorMessage());
				System.exit(1);
			}
		} catch (Exception exception) {
			exception.printStackTrace();
		}
	}
}

