package com.ssafy.star.common.util.init;

import com.ssafy.star.api.service.InitDataService;
import com.ssafy.star.common.db.entity.Company;
import com.ssafy.star.common.db.repository.CompanyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.PostConstruct;
import java.util.HashSet;
import java.util.Set;

/*
 * ddl-auto: create 일 때, 기본적으로 쌓일 더미데이터를 기술하는 클래스
 * Spring Boot 시작 시, Component 애노테이션으로 인해 자동으로 Bean 등록되며 PostConstruct가 실행됨
 * @Author 이상학
 */
@Component
@RequiredArgsConstructor
public class InitDb {
	final CompanyRepository companyRepository;
	final InitDataService initDataService;

	@PostConstruct
	public void init() throws Exception {
		// initDataService.initCompany();
		// initDataService.initUser();
		// initDataService.initCoordinate();
	}

	@Transactional
	void exampleInit() {

		// ID 지정해도 어처피 무시되고 hibernate_sequence 값으로 넘어가요~ㅅㄱ
		companyRepository.save(Company.builder().id(1L).name("삼성전자").assetSize("대기업").build());
		companyRepository.save(Company.builder().id(2L).name("삼성SDS").assetSize("대기업").build());
		companyRepository.save(Company.builder().id(3L).name("삼성전기").assetSize("대기업").build());
		companyRepository.save(Company.builder().id(4L).name("네이버").assetSize("대기업").build());
		companyRepository.save(Company.builder().id(5L).name("카카오").assetSize("대기업").build());
		companyRepository.save(Company.builder().id(6L).name("라인").assetSize("대기업").build());
		companyRepository.save(Company.builder().id(7L).name("쿠팡").assetSize("대기업").build());
		companyRepository.save(Company.builder().id(8L).name("배달의민족").assetSize("대기업").build());
		companyRepository.save(Company.builder().id(9L).name("정승네트워크").assetSize("중소기업").build());
		companyRepository.save(Company.builder().id(10L).name("일규하이텤").assetSize("중소기업").build());

		Set<String> samsung = new HashSet<>();
		samsung.add("삼성전자");
		samsung.add("삼성SDS");
		samsung.add("삼성전기");
		// companyGroupRepository.save(CompanyGroup.builder().name("삼성(전계열사)").compnayList(samsung).build());

		Set<String> neCaraCuBae = new HashSet<>();
		neCaraCuBae.add("네이버");
		neCaraCuBae.add("카카오");
		neCaraCuBae.add("라인");
		neCaraCuBae.add("쿠팡");
		neCaraCuBae.add("배달의민족");
		// companyGroupRepository.save(CompanyGroup.builder().name("네카라쿠배").compnayList(neCaraCuBae).build());

	}
}
