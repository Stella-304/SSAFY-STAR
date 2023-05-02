package com.ssafy.star.common.auth.handler;

import com.ssafy.star.common.auth.exception.CustomOAuth2Exception;
import com.ssafy.star.common.auth.property.AppProperties;
import com.ssafy.star.common.auth.repository.HttpCookieOAuth2AuthorizationRequestRepository;
import com.ssafy.star.common.provider.CookieProvider;
import com.ssafy.star.common.provider.TokenProvider;
import com.ssafy.star.common.util.constant.CommonErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URI;
import java.util.Optional;

import static com.ssafy.star.common.auth.repository.HttpCookieOAuth2AuthorizationRequestRepository.REDIRECT_URI_PARAM_COOKIE_NAME;


@Component
@RequiredArgsConstructor
public class OAuth2AuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final AppProperties appProperties;

    private final CookieProvider cookieProvider;

    private final HttpCookieOAuth2AuthorizationRequestRepository httpCookieOAuth2AuthorizationRequestRepository;

    private final TokenProvider tokenProvider;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException {

//        Enumeration<String> parameterNames = request.getParameterNames();
//        while (parameterNames.hasMoreElements()) {
//            String paramName = parameterNames.nextElement();
//            String[] paramValues = request.getParameterValues(paramName);
//            log.info("Parameter name: {}", paramName);
//            for (String paramValue : paramValues) {
//                log.info("Parameter values: {}", paramValue);
//            }
//        }

        String targetUrl = determineTargetUrl(request, response, authentication);

        if (response.isCommitted()) { return; }

        clearAuthenticationAttributes(request, response);
        getRedirectStrategy().sendRedirect(request, response, targetUrl);
    }

    protected String determineTargetUrl(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
        Optional<String> redirectUri = cookieProvider.getCookie(request, REDIRECT_URI_PARAM_COOKIE_NAME).map(Cookie::getValue);

        if (redirectUri.isPresent() && !isAuthorizedRedirectUri(redirectUri.get()))
            throw new CustomOAuth2Exception(CommonErrorCode.UNAUTHORIZED_URI);

        // 리디렉션 uri가 있으면 그 값으로, 없으면 defaultUri ("/")
        String targetUri = redirectUri.orElse(getDefaultTargetUrl());

        return UriComponentsBuilder.fromUriString(targetUri)
                .queryParam("error", "")
                .queryParam("token", tokenProvider.createTokenByAuthentication(authentication))
                .build().toUriString();
    }

    protected void clearAuthenticationAttributes(HttpServletRequest request, HttpServletResponse response) {
        // 발생했던 exception들을 삭제
        super.clearAuthenticationAttributes(request);

        // 쿠키에 저장되었던 인증정보를 삭제
        httpCookieOAuth2AuthorizationRequestRepository.removeAuthorizationRequestCookies(request, response);
    }

    private boolean isAuthorizedRedirectUri(String uri) {

        URI clientRedirectUri = URI.create(uri);

        return appProperties.getOauth2().getAuthorizedRedirectUris()
                .stream()
                .anyMatch(authorizedRedirectUri -> {
                    URI authorizedURI = URI.create(authorizedRedirectUri);
                    if (authorizedRedirectUri.equalsIgnoreCase(uri) && authorizedURI.getHost().equalsIgnoreCase(clientRedirectUri.getHost()) && authorizedURI.getPort() == clientRedirectUri.getPort()) {
                        return true;
                    }
                    return false;
                });
    }

}