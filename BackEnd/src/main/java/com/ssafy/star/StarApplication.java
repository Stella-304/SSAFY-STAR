package com.ssafy.star;

import com.ssafy.star.common.auth.property.AppProperties;
import com.ssafy.star.constellation.Icosphere;
import com.ssafy.star.constellation.Icosphere2;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
@EnableConfigurationProperties(AppProperties.class)
public class StarApplication {

	public static void main(String[] args) {
		SpringApplication.run(StarApplication.class, args);
	}

}
