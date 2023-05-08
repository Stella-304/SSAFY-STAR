package com.ssafy.star.common.db.repository;

import com.ssafy.star.common.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

	boolean existsByNickname(String nickname);

	Optional<User> findByEmail(String email);

	boolean existsByEmail(String email);


	@Query(value = "select authority_set from user_authority_set where user_id = :id", nativeQuery = true)
	Optional<List<String>> findAllRolesById(long id);

	@Query(value = "select u from User u left join fetch u.card")
	List<User> findAllWithCard();
}
