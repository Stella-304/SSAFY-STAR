package com.ssafy.star.common.auth.principal;

import com.ssafy.star.common.auth.enumeration.RoleEnum;
import com.ssafy.star.common.db.entity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.*;

@ToString
@Getter
@AllArgsConstructor
public class UserPrincipal implements OAuth2User, UserDetails {

    private long id;
    private String email;
    private Collection<? extends GrantedAuthority> authorities;
    @Setter
    private Map<String, Object> attributes;

    public static UserPrincipal createNewUserPrincipal(User user) {
        List<GrantedAuthority> authorities =
                Collections.singletonList(new SimpleGrantedAuthority("" + RoleEnum.CLIENT));

        return new UserPrincipal(
                user.getId(),
                user.getEmail(),
                authorities,
                null
        );
    }

    public static UserPrincipal createExistingUserPrincipal(User user) {
        List<GrantedAuthority> authorities = new ArrayList<>();

        Set<String> authoritySet = user.getAuthoritySet();
        authoritySet.forEach(authority -> authorities.add(new SimpleGrantedAuthority("" + authority)));

        return new UserPrincipal(
                user.getId(),
                user.getEmail(),
                authorities,
                null
        );
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public String getName() { return String.valueOf(id); }

    @Override
    public String getUsername() { return String.valueOf(id); }

    @Override
    public String getPassword() { return null; }

}