package com.ssafy.star.api.service;

import com.ssafy.star.common.db.dto.response.BadgeListDto;
import com.ssafy.star.common.db.dto.response.ReportListDto;
import com.ssafy.star.common.db.entity.AuthStatus;
import com.ssafy.star.common.db.entity.Report;
import com.ssafy.star.common.db.entity.User;
import com.ssafy.star.common.db.repository.AuthStatusRepository;
import com.ssafy.star.common.db.repository.ReportRepository;
import com.ssafy.star.common.exception.CommonApiException;
import com.ssafy.star.common.provider.SmtpProvider;
import com.ssafy.star.common.util.constant.CommonErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService {

	private final SmtpProvider smtpProvider;
	private final AuthStatusRepository authStatusRepository;
	private final ReportRepository reportRepository;

	@Override
	@Transactional
	public BadgeListDto getBadgeList(String type) {
		switch (type) {
			case "ALL":
				return new BadgeListDto(authStatusRepository.findAll());
			case "YET":
				return new BadgeListDto(authStatusRepository.findByProcessStatus(false));
		}
		return null;
	}

	@Override
	@Transactional
	public void registBadge(long auth_id, String type) {
		AuthStatus authStatus = authStatusRepository.findById(auth_id)
			.orElseThrow(() -> new CommonApiException(CommonErrorCode.BAD_AUTH_ID));

		if (authStatus.isProcessStatus())
			throw new CommonApiException(CommonErrorCode.REQUEST_FINISHED);

		User user = authStatus.getUser();
		// authStatus -> 진행상태 True로 바꾸기
		authStatus.jobFinish();

		// 보낼 메일의 본문
		StringBuilder sb = new StringBuilder()
			.append('[')
			.append(authStatus.getBadgeType())
			.append(']');

		// type = ok이면, user 가져와서 equipBadge 해주기
		if (type.equals("ok")) {
			user.equipBadge(authStatus.getBadgeType());
			sb.append(" 인증되었습니다.");
		} else {
			sb.append(" 인증요청 거부되었습니다.");
		}
		// 메일 보내기
		smtpProvider.sendContent(user.getEmail(), sb.toString());
	}

	@Override
	public List<ReportListDto> getReportList() {

		List<ReportListDto> reportListDtoList = new ArrayList<>();

		reportRepository.findAll().forEach(report ->
				reportListDtoList.add(new ReportListDto(report.getArticle(), report.getContent(), report.isResolved())));

		return reportListDtoList;
	}
}
