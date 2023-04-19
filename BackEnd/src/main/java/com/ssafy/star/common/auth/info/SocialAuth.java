package com.ssafy.star.common.auth.info;

import com.ssafy.star.common.auth.enumeration.SocialEnum;
import lombok.*;

import javax.persistence.Embeddable;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;

@Getter
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Embeddable
public class SocialAuth {
    private String providerId;
    @Enumerated(value = EnumType.STRING)
    private SocialEnum socialType;
    private String email;
    private String name;
    private String imageUrl;

    public void update(String name, String imageUrl) {
        this.name = name;
        this.imageUrl = imageUrl;

    }


}