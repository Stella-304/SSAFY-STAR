package com.ssafy.star.common.db.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.ssafy.star.common.db.entity.Company;

@Repository
public interface CompanyRepository extends JpaRepository<Company, Long> {
	@Query(value = "select cp.name from Company cp where cp.name like %:query%")
	List<String> searchCompanyList(String query);
}
