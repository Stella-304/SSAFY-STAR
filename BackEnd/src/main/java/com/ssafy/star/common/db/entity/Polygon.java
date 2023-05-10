package com.ssafy.star.common.db.entity;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.List;

import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import org.springframework.lang.Nullable;

@Entity
@Getter
@Builder
@ToString
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Polygon {
	@Id
	@GeneratedValue
	private Long id;

	private Integer idx;

	@Column(nullable = true)
	private Double x;
	@Column(nullable = true)
	private Double y;
	@Column(nullable = true)
	private Double z;

	public Polygon(int idx, Object positions) {
		if (positions != null) {
			// System.out.println(positions);
			List<BigDecimal> positionArray = (List<BigDecimal>)positions;
			// System.out.println(positions.getClass());
			this.x = (positionArray.get(0)).doubleValue();
			this.y = (positionArray.get(1)).doubleValue();
			this.z = (positionArray.get(2)).doubleValue();
		}
		this.idx = idx;
	}
}
