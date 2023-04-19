package com.ssafy.star.common.auth.info;

import com.ssafy.star.common.auth.enumeration.SocialEnum;
import lombok.*;

import javax.persistence.Embeddable;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;

@Getter
@Builder
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Embeddable
public class SocialAuth {
    private String providerId;
    @Enumerated(value = EnumType.STRING)
    private SocialEnum socialType;
}