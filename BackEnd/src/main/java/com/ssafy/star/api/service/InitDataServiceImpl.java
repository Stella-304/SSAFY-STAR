package com.ssafy.star.api.service;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

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
	@Transactional
	public void initCompany() {
		try {
			List<LinkedHashMap> json = JSONParsingUtil.getListFromJson("/company-data.json");
			List<Company> companyList = json.stream()
				.map(x -> Company.builder().name((String)x.get("회사이름")).assetSize((String)x.get("기업분류")).build())
				.collect(
					Collectors.toList());
			companyRepository.saveAll(companyList);
		} catch (Exception e) {
		}
	}

	@Override
	@Transactional(rollbackFor = Exception.class)
	public void initUser() throws Exception {
		List<LinkedHashMap> json = JSONParsingUtil.getListFromJson("/user-data.json");
		Random random = new Random();
		for (LinkedHashMap row : json) {
			User user = User
				.builder()
				.name((String)row.get("name"))
				.nickname(((String)row.get("nickname")))
				.email((String)row.get("email"))
				.isAutorized(random.nextBoolean())
				.companyIsAutorized(random.nextBoolean())
				.loginType(LoginTypeEnum.custom)
				.build();
			userRepository.save(user);

			Card card = Card.builder()
				.ban(((BigInteger)row.get("ban")).toString())
				.generation(((BigInteger)row.get("generation")).toString())
				.campus((String)row.get("campus"))
				.bojId((String)row.get("boj_id"))
				.githubId((String)row.get("github_id"))
				.track((String)row.get("track"))
				.swTier((String)row.get("swTier"))
				.etc((String)row.get("etc"))
				.major((String)row.get("major"))
				.role((String)row.get("role"))
				.company((String)row.get("company"))
				.content((String)row.get("content"))
				.user(user)
				.build();
			cardRepository.save(card);
			user.setCard(card);
		}
	}

	@Override
	@Transactional
	public void initCoordinate() {
		try {
			List<LinkedHashMap> json = JSONParsingUtil.getListFromJson("/hemisphere-coordinate-data.json");
			List<Coordinate> coordinateList = new ArrayList<>();
			for (LinkedHashMap row : json) {
				coordinateList.add(Coordinate
					.builder()
					.x(((BigDecimal)row.get("x")).doubleValue())
					.y(((BigDecimal)row.get("y")).doubleValue())
					.z(((BigDecimal)row.get("z")).doubleValue()).build());
			}
			coordinateRepository.saveAll(coordinateList);
		} catch (Exception e) {

		}
	}

	@Override
	@Transactional
	public void initAll() throws Exception {
		initUser();
		initCompany();
		initCoordinate();
	}

	@Override
	@Transactional
	public void initCompanyAdditional() {
		try {
			List<LinkedHashMap> json = JSONParsingUtil.getListFromJson("/company-additional-data.json");
			List<Company> companyList = json.stream()
					.map(x -> Company.builder().name((String)x.get("회사이름")).assetSize((String)x.get("기업분류")).build())
					.collect(
							Collectors.toList());
			companyRepository.saveAll(companyList);
		} catch (Exception e) {
		}
	}
}
