package com.ssafy.star.common.db.repository;

import com.ssafy.star.common.db.entity.Coordinate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CoordinateRepository extends JpaRepository<Coordinate, Long> {

}
