package com.ssafy.star.common.provider;

import org.springframework.security.core.Authentication;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;

public interface TokenProvider {

    String createTokenByAuthentication(Authentication authentication);
    String createTokenById(long id);
    Long getUserIdFromToken(String token);
    boolean validateToken(String authToken);
    String getTokenFromRequest(HttpServletRequest request);
    Date getExpireTime(String token);
}
