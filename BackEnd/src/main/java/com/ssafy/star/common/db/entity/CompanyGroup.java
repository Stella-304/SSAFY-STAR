// package com.ssafy.star.common.db.entity;
//
// import lombok.*;
//
// import javax.persistence.*;
// import java.util.HashSet;
// import java.util.Set;
//
// @Entity
// @Getter
// @Builder
// @AllArgsConstructor(access = AccessLevel.PROTECTED)
// @NoArgsConstructor(access = AccessLevel.PROTECTED)
// public class CompanyGroup {
// 	@Id
// 	@GeneratedValue
// 	private Long id;
//
// 	@Column
// 	private String name;
//
// 	@Builder.Default
// 	@ElementCollection
// 	@Column(name = "name")
// 	private Set<String> compnayList = new HashSet<String>();
//
// }
