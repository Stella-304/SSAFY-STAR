package com.ssafy.star.common.provider;

import com.ssafy.star.common.auth.exception.TokenExpireException;
import com.ssafy.star.common.auth.principal.UserPrincipal;
import com.ssafy.star.common.auth.property.AppProperties;
import com.ssafy.star.common.util.constant.CommonErrorCode;
import io.jsonwebtoken.*;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;

@Log4j2
@Service
public class TokenProviderImpl implements TokenProvider {


    @Autowired
    private RedisProvider redisProvider;
    @Autowired
    private AppProperties appProperties;

    @Override
    public String createTokenByAuthentication(Authentication authentication) {
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();

        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + appProperties.getAuth().getTokenExpirationMsec());

        return Jwts.builder()
                .setSubject(Long.toString(userPrincipal.getId()))
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(SignatureAlgorithm.HS512, appProperties.getAuth().getTokenSecret())
                .compact();
    }

    @Override
    public String createTokenById(long id) {

        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + appProperties.getAuth().getTokenExpirationMsec());

        return Jwts.builder()
                .setSubject(Long.toString(id))
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(SignatureAlgorithm.HS512, appProperties.getAuth().getTokenSecret())
                .compact();
    }


    @Override
    public Long getUserIdFromToken(String token) {
        Claims claims = Jwts.parser()
                .setSigningKey(appProperties.getAuth().getTokenSecret())
                .parseClaimsJws(token)
                .getBody();

        return Long.parseLong(claims.getSubject());
    }

    @Override
    public boolean validateToken(String token) {

        if(redisProvider.hasKeyBlackList(token)) {
            log.error("BlackListed JWT token");
            return false;
        }
        try {
            Jwts.parser().setSigningKey(appProperties.getAuth().getTokenSecret()).parseClaimsJws(token);
            return true;
        } catch (SignatureException ex) {
            log.error("Invalid JWT signature");
        } catch (MalformedJwtException ex) {
            log.error("Invalid JWT token");
        } catch (ExpiredJwtException ex) {
            log.error("Expired JWT token");
        } catch (UnsupportedJwtException ex) {
            log.error("Unsupported JWT token");
        } catch (IllegalArgumentException ex) {
            log.error("JWT claims string is empty.");
        }
        return false;
    }

    @Override
    public String getTokenFromRequest(HttpServletRequest request) {
        // Authorization 헤더의 이름은 정해진 값이며, JWT 5토큰을 사용하는 경우 대개 이 헤더 이름을 사용함 => Bearer [JWT Token] 형태로 설정
        return request.getHeader("Authorization");
    }

    @Override
    public Date getExpireTime(String token) {
        return Jwts.parser().setSigningKey(appProperties.getAuth().getTokenSecret()).parseClaimsJws(token).getBody().getExpiration();
    }

}