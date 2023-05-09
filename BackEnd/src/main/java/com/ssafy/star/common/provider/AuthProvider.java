package com.ssafy.star.common.provider;

import com.ssafy.star.common.auth.principal.UserPrincipal;
import org.springframework.security.core.Authentication;

public interface AuthProvider {

    UserPrincipal getUserPricipalFromAuthentication(Authentication authentication);
    long getUserIdFromPrincipal();
    long getUserIdFromPrincipalDefault();

}
