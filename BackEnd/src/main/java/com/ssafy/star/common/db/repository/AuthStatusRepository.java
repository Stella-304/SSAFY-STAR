package com.ssafy.star.common.db.repository;

import java.util.List;
import java.util.Optional;

import com.ssafy.star.common.auth.enumeration.BadgeEnum;
import com.ssafy.star.common.db.entity.QUser;
import com.ssafy.star.common.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ssafy.star.common.db.entity.AuthStatus;
// import com.ssafy.star.common.db.entity.CompanyGroup;

@Repository
public interface AuthStatusRepository extends JpaRepository<AuthStatus, Long> {
	List<AuthStatus> findByProcessStatus(boolean status);
	List<AuthStatus> findByUserAndBadgeType(User user, BadgeEnum type);
}
