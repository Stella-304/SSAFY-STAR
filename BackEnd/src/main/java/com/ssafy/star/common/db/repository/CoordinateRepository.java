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

    List<Coordinate> findTop4ByOrderById();
    List<Coordinate> findTop17ByOrderById();
    List<Coordinate> findTop73ByOrderById();
    List<Coordinate> findTop305ByOrderById();
    List<Coordinate> findTop1249ByOrderById();


}
