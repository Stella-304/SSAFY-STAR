package com.ssafy.star.common.db.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ssafy.star.common.db.entity.AuthStatus;
import com.ssafy.star.common.db.entity.CompanyGroup;

@Repository
public interface AuthStatusRepository extends JpaRepository<AuthStatus, Long> {
}
