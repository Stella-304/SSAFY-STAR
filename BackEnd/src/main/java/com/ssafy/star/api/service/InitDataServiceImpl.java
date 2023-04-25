package com.ssafy.star.api.service;

import java.util.LinkedHashMap;
import java.util.List;

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
}
