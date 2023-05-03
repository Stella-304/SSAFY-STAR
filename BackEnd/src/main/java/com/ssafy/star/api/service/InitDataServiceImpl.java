package com.ssafy.star.api.service;

import com.ssafy.star.common.auth.enumeration.LoginTypeEnum;
import com.ssafy.star.common.db.entity.*;
import com.ssafy.star.common.db.repository.*;
import com.ssafy.star.common.exception.CommonParseException;
import com.ssafy.star.common.util.JSONParsingUtil;
import com.ssafy.star.common.util.constant.CommonErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class InitDataServiceImpl implements InitDataService {

	final CompanyRepository companyRepository;
	final UserRepository userRepository;
	final CardRepository cardRepository;
	final CoordinateRepository coordinateRepository;
	final PolygonRepository polygonRepository;

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
			throw new CommonParseException(CommonErrorCode.FAIL_TO_PARSE);
		}
	}

	@Override
	@Transactional(rollbackFor = Exception.class)
	public void initUser() {
		try {
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
		} catch (Exception e) {
			throw new CommonParseException(CommonErrorCode.FAIL_TO_PARSE);
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
			throw new CommonParseException(CommonErrorCode.FAIL_TO_PARSE);
		}
	}

	@Override
	@Transactional
	public void initPolygon() {
		try {
			List<LinkedHashMap> json = JSONParsingUtil.getListFromJson("/hemisphere-polygon-data.json");
			List<Polygon> polygonList = new ArrayList<>();
			for (LinkedHashMap row : json) {
				polygonList.add(Polygon
						.builder()
						.x(((BigDecimal)row.get("x")).doubleValue())
						.y(((BigDecimal)row.get("y")).doubleValue())
						.z(((BigDecimal)row.get("z")).doubleValue()).build());
			}
			polygonRepository.saveAll(polygonList);
		} catch (Exception e) {
			throw new CommonParseException(CommonErrorCode.FAIL_TO_PARSE);
		}
	}

	@Override
	@Transactional
	public void initAll() {
		initUser();
		initCompany();
		initCoordinate();
		initPolygon();
	}
}
