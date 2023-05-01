package com.ssafy.star.common.util.converter;

import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import com.ssafy.star.common.auth.enumeration.BadgeEnum;

@Component
public class BadgeTypeRequestConverter implements Converter<String, BadgeEnum> {

	@Override
	public BadgeEnum convert(String source) {
		return BadgeEnum.valueOf(source.toUpperCase());
	}
}
