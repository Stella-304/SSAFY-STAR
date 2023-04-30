package com.ssafy.star.common.auth.info;

import lombok.*;

import javax.persistence.Embeddable;

@Getter
@Builder
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Embeddable
public class UserAccount {
    private String accountId;

    private String accountPwd;
}