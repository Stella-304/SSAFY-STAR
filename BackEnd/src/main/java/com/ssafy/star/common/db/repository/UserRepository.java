package com.ssafy.star.common.db.repository;

import com.ssafy.star.common.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    boolean existsByAccountId(String accountId);
    Optional<User> findByAccountId(String accountId);
    @Query("select u.nickname from User u where id like :id")
    String findNicknameById(long id);
    Optional<User> findByAccountIdAndEmail(String accountId, String email);
    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);
}
