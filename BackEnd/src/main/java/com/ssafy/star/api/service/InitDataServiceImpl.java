package com.ssafy.star.api.service;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.LinkedHashMap;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.star.common.auth.enumeration.LoginTypeEnum;
import com.ssafy.star.common.db.entity.Card;
import com.ssafy.star.common.db.entity.Company;
import com.ssafy.star.common.db.entity.Coordinate;
import com.ssafy.star.common.db.entity.User;
import com.ssafy.star.common.db.repository.CardRepository;
import com.ssafy.star.common.db.repository.CompanyRepository;
import com.ssafy.star.common.db.repository.CoordinateRepository;
import com.ssafy.star.common.db.repository.UserRepository;
import com.ssafy.star.common.util.JSONParsingUtil;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class InitDataServiceImpl implements InitDataService {

	final CompanyRepository companyRepository;
	final UserRepository userRepository;
	final CardRepository cardRepository;
	final CoordinateRepository coordinateRepository;

	@Override
	public void initCompany() {
		try {
			List<LinkedHashMap> json = JSONParsingUtil.getListFromJson("/company-data.json");

			for (LinkedHashMap row : json) {
				companyRepository.save(
					Company.builder().name((String)row.get("회사이름")).assetSize((String)row.get("기업분류")).build());
			}
		} catch (Exception e) {
		}
	}

	@Override
	@Transactional(rollbackFor = Exception.class)
	public void initUser() throws Exception {
		List<LinkedHashMap> json = JSONParsingUtil.getListFromJson("/user-data.json");
		for (LinkedHashMap row : json) {
			User user = User
				.builder()
				.name((String)row.get("name"))
				.nickname(((String)row.get("nickname")))
				.email((String)row.get("email"))
				.isAutorized(false)
				.loginType(LoginTypeEnum.custom)
				.build();
			userRepository.save(user);

			Card card = Card.builder()
				.ban(((BigInteger)row.get("ban")).intValue())
				.generation(((BigInteger)row.get("generation")).intValue())
				.campus((String)row.get("campus"))
				.bojId((String)row.get("boj_id"))
				.githubId((String)row.get("github_id"))
				.track((String)row.get("track"))
				.company((String)row.get("company"))
				.companyAssetSize((String)row.get("asset_size"))
				.user(user)
				.build();
			cardRepository.save(card);
			user.setCard(card);
		}
	}

	@Override
	public void initCoordinate() {
		try {
			List<LinkedHashMap> json = JSONParsingUtil.getListFromJson("/coordinate-data.json");
			for (LinkedHashMap row : json) {
				coordinateRepository.save(
					Coordinate
						.builder()
						.x(((BigDecimal)row.get("x")).doubleValue())
						.y(((BigDecimal)row.get("y")).doubleValue())
						.z(((BigDecimal)row.get("z")).doubleValue()).build());
			}
		} catch (Exception e) {

		}
	}
}
