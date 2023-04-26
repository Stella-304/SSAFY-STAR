package com.ssafy.star.common.db.repository;

import com.ssafy.star.common.db.entity.Coordinate;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CoordinateRepository extends JpaRepository<Coordinate, Long> {

    List<Coordinate> findTop12ByOrderByIdDesc();
    List<Coordinate> findTop42ByOrderByIdDesc();
    List<Coordinate> findTop162ByOrderByIdDesc();
    List<Coordinate> findTop642ByOrderByIdDesc();
    List<Coordinate> findTop2562ByOrderByIdDesc();

//    JPQL에서 limit 값을 동적으로 할당하는 것이 불가능?
//    @Query(value = "select co from Coordinate co limit limitCnt")
//    List<String> (int limitCnt);

}
