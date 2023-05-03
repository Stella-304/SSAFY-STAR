package com.ssafy.star.common.db.repository;

import com.ssafy.star.common.db.entity.Polygon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PolygonRepository extends JpaRepository<Polygon, Long> {

}
