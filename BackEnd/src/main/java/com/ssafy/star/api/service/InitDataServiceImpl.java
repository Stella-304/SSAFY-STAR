package com.ssafy.star.api.service;

import java.math.BigDecimal;
import java.util.LinkedHashMap;
import java.util.List;

import com.ssafy.star.common.db.entity.Coordinate;
import com.ssafy.star.common.db.repository.CoordinateRepository;
import org.springframework.stereotype.Service;

import com.ssafy.star.common.db.entity.Company;
import com.ssafy.star.common.db.repository.CompanyRepository;
import com.ssafy.star.common.db.repository.UserRepository;
import com.ssafy.star.common.util.JSONParsingUtil;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class InitDataServiceImpl implements InitDataService {

    final CompanyRepository companyRepository;
    final CoordinateRepository coordinateRepository;

    @Override
    public void initCompany() {
        try {
            List<LinkedHashMap> json = JSONParsingUtil.getListFromJson("/company-data.json");

            for (LinkedHashMap row : json) {
                companyRepository.save(Company.builder().name((String) row.get("회사이름")).assetSize((String) row.get("기업분류")).build());
            }
        } catch (Exception e) {
        }
    }

    @Override
    public void initCoordinate() {
        try {
            List<LinkedHashMap> json = JSONParsingUtil.getListFromJson("/coordinate-data.json");
			for (LinkedHashMap row : json) {
//				System.out.println(row);
//				System.out.println(row.get("x"));
//
//				System.out.println(row.get("x").getClass());
//				System.out.println(((BigDecimal)row.get("x")).doubleValue());
//				break;
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
