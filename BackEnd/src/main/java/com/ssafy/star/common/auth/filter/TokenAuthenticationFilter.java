package com.ssafy.star.common.auth.filter;

import com.ssafy.star.common.auth.service.CustomUserDetailsService;
import com.ssafy.star.common.provider.TokenProvider;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Log4j2
public class TokenAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private TokenProvider tokenProvider;

    @Autowired
    private CustomUserDetailsService customUserDetailsService;


    /*
    *  JWT 인증 방식은 Stateless 즉, HttpSession에서 인증된 Authentication을 포함한 SecurityContext를 관리하지 않습니다.
    * SecurityContextPersistenceFilter는 SecurityContext를 저장, 로드, 삭제하는 등의 역할을 합니다.
    * Spring Security에서는 적절한 시점에 SecurityContext를 사용할 수 없도록
    * Authentication 객체가 저장되어 있는 SecurityContext 자체를 삭제합니다.
    * https://itvillage.tistory.com/60
    */
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        try {
            String token = tokenProvider.getTokenFromRequest(request);

            if (StringUtils.hasText(token) && tokenProvider.validateToken(token)) {

                Long id = tokenProvider.getUserIdFromToken(token);

                    UserDetails userDetails = customUserDetailsService.loadUserById(id);

                    // Object 타입의 principal의 식별자에 더해 상세정보를 담기 위해 자리에 userDetails를 set
                    UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                    // Object 타입의 details에 request에있는 사용자가 인증한 웹 요청과 관련된 세부 정보를 set
                    authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                    SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        } catch (Exception e) {
            log.error("권한을 설정하지 못했습니다.");
        }

        filterChain.doFilter(request, response);
    }

}