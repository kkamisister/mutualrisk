package com.example.mutualrisk.common.email.service;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import com.example.mutualrisk.common.email.dto.EmailMessage;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class EmailService {

	private final JavaMailSender mailSender;

	public void sendMail(EmailMessage emailMessage){
		MimeMessage mimeMessage = mailSender.createMimeMessage();

		try {
			MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, false, "UTF-8");
			mimeMessageHelper.setTo(emailMessage.getTo()); // 메일 수신자
			mimeMessageHelper.setSubject(emailMessage.getSubject()); // 메일 제목
			mimeMessageHelper.setText(emailMessage.getMessage(), false); // 메일 본문 내용, HTML 여부
			mailSender.send(mimeMessage);
			log.info("Success!!");
		} catch (MessagingException e) {
			log.info("fail!!");
			throw new RuntimeException(e);
		}
	}

}
