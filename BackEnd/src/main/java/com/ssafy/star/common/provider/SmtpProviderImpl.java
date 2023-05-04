package com.ssafy.star.common.provider;

import com.ssafy.star.common.exception.CommonApiException;
import com.ssafy.star.common.util.constant.CommonErrorCode;

import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import javax.mail.Message;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

@Service
@RequiredArgsConstructor
public class SmtpProviderImpl implements SmtpProvider {

	private final JavaMailSender mailSender;

	@Value("${smtp.admin}")
	private String ADMIN_ADDRESS;

	@Async
	public void sendPwd(String email, String pwd) {

		try {
			MimeMessage message = mailSender.createMimeMessage();
			message.addRecipients(Message.RecipientType.TO, email);
			message.setSubject("ssafy-star 비밀번호 찾기 안내");

			String text = "임시 비밀번호는 " + "[" + pwd + "] 입니다.";
			message.setText(text, "utf-8");
			message.setFrom(new InternetAddress(ADMIN_ADDRESS, "ssafy-star"));

			mailSender.send(message);
		} catch (Exception e) {
			throw new CommonApiException(CommonErrorCode.EMAIL_SMTP_ERROR);
		}
	}

	@Async
	public void sendContent(String email, String content) {

		try {
			MimeMessage message = mailSender.createMimeMessage();
			message.addRecipients(Message.RecipientType.TO, email);
			message.setSubject("ssafy-star 뱃지 인증 결과 안내.");

			String text = content;
			message.setText(text, "utf-8");
			message.setFrom(new InternetAddress(ADMIN_ADDRESS, "ssafy-star"));

			mailSender.send(message);
		} catch (Exception e) {
			throw new CommonApiException(CommonErrorCode.EMAIL_SMTP_ERROR);
		}
	}

	@Async
	public void emailAuth(String email, String code) {

		try {
			MimeMessage message = mailSender.createMimeMessage();
			message.addRecipients(Message.RecipientType.TO, email);
			message.setSubject("ssafy-star 이메일 인증 안내");

			String text = "인증번호는" + " [" + code + "] 입니다.";
			message.setText(text, "utf-8");
			message.setFrom(new InternetAddress(ADMIN_ADDRESS, "ssafy-star"));

			mailSender.send(message);
		} catch (Exception e) {
			throw new CommonApiException(CommonErrorCode.EMAIL_SMTP_ERROR);
		}
	}
}

